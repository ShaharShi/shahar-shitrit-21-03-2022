import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import CurrentLocation from '../../components/current-location';
import SearchBar from '../../components/search-bar';
import { weatherService } from '../../services/weather.service';
import { onChangeCurrentLocation } from '../../store/weather/weather.actions';
import styles from './style.module.css';

export default function WeatherPage () {
    const currentLocation = useSelector((state: IState) => state.weatherState.currentLocation)
    const [termLocations, setTermLocations] = useState<IPartialLocation[]>([])
    const dispatch = useDispatch()

    async function searchLocations(term: string) {
        if (!term || !term.length) return;
        weatherService.fetchLocation(term).then(locationsResult => {

            if (locationsResult.message && locationsResult.isError) return toast(locationsResult.message);
            else if (locationsResult.result) {
                if (!locationsResult.result.length) return toast.error(`There isn't a location with the given term - "${term}"`)
                setTermLocations(locationsResult.result as IPartialLocation[]);
            }
        });

    }
    async function setLocation(partialLocation: IPartialLocation) {
        if (!partialLocation) return toast('There are no results for this term, try to search again ... ');

        weatherService.fetchLocationConditions(partialLocation.id).then((conditionResult) => {
            if (!conditionResult.result || conditionResult.isError) return toast(conditionResult.message);
    
            const location: ILocation = {
                id: partialLocation.id,
                locationName: partialLocation.locationName,
                temperature: conditionResult.result.temperature,
                condition: conditionResult.result.condition,
            }
            dispatch(onChangeCurrentLocation(location))
        });
    }

    function initialDefaultLocation() {
        if (currentLocation) return;
        navigator.geolocation.getCurrentPosition(_success, _failure);
        
        async function _success(position: GeolocationPosition) {
            weatherService.fetchLocationByGeoPosition(position.coords.latitude, position.coords.longitude).then((geoPositionResult) => {
                if (!geoPositionResult.result || geoPositionResult.isError) return toast(geoPositionResult.message);
                
                setLocation(geoPositionResult.result);
            });
        }
        async function _failure() {
            setLocation({ locationName: 'Tel Aviv', id: "215854" });
        }
    }

    useEffect(() => {
        initialDefaultLocation()
    }, [])
    return (
        <div className={`${styles.pageContainer} page-height`}>
            <div>
                <SearchBar termLocations={termLocations} setLocation={setLocation} searchLocations={searchLocations}/>
            </div>
            <CurrentLocation />
        </div>
    )
}