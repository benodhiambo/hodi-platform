import { combineReducers } from "redux";
import { 
    ibsAlarms12HrsReducer,
    ibsAlarms24HrsReducer,
    ibsAlarms30DaysReducer,
    ibsAlarms7DaysReducer, 
    ibsAlarmsDateReducer, 
    ibsAlarmsRangeReducer, 
    ibsAlarmsReducer
 } from "../modules/ibs/redux/ibsAlarmsReducer";
import { appStateReducer } from "./appStateReducer";

export const rootReducer = combineReducers({
    ibsAlarms: ibsAlarmsReducer,
    ibsAlarmsDate: ibsAlarmsDateReducer,
    ibsAlarms12Hrs: ibsAlarms12HrsReducer,
    ibsAlarms24Hrs: ibsAlarms24HrsReducer,
    ibsAlarms7Days: ibsAlarms7DaysReducer,
    ibsAlarms30Days: ibsAlarms30DaysReducer,
    ibsAlarmsRange: ibsAlarmsRangeReducer,
    appState: appStateReducer
});