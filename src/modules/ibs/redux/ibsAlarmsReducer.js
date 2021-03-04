export const ibsInitialState = [];

export const ibsAlarmsReducer = (state = ibsInitialState, action) => {
    switch (action.type) {
        case 'ADD_IBS_ALARM':

            return [
                ...state,
                action.payload.ibsAlarm
            ]

        case 'UPDATE_IBS_ALARM':
            /**
             * this case updates one alarm at a time
             * the update process is:
             * 1. get the index of the IBS alarm to update
             * 2. get a copy of the array upto the point of the update(using slice funtion)
             * 3. insert the update 
             * 4. insert a copy of the rest of the array
             * 5. spread operator merges the 3 arrays(2,3,4) and 
             *    returns the new array as the updated state
             */
            let indexOfAlarmToUpdate = state.allAlarms.ibsAlarms.findIndex(alarm => alarm.id === action.payload.id);

            // this is the index of the next item after the update
            let nextIndex = indexOfAlarmToUpdate + 1;
            let updatedAlarm = action.payload;

            return {
                ...state, // copy of current state
                ibsAlarms: [
                    ...state.ibsAlarms.slice(0, indexOfAlarmToUpdate),
                    updatedAlarm,
                    ...state.ibsAlarms.slice(nextIndex)
                ]
            }

        default:
            return state;
    }
};

export const ibsAlarmsDateReducer = (state = ibsInitialState, action) => {
    switch (action.type) {
        case 'ADD_IBS_ALARMS_DATE':
            state.splice(0,state.length);
            return [
                ...state,
                action.payload.ibsAlarmsDate
            ]

        default:
            return state;
    }
};

export const ibsAlarms7DaysReducer = (state = ibsInitialState, action) => {
    switch (action.type) {
        case 'ADD_IBS_ALARMS_7_DAYS':
            state.splice(0,state.length);
            return [
                ...state,
                action.payload.ibsAlarms7Days
            ]

        default:
            return state;
    }
};

export const ibsAlarms30DaysReducer = (state = ibsInitialState, action) => {
    switch (action.type) {
        case 'ADD_IBS_ALARMS_30_DAYS':

            state.splice(0,state.length);
            return [
                ...state,
                action.payload.ibsAlarms30Days
            ]

        default:
            return state;
    }
};

export const ibsAlarms12HrsReducer = (state = ibsInitialState, action) => {
    switch (action.type) {
        case 'ADD_IBS_ALARMS_12_HRS':
            state.splice(0,state.length);
            return [
                ...state,
                action.payload.ibsAlarms12Hrs
            ]

        default:
            return state;
    }
};

export const ibsAlarms24HrsReducer = (state = ibsInitialState, action) => {
    switch (action.type) {
        case 'ADD_IBS_ALARMS_24_HRS':
            state.splice(0,state.length);
            return [
                ...state,
                action.payload.ibsAlarms24Hrs
            ]

        default:
            return state;
    }
};

export const ibsAlarmsRangeReducer = (state = ibsInitialState, action) => {
    switch (action.type) {
        case 'ADD_IBS_ALARMS_RANGE':

            state.splice(0,state.length);
            return [
                ...state,
                action.payload.ibsAlarmsRange
            ]

        default:
            return state;
    }
};