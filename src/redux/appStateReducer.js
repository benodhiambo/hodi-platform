import { FETCH_IBS_ALARMS_BEGIN, FETCH_IBS_ALARMS_END } from "./appStateActions";

const loadState = { isLoading: false, };

export const appStateReducer = (state = loadState, action) => {
    switch (action.type) {
        case FETCH_IBS_ALARMS_BEGIN:
            return {
                ...state,
                isLoading: true
            };

        case FETCH_IBS_ALARMS_END:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }
}