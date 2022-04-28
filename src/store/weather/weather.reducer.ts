const initialState: IWeatherState = {
    currentLocation: null,
    currentWeeklyForecast: [],
    favorites: [],
    message: '',
    updateWeeklyForecast: false,
    updateCurrentLocation: false,
    isMetricUnitPreferred: true
}

export const weatherReducer = (state: IWeatherState = initialState, action: IAction) => {

    switch(action.type) {
        case 'CHANGE_CURRENT_LOCATION_START' : {
            return {
                ...state, updateCurrentLocation: true
            }
        }
        case 'CHANGE_CURRENT_LOCATION_SUCCESS' : {
            const { payload } = action;
            return {
                ...state, currentLocation: payload, updateCurrentLocation: false
            }
        }
        case 'CHANGE_CURRENT_LOCATION_FAIL' : {
            const { payload } = action;
            return {
                ...state, updateCurrentLocation: false, message: payload
            }
        }
        case 'CHANGE_CURRENT_WEEKLY_FORECAST_START' : {
            return {
                ...state, updateWeeklyForecast: true
            }
        }
        case 'CHANGE_CURRENT_WEEKLY_FORECAST_SUCCESS' : {
            const { payload } = action;
            return {
                ...state, currentWeeklyForecast: payload, updateWeeklyForecast: false
            }
        }
        case 'CHANGE_CURRENT_WEEKLY_FORECAST_FAIL' : {
            const { payload } = action;
            return {
                ...state, updateWeeklyForecast: false, message: payload
            }
        }
        case 'ADD_TO_FAVORITES' : {
            const { payload: favorites } = action;
            return {
                ...state, favorites
            }
        }
        case 'REMOVE_FROM_FAVORITES' : {
            const { payload: favorites } = action;
            return {
                ...state, favorites
            }
        }
        case 'TOGGLE_UNIT' : {
            const { payload } = action;
            return {
                ...state, isMetricUnitPreferred: payload
            }
        }
        default: 
            return state;
    }
}