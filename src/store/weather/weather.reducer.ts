const initialState: IWeatherState = {
    currentLocation: null,
    currentWeeklyForecast: [],
    favorites: [],
    isMetricUnitPreferred: true
}

export const weatherReducer = (state: IWeatherState = initialState, action: IAction) => {

    switch(action.type) {
        case 'CHANGE_CURRENT_LOCATION' : {
            const { payload } = action;
            return {
                ...state, currentLocation: payload
            }
        }
        case 'CHANGE_CURRENT_WEEKLY_FORECAST' : {
            const { payload } = action;
            return {
                ...state, currentWeeklyForecast: payload
            }
        }
        case 'ADD_TO_FAVORITES' : {
            const { payload: location } = action;
            return {
                ...state, favorites: [ ...state.favorites, location ]
            }
        }
        case 'REMOVE_FROM_FAVORITES' : {
            const { payload: location } = action;
            return {
                ...state, favorites: state.favorites.filter(fav => fav.id !== location.id)
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