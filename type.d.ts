interface IState {
    weatherState: IWeatherState;
    themeState: IThemeState;
}
interface IWeatherState {
    updateWeeklyForecast: boolean;
    updateCurrentLocation: boolean;
    currentLocation: ILocation | null;
    currentWeeklyForecast: IDailyForecast[];
    favorites: ILocation[];
    isMetricUnitPreferred: boolean;
}

interface IThemeState {
    isDarkMode: boolean;
}

interface IAction {
    type: string;
    payload?: Object<any>;
}

interface ILocation {
    id: string;
    locationName: string;
    temperature: ITemperature;
    condition: string;
}
interface ITemperature {
    Metric: {
        Value: number;
        Unit: string;
        UnitType: number;
    };
    Imperial: {
        Value: number;
        Unit: string;
        UnitType: number;
    }
}
interface IPartialLocation {
    id: string;
    locationName: string;
}

interface IDailyForecast {
    timestamp: string;
    temperature: IDailyForecastTemperature;
}
interface IDailyForecastTemperature {
    Minimum: {
        Value: number,
        Unit: string,
        UnitType: number
    },
    Maximum: {
        Value: number,
        Unit: string,
        UnitType: number
    }
}

interface IWeatherService {
    fetchLocation: Function;
    fetchLocationConditions: Function;
    fetchWeeklyForecast: Function;
    fetchLocationByGeoPosition: Function;
}

type ErrorBase = Error | AxiosError;