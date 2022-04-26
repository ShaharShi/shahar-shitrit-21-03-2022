import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { weatherService } from "../services/weather.service";
import { themeReducer } from "./theme/theme.reducer";
import { weatherReducer } from "./weather/weather.reducer";

export const store = createStore(combineReducers({
    weatherState: weatherReducer,
    themeState: themeReducer
}), applyMiddleware(thunk.withExtraArgument(weatherService)));