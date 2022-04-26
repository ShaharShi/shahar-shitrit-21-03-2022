import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { createActionsGroup } from "../../utils/helpers";
import { ACTIONS } from "./weather.types";


export const {
    start: onChangeCurrentLocationStart,
    success: onChangeCurrentLocationSuccess,
    fail: onChangeCurrentLocationFail,
} = createActionsGroup<ILocation | null>({ start: ACTIONS.changeCurrentLocation, success: ACTIONS.changeCurrentLocation_success, fail: ACTIONS.changeCurrentLocation_fail})
export const {
    start: onChangeCurrentWeeklyForecastStart,
    success: onChangeCurrentWeeklyForecastSuccess,
    fail: onChangeCurrentWeeklyForecastFail,
} = createActionsGroup<IDailyForecast[]>({ start: ACTIONS.changeCurrentWeeklyForecast, success: ACTIONS.changeCurrentWeeklyForecast_success, fail: ACTIONS.changeCurrentWeeklyForecast_fail})

export const onAddToFavorites = (payload: ILocation[]) => ({ type: ACTIONS.addToFavorites, payload })
export const onRemoveFromFavorites = (payload: ILocation[]) => ({ type: ACTIONS.removeFromFavorites, payload })
export const onToggleUnit = (payload: boolean) => ({ type: ACTIONS.toggleUnit, payload })


export const changeCurrentLocationAction = (partialLocation: IPartialLocation) => (dispatch: Dispatch, getState: Function, weatherService: IWeatherService) => {
    dispatch(onChangeCurrentLocationStart())
    weatherService.fetchLocationConditions(partialLocation.id)
    .then((result: AxiosResponse) => {
        if (!result.data.length) return dispatch(onChangeCurrentWeeklyForecastFail('Location doesn\'t found !')); //todo error handling
        
        const location: ILocation = {
            id: partialLocation.id,
            locationName: partialLocation.locationName,
            temperature: result.data[0].Temperature,
            condition: result.data[0].WeatherText,
        }
        dispatch(onChangeCurrentLocationSuccess(location))
    })
    .catch((err: AxiosError) => {
        dispatch(onChangeCurrentLocationFail(err.message))
        console.log(err.message) 
        alert(err.message) //todo error handling
    });
}
export const changeCurrentWeeklyForecastAction = (locationId: string, isMetricUnitPreferred: boolean) => (dispatch: Dispatch, getState: Function, weatherService: IWeatherService) => {
    dispatch(onChangeCurrentWeeklyForecastStart())
    weatherService.fetchWeeklyForecast(locationId, isMetricUnitPreferred)
    .then((result: AxiosResponse) => {
        if (!result.data) return dispatch(onChangeCurrentWeeklyForecastFail('There are no results for this term, try to search again ... ')); //todo error handling
        
        const weeklyForecastArr: IDailyForecast[] = result.data.DailyForecasts.map((item: any) => ({ timestamp: item.Date, temperature: item.Temperature }))
        dispatch(onChangeCurrentWeeklyForecastSuccess(weeklyForecastArr))
    })
    .catch((err: AxiosError) => {
        dispatch(onChangeCurrentWeeklyForecastFail(err.message))
        console.log(err.message) 
        alert(err.message) //todo error handling
    });;
}
export const addToFavoritesAction = (location: ILocation) => (dispatch: Dispatch, getState: Function) => {
    const state: IState = getState();
    const updatedFavorites = [...state.weatherState.favorites, location]
    dispatch(onAddToFavorites(updatedFavorites))
}
export const removeFromFavoritesAction = (location: ILocation) => (dispatch: Dispatch, getState: Function) => {
    const state: IState = getState();
    const updatedFavorites = state.weatherState.favorites.filter(f => f.id !== location.id)
    dispatch(onRemoveFromFavorites(updatedFavorites))
}