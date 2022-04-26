import axios, { AxiosResponse } from "axios";

const BASR_URL = process.env.REACT_APP_BASR_URL ? process.env.REACT_APP_BASR_URL : 'http://dataservice.accuweather.com';
const API_KEY = process.env.REACT_APP_API_KEY;

export const weatherService = {
    fetchLocation: async (term: string): Promise<AxiosResponse>  => {
        return axios.get(`${BASR_URL}/locations/v1/cities/autocomplete`, {
            params: {
                apikey: API_KEY,
                q: term
            }
        })
    },
    fetchLocationConditions: async (locationId: string): Promise<AxiosResponse> => {
        return axios.get(`${BASR_URL}/currentconditions/v1/${locationId}`, {
            params: {
                apikey: API_KEY
            }
        })
    },
    fetchWeeklyForecast: async (locationId: string, useMetric: boolean): Promise<AxiosResponse> => {
        return axios.get(`${BASR_URL}/forecasts/v1/daily/5day/${locationId}`, {
            params: {
                apikey: API_KEY,
                metric: useMetric
            }
        })
    },
    fetchLocationByGeoPosition: async (latitude: number, longitude: number): Promise<AxiosResponse> => {
        return axios.get(`${BASR_URL}/locations/v1/cities/geoposition/search`, {
            params: {
                apikey: API_KEY,
                q: `${latitude},${longitude}`
            }
        })
    }
}