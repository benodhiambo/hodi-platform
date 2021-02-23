export const ADD_IBS_ALARM = 'ADD_IBS_ALARM';
export const addIBSAlarmToStore = ibsAlarm => ({
    type: ADD_IBS_ALARM,
    payload: { ibsAlarm }
});

export const UPDATE_IBS_ALARM = 'UPDATE_IBS_ALARM';
export const updateIBSAlarm = ibsAlarm => ({
    type: UPDATE_IBS_ALARM,
    payload: { ibsAlarm }
});

export const ADD_IBS_ALARMS_DATE = 'ADD_IBS_ALARMS_DATE';
export const addIBSAlarmsDateToStore = ibsAlarmsDate => ({
    type: ADD_IBS_ALARMS_DATE,
    payload: { ibsAlarmsDate }
});

export const ADD_IBS_ALARMS_7_DAYS = 'ADD_IBS_ALARMS_7_DAYS';
export const addIBSAlarms7DaysToStore = ibsAlarms7Days => ({
    type: ADD_IBS_ALARMS_7_DAYS,
    payload: { ibsAlarms7Days }
});

export const ADD_IBS_ALARMS_30_DAYS = 'ADD_IBS_ALARMS_30_DAYS';
export const addIBSAlarms30DaysToStore = ibsAlarms30Days => ({
    type: ADD_IBS_ALARMS_30_DAYS,
    payload: { ibsAlarms30Days }
});

export const ADD_IBS_ALARMS_12_HRS = 'ADD_IBS_ALARMS_12_HRS';
export const addIBSAlarms12HrsToStore = ibsAlarms12Hrs => ({
    type: ADD_IBS_ALARMS_12_HRS,
    payload: { ibsAlarms12Hrs }
});

export const ADD_IBS_ALARMS_24_HRS = 'ADD_IBS_ALARMS_24_HRS';
export const addIBSAlarms24HrsToStore = ibsAlarms24Hrs => ({
    type: ADD_IBS_ALARMS_24_HRS,
    payload: { ibsAlarms24Hrs }
});
