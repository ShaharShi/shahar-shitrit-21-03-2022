import { ACTIONS } from "./weather.types";

export const onChangeCurrentLocation = (payload: ILocation | null) => ({ type: ACTIONS.changeCurrentLocation, payload })
export const onChangeCurrentWeeklyForecast = (payload: IDailyForecast[]) => ({ type: ACTIONS.changeCurrentWeeklyForecast, payload })
export const onAddToFavorites = (payload: ILocation) => ({ type: ACTIONS.addToFavorites, payload })
export const onRemoveFromFavorites = (payload: ILocation) => ({ type: ACTIONS.removeFromFavorites, payload })
export const onToggleUnit = (payload: boolean) => ({ type: ACTIONS.toggleUnit, payload })