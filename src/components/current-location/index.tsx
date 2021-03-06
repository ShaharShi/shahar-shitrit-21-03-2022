import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WeeklyForecast from '../weekly-forecast';
import styles from './style.module.css'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { addToFavoritesAction, removeFromFavoritesAction } from '../../store/weather/weather.actions';

export default function CurrentLocation () {
    const [isFavorite, setIsFavorite] = useState(false)
    const { currentLocation, isMetricUnitPreferred, favorites, updateCurrentLocation } = useSelector((state: IState) => state.weatherState)
    const isDarkMode = useSelector((state: IState) => state.themeState.isDarkMode)
    const dispatch = useDispatch()

    function addToFavorites() {
        if (!currentLocation) return toast('Could\'nt preform this action, please try refresh the page and try again !');
        dispatch(addToFavoritesAction(currentLocation))
    }
    function removeFromFavorites() {
        if (!currentLocation) return toast('Could\'nt preform this action, please try refresh the page and try again !');
        dispatch(removeFromFavoritesAction(currentLocation))
    }

    useEffect(() => {
        if (!currentLocation) return;
        const isLocationFavorite = favorites.find(fav => fav.id === currentLocation.id);
        setIsFavorite(isLocationFavorite ? true : false)
    }, [currentLocation, favorites])
    return (
        <div className={`${styles.currentLocationContainer} ${isDarkMode ? 'background-dark box-shadow-dark' : 'background-light box-shadow-light'}`}>
            { currentLocation ?
            <div className={`${styles.currentLocationWrapper}`}>
                <div className='d-flex'>
                   <div className={`${styles.detailsWrapper} d-flex flex-column justify-content-center border-start border-5 ps-3`}>
                       <span>{ currentLocation.locationName }</span>
                       { isMetricUnitPreferred ? 
                            <span>{ currentLocation.temperature.Metric.Value }&#176; { currentLocation.temperature.Metric.Unit }</span>
                            :   
                            <span>{ currentLocation.temperature.Imperial.Value }&#176; { currentLocation.temperature.Imperial.Unit }</span>
                        }
                   </div>
                   <div className='ms-auto'>
                       { isFavorite ? 
                            <div className='d-flex flex-column align-items-center app-btn' onClick={removeFromFavorites}>
                                <AiFillLike size={40}/>
                                <small>Unfavorite</small>
                            </div>
                            :
                            <div className='d-flex flex-column align-items-center app-btn' onClick={addToFavorites}>
                                <AiOutlineLike size={40}/>
                                <small>Favorite</small>
                            </div>
                        }
                   </div>
               </div>
               <div className={`${styles.middleWrapper}`}>
                   <p>{ currentLocation.condition }</p>
               </div>
               <WeeklyForecast />
            </div>
            :
            <div className='d-flex justify-content-center align-items-center w-100'>
                { updateCurrentLocation ? 
                <div className={`spinner-border ${isDarkMode ? 'text-light' : 'text-dark'}`} style={{width: '3rem', height: '3rem'}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                :
                <p className='fw-bold'>
                    There is'nt a location to watch, please try to search one with search field above.
                </p>
                }
            </div>
        }
        </div>
    )
}