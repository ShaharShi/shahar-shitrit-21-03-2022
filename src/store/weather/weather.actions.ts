import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { ACTIONS } from "./weather.types";

export const onChangeCurrentLocation = (payload: ILocation | null) => ({ type: ACTIONS.changeCurrentLocation, payload })
export const onChangeCurrentWeeklyForecast = (payload: IDailyForecast[]) => ({ type: ACTIONS.changeCurrentWeeklyForecast, payload })
export const onAddToFavorites = (payload: ILocation[]) => ({ type: ACTIONS.addToFavorites, payload })
export const onRemoveFromFavorites = (payload: ILocation[]) => ({ type: ACTIONS.removeFromFavorites, payload })
export const onToggleUnit = (payload: boolean) => ({ type: ACTIONS.toggleUnit, payload })

export const changeCurrentLocationAction = (partialLocation: IPartialLocation) => (dispatch: Dispatch, getState: Function, weatherService: IWeatherService) => {
    weatherService.fetchLocationConditions(partialLocation.id)
    .then((result: AxiosResponse) => {
        if (!result.data.length) return alert('Location doesn\'t found !'); //todo error handling
        
        const location: ILocation = {
            id: partialLocation.id,
            locationName: partialLocation.locationName,
            temperature: result.data[0].Temperature,
            condition: result.data[0].WeatherText,
        }
        dispatch(onChangeCurrentLocation(location))
    })
    .catch((err: AxiosError) => {
        console.log(err.message) 
        alert(err.message) //todo error handling
    });
}
export const changeCurrentWeeklyForecastAction = (locationId: string, isMetricUnitPreferred: boolean) => (dispatch: Dispatch, getState: Function, weatherService: IWeatherService) => {
    weatherService.fetchWeeklyForecast(locationId, isMetricUnitPreferred)
    .then((result: AxiosResponse) => {
        if (!result.data) return alert('There are no results for this term, try to search again ... '); //todo error handling
        
        const weeklyForecastArr = result.data.DailyForecasts.map((item: any) => ({ timestamp: item.Date, temperature: item.Temperature }))
        dispatch(onChangeCurrentWeeklyForecast(weeklyForecastArr))
    })
    .catch((err: AxiosError) => {
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