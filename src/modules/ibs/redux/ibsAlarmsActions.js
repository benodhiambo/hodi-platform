import axios from "axios";
import { format, isAfter, parse, subDays, subHours } from "date-fns";
import { ALL_ALARMS_API, DATE_RANGE_API } from "../../../config/apis";
import { appStore } from "../../../redux/appStore";
import {
    addIBSAlarms12HrsToStore,
    addIBSAlarms24HrsToStore,
    addIBSAlarms30DaysToStore,
    addIBSAlarms7DaysToStore,
    addIBSAlarmsDateToStore,
    addIBSAlarmsRangeToStore,
    addIBSAlarmToStore
} from "./ibsAlarmsActionCreators";

/**
 * Get new Alarms from the server 
 * returns a json containing new alarm objects
 */
export async function fetchNewAlarms() {
    try {
        let fetchedAlarms = await fetch(ALL_ALARMS_API);

        let fetchedAlarmsJson = await fetchedAlarms.json();
        let newAlarms = fetchedAlarmsJson.alarms;
        return newAlarms;
    } catch (error) {
        console.log(error);
        let newAlarms = [];
        return newAlarms;
    }
}

/**
 * filter out any existing IDs from
 * the new IDs
 */
async function getFilteredIBSAlarmIds(newIds, currentIds) {

    /**
     * array for alarm ids which are 
     * not available in the store/state
     */
    let filteredIdArray = [];

    //Find values that are in newAlarms but not in currentAlarms
    filteredIdArray = newIds.filter(function (val) {
        return currentIds.indexOf(val) === -1;
    });

    return filteredIdArray;
}

/**
 * this function 
 * 1. gets alarms from the rest api
 * 2. puts the IDs of the new alarms in an array
 * 3. gets the IDs of current alarms
 * 4. removes any existing IDs from the new alarms array
 * 5. returns an array containing only the new alarms not in the state/store
 */
async function getAlarmsToAddToState() {
    // gets alarms from the rest api
    let newIBSAlarms = await fetchNewAlarms();

    /**
     * checks if any alarms were returned in
     * the array
     */
    if (newIBSAlarms !== undefined || newIBSAlarms.length !== 0) {
        // puts the IDs of the new alarms in an array
        let newIds = await newIBSAlarms.map(alarm => alarm.id);

        // gets the IDs of current alarms
        let currentState = appStore.getState();
        let currentIBSAlarms = currentState.ibsAlarms;
        let rawCurrentIds = currentIBSAlarms.map(alarm => alarm.id);

        // array to hold ids from current alarms
        let currentIds = [];

        //remove undefined values from array
        currentIds = rawCurrentIds.filter(function (e) { return e });

        // removes any existing IDs from the new alarms array
        let ibsAlarmsIDsFiltered = await getFilteredIBSAlarmIds(newIds, currentIds);

        let filteredAlarmsArray = [];

        newIBSAlarms.forEach(function (alarm) {
            ibsAlarmsIDsFiltered.forEach(function (id) {
                if (parseInt(alarm.id) === parseInt(id)) {
                    if (alarm.alarmStatus === 1 || alarm.alarmStatus === 'Pending') {
                        alarm.alarmStatus = 'Pending'
                    } else {
                        alarm.alarmStatus = 'Closed'
                    }
                    filteredAlarmsArray.push(alarm);
                }
            })
        })

        //alarms to be added to state
        return filteredAlarmsArray;
    } else {
        /**
         * No new alarms OR network is down.
         * return empty array
         */
        let filteredAlarmsArray = [];
        return filteredAlarmsArray
    }

}

/**
 * 1. Gets new alarms which are not in state.
 * 2. Adds the alarms to state
 */
export async function addNewAlarmsToState() {
    let alarmsArray = await getAlarmsToAddToState();
    appStore.dispatch(addIBSAlarmToStore(alarmsArray));
}

export function checkIfAlarmIsInState(alarm) {
    let currentState = appStore.getState();
    let currentIBSDateAlarmsState = currentState.ibsAlarmsDate;
    let rawCurrentIds = currentIBSDateAlarmsState.map(alarm => alarm.id);

    return (rawCurrentIds.includes(alarm.id) ? true : false);
}

/**
 * get alarms from the redux store
 * for this date
 * @param {*} alarmDate 
 */
export function getAlarmsFromStoreByDate(alarmDate) {
    let currentState = appStore.getState();
    let currentIBSDateAlarmsState = currentState.ibsAlarmsDate[0];

    let alarmsArray = [];

    currentIBSDateAlarmsState.forEach((alarm) => {
        let storeAlarmDate = format(alarm.updatedAt, 'yyyy-MM-dd')
        if (storeAlarmDate === alarmDate) {
            alarmsArray.push(alarm);
        }
    });
    return alarmsArray;
}

export async function fetchAlarmsByDate(alarmDate) {

    let fetchedAlarms = await fetch("http://9.9.9.8/apps/adc/hodi/rest/alarms_post.php", {
        method: "POST",
        body: JSON.stringify({
            startDate: alarmDate,
        }),
    });

    let fetchedAlarmsJson = await fetchedAlarms.json();
    let newAlarms = fetchedAlarmsJson.alarms;

    let alarmsForThisDate = [];

    newAlarms.forEach((alarm) => {
        alarmsForThisDate.push(alarm)
    });
    appStore.dispatch(addIBSAlarmsDateToStore(alarmsForThisDate));
}

export async function fetchAlarmsByDateRange(start, end) {

    const params = new URLSearchParams()
    params.append('startDate', start)
    params.append('endDate', end)

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    return await axios.post(DATE_RANGE_API, params, config)
        .then((result) => {
            let fetchedAlarmsJson = result.data;
            return fetchedAlarmsJson.message;
        })
        .catch((err) => {
            console.log(' error 1 ... ')
            console.log(err)
            /**
             * return empty array if there 
             * is no alarm within the range
             */
            return [];
        })
}

/**
 * removes the timestamp portion
 * of a date object
 * @param {*} dateObject 
 */
export function removeTimestamp(dateObject) {
    return format(dateObject, "yyyy-MM-dd");
}

/**
 * initializes the redux store with alarms
 * and breaks down the store on to alarms 
 * different time periods
 */
export async function setUpAlarmsStores() {
    await fetchAlarmsForLast30Days().then(async () => {
        await fetchAlarmsForLast7Days();
    }).then(async () => {
        await fetchAlarmsForLast24Hrs();
    }).then(async () => {
        await fetchAlarmsForLast12Hrs();
    })
}

export async function fetchAlarmsForLast30Days() {
    let todaysDate = new Date();
    let t30DaysAgo = subDays(todaysDate, 30);

    let startDate = removeTimestamp(t30DaysAgo)
    let endDate = removeTimestamp(todaysDate)

    /**
     * these are the alarms to be 
     * dispatched to the redux store
     */
    let alarmsFor30Days = [];

    /**
     * this are the alarms immediately 
     * fetched from the REST API
     */
    let new30dayAlarms = await fetchAlarmsByDateRange(startDate, endDate)

    if (new30dayAlarms.length > 0) {
        alarmsFor30Days = breakDownAlarmsArray(new30dayAlarms);
    }
    appStore.dispatch(addIBSAlarms30DaysToStore(alarmsFor30Days));
}

/**
 * breaks down each of the alarms 
 * in the alarms array
 * into individual alarms
 * @param {alarmArray} alarmsArray 
 */
function breakDownAlarmsArray(alarmArray) {
    let count = 1;
    let newArray = [];
    alarmArray.forEach((alarm) => {
        /**
         * break down each new alarm update into 
         * new alarms using alarm type and status
         */
        let power = {}

        power.site_name = alarm.site_name
        power.site_ip = alarm.site_ip
        power.alarm_type = "Power Alarm"
        power.alarm_status = alarm.power === 1 ? "Pending" : "Resolved"
        power.alarm_severity = "Critical"
        power.created_at = alarm.created_at
        power.updated_at = alarm.updated_at
        power.id = count
        count++;

        newArray.push(power)

        let rectifier = {}
        rectifier.site_name = alarm.site_name
        rectifier.site_ip = alarm.site_ip
        rectifier.alarm_type = "Rectifier Alarm"
        rectifier.alarm_status = alarm.rectifier === 1 ? "Pending" : "Resolved"
        rectifier.alarm_severity = "Minor"
        rectifier.created_at = alarm.created_at
        rectifier.updated_at = alarm.updated_at
        rectifier.id = count
        count++;

        newArray.push(rectifier)

        let optical = {}
        optical.site_name = alarm.site_name
        optical.site_ip = alarm.site_ip
        optical.alarm_type = "Optical Alarm"
        optical.alarm_status = alarm.optical === 1 ? "Pending" : "Resolved"
        optical.alarm_severity = "Critical"
        optical.created_at = alarm.created_at
        optical.updated_at = alarm.updated_at
        optical.id = count
        count++;

        newArray.push(optical)

        let radio = {}
        radio.site_name = alarm.site_name
        radio.site_ip = alarm.site_ip
        radio.alarm_type = "Radio Alarm"
        radio.alarm_status = alarm.radio === 1 ? "Pending" : "Resolved"
        radio.alarm_severity = "Critical"
        radio.created_at = alarm.created_at
        radio.updated_at = alarm.updated_at
        radio.id = count
        count++;

        newArray.push(radio)
    });
    return newArray;
}

/**
 * sets the redux store for alarms to 
 * be used in view for `last 7 days`
 */
export async function fetchAlarmsForLast7Days() {

    // get alarms from state
    let currentState = appStore.getState();
    let alarmsSet = currentState.ibsAlarms30Days[0];

    // get date ranges
    let t7DaysAgo = subDays(new Date(), 7);
    let alarmsFor7days = [];

    /**
     * check if any alarms were retrieved ffrom the
     */
    if (alarmsSet.length > 0) {
        // filter alarms for the last 7 days
        alarmsSet.forEach(alarm => {

            /**
             * convert timestamp to date object
             */
            let alarmTimeToDate = parse(
                alarm.updated_at,
                'yyyy-MM-dd hh:mm:ss a',
                new Date()
            );

            /**
             * check if timestamp is 
             * within 7 Days
             */
            if (isAfter(alarmTimeToDate, t7DaysAgo)) {
                alarmsFor7days.push(alarm);
            }
        });
    }
    appStore.dispatch(addIBSAlarms7DaysToStore(alarmsFor7days));
}

export async function fetchAlarmsForLast24Hrs() {

    // get alarms from state
    let currentState = appStore.getState();

    let alarmsSet = currentState.ibsAlarms7Days[0];

    // get time ranges
    let t24HrsAgo = subHours(new Date(), 24);
    let alarms24Hrs = [];

    /**
     * check if any alarms were retrieved ffrom the
     */
    if (alarmsSet.length > 0) {
        // filter alarms for the last 24Hrs
        alarmsSet.forEach(alarm => {
            /**
             * convert timestamp to date object
             */
            let alarmTimeToDate = parse(
                alarm.updated_at,
                'yyyy-MM-dd hh:mm:ss a',
                new Date()
            );

            /**
             * check if timestamp is 
             * within 24 hours ago
             */
            if (isAfter(alarmTimeToDate, t24HrsAgo)) {
                alarms24Hrs.push(alarm);
            }
        });
    }
    appStore.dispatch(addIBSAlarms24HrsToStore(alarms24Hrs));
}

export async function fetchAlarmsForLast12Hrs() {

    // get alarms from state
    let currentState = appStore.getState();
    let alarmsSet = currentState.ibsAlarms7Days[0];

    // get time ranges
    let t12HrsAgo = subHours(new Date(), 12);
    let alarmsFor12Hrs = [];

    /**
     * check if any alarms were retrieved from the
     * store
     */
    if (alarmsSet.length > 0) {
        // filter alarms for the last 12Hrs
        alarmsSet.forEach(alarm => {
            /**
             * convert timestamp to date object
             */
            let alarmTimeToDate = parse(
                alarm.updated_at,
                'yyyy-MM-dd hh:mm:ss a',
                new Date()
            );

            /**
             * check if timestamp is 
             * within 12 hours ago
             */
            if (isAfter(alarmTimeToDate, t12HrsAgo)) {
                alarmsFor12Hrs.push(alarm);
            }
        });
    }
    appStore.dispatch(addIBSAlarms12HrsToStore(alarmsFor12Hrs));
}

export async function fetchAlarmsForRange(startDate, endDate) {
    /**
     * these are the alarms to be 
     * dispatched to the redux store
     */
    let alarmsForRange = [];

    /**
     * this are the alarms immediately 
     * fetched from the REST API
     */
    let rangeAlarms = await fetchAlarmsByDateRange(startDate, endDate)

    if (rangeAlarms.length > 0) {
        alarmsForRange = breakDownAlarmsArray(rangeAlarms);
    }
    appStore.dispatch(addIBSAlarmsRangeToStore(alarmsForRange));
}