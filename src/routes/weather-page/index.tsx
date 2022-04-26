import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import CurrentLocation from '../../components/current-location';
import SearchBar from '../../components/search-bar';
import { weatherService } from '../../services/weather.service';
import { changeCurrentLocationAction } from '../../store/weather/weather.actions';
import styles from './style.module.css';

export default function WeatherPage () {
    const currentLocation = useSelector((state: IState) => state.weatherState.currentLocation)
    const [termLocations, setTermLocations] = useState<IPartialLocation[]>([])
    const dispatch = useDispatch()

    async function searchLocations(term: string) {
        if (!term || !term.length) return;
        
        weatherService.fetchLocation(term).then(locationResult => {
            const locations = locationResult.data.map((loc: any) => ({
                id: loc.Key,
                locationName: loc.LocalizedName,
            }))
            if (!locations.length) return toast.error(`There isn't a location with the given term - "${term}"`)
            setTermLocations(locations as IPartialLocation[]);
            
        }).catch((err: AxiosError) => {
            console.log(err.message);
            toast(err.message)
        });
    }
    async function setLocation(partialLocation: IPartialLocation) {
        if (!partialLocation) return toast('There are no results for this term, try to search again ... ');
        
        dispatch(changeCurrentLocationAction(partialLocation))
    }

    function initialDefaultLocation() {
        if (currentLocation) return;
        navigator.geolocation.getCurrentPosition(_success, _failure);
        
        async function _success(position: GeolocationPosition) {
            weatherService.fetchLocationByGeoPosition(position.coords.latitude, position.coords.longitude).then((geoPositionResult) => {
                
                setLocation(geoPositionResult.data);
            }).catch((err: AxiosError) => toast(err.message));
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