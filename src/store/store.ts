import { combineReducers, createStore } from "redux";
import { themeReducer } from "./theme/theme.reducer";
import { weatherReducer } from "./weather/weather.reducer";

export const store = createStore(combineReducers({
    weatherState: weatherReducer,
    themeState: themeReducer
}));