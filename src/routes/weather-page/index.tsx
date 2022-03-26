import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import CurrentLocation from '../../components/current-location';
import SearchBar from '../../components/search-bar';
import { weatherService } from '../../services/weather.service';
import { onChangeCurrentLocation, onChangeCurrentWeeklyForecast } from '../../store/weather/weather.actions';
import styles from './style.module.css';

export default function WeatherPage () {
    const currentLocation = useSelector((state: IState) => state.weatherState.currentLocation)
    const isMetricUnitPreferred = useSelector((state: IState) => state.weatherState.isMetricUnitPreferred)
    const [termLocations, setTermLocations] = useState<IPartialLocation[]>([])
    const dispatch = useDispatch()

    async function searchLocations(term: string, getDefaultLocation?: boolean) {
        if (!term || !term.length) return;
        const locationsResult = await weatherService.fetchLocation(term);

        if (locationsResult.message && locationsResult.isError) return toast(locationsResult.message);
        if (locationsResult.result && getDefaultLocation) await fetchLocationInfo(locationsResult.result[0])
        else if (locationsResult.result && !getDefaultLocation) {
            if (!locationsResult.result.length) return toast.error(`There isn't a location with the given term - "${term}"`)
            setTermLocations(locationsResult.result as IPartialLocation[]);
            fetchLocationInfo(locationsResult.result[0])
        }
    }
    async function fetchLocationInfo(partialLocation: IPartialLocation) {
        if (!partialLocation) return toast('There are no results for this term, try to search again ... ');

        const conditionResult = await weatherService.fetchLocationConditions(partialLocation.id);
        if (!conditionResult.result || conditionResult.isError) return toast(conditionResult.message);

        const location: ILocation = {
            id: partialLocation.id,
            locationName: partialLocation.locationName,
            temperature: conditionResult.result.temperature,
            condition: conditionResult.result.condition,
        }
        dispatch(onChangeCurrentLocation(location))
    }
    async function fetchLocationWeeklyForecast(locationId: string) {
        if (!locationId) return toast('There are no results for this term, try to search again ... ');

        const weeklyForecastResult = await weatherService.fetchWeeklyForecast(locationId, isMetricUnitPreferred);
        if (!weeklyForecastResult.result) return toast('There are no results for this term, try to search again ... ');

        dispatch(onChangeCurrentWeeklyForecast(weeklyForecastResult.result.weeklyForecast))
    }
    function initialDefaultLocation() {
        navigator.geolocation.getCurrentPosition(_success, _failure);
        
        async function _success(position: GeolocationPosition) {
            if (currentLocation) return;
            const geoPositionResult = await weatherService.fetchLocationByGeoPosition(position.coords.latitude, position.coords.longitude);
            if (!geoPositionResult.result || geoPositionResult.isError) return toast(geoPositionResult.message);
            
            searchLocations(geoPositionResult.result.locationName);
        }
        async function _failure() {
            searchLocations('tel aviv', true);
        }
    }

    useEffect(() => {
        initialDefaultLocation()
    }, [])
    return (
        <div className={`${styles.pageContainer} page-height`}>
            <div>
                <SearchBar termLocations={termLocations} searchLocations={searchLocations}/>
            </div>
            <CurrentLocation fetchLocationWeeklyForecast={fetchLocationWeeklyForecast}/>
        </div>
    )
}