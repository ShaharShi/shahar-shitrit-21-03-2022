import axios, { CancelTokenSource } from "axios";

const BASR_URL = process.env.REACT_APP_BASR_URL ? process.env.REACT_APP_BASR_URL : 'http://dataservice.accuweather.com';
const API_KEY = process.env.REACT_APP_API_KEY;

export const weatherService = {
    fetchLocation: async (term: string): Promise<{ message?: string, isError: boolean, result: IPartialLocation[] | null }>  => {
        try {
            const {data: locationResult} = await axios.get(`${BASR_URL}/locations/v1/cities/autocomplete`, {
                params: {
                    apikey: API_KEY,
                    q: term
                }
            })
            console.log(locationResult);
            if (!locationResult) throw new Error(`There is no result with the given term - "${term}"`);
            return { 
                result: locationResult.map((loc: any) => ({
                    id: loc.Key,
                    locationName: loc.LocalizedName,
                })),
                isError: false,
            }
        } catch (err) {
            const error = err as ErrorBase;
            console.log(error.message);
            return { message: error.message, isError: true, result: null };
        }
    },
    fetchLocationConditions: async (locationId: string) => {
        try {
            const {data: conditionResult} = await axios.get(`${BASR_URL}/currentconditions/v1/${locationId}`, {
                params: {
                    apikey: API_KEY
                }
            })
            if (!conditionResult.length) return { message: 'Location doesn\'t found !', isError: true, result: null }
            return { 
                result: {
                    temperature: conditionResult[0].Temperature,
                    condition: conditionResult[0].WeatherText,
                },
                isError: false
            };
        } catch (err) {
            const error = err as ErrorBase;
            console.log(error.message);
            return { message: error.message, isError: true, result: null };
        }
    },
    fetchWeeklyForecast: async (locationId: string, useMetric: boolean) => {
        try {
            const {data: weeklyForecastResult} = await axios.get(`${BASR_URL}/forecasts/v1/daily/5day/${locationId}`, {
                params: {
                    apikey: API_KEY,
                    metric: useMetric
                }
            })
            if (!weeklyForecastResult) throw new Error(`Could'nt get search result due to unknown error, please refresh the page and try again !`);
            return {
                result: {
                    weeklyForecast: weeklyForecastResult.DailyForecasts.map((item: any) => ({ timestamp: item.Date, temperature: item.Temperature }))
                },
                isError: false
            }
        } catch (err) {
            const error = err as ErrorBase;
            console.log(error.message);
            return { message: error.message, isError: true, result: null };
        }
    },
    fetchLocationByGeoPosition: async (latitude: number, longitude: number) => {
        try {
            const {data: geoPosition} = await axios.get(`${BASR_URL}/locations/v1/cities/geoposition/search`, {
                params: {
                    apikey: API_KEY,
                    q: `${latitude},${longitude}`
                }
            })
            if (!geoPosition) throw new Error(`Could'nt get search result due to unknown error, please refresh the page and try again !`);
            return {
                result: {
                    id: geoPosition.Key,
                    locationName: geoPosition.LocalizedName
                },
                isError: false
            }
        } catch (err) {
            const error = err as ErrorBase;
            console.log(error.message);
            return { message: error.message, isError: true, result: null };
        }
    },

}