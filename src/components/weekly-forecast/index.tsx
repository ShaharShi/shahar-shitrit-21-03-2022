import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentWeeklyForecastAction } from '../../store/weather/weather.actions';
import DailyForecastItem from '../daily-forecast-item';
import styles from './style.module.css'

export default function WeeklyForecast() {
    const { currentLocation, currentWeeklyForecast, isMetricUnitPreferred, updateWeeklyForecast } = useSelector((state: IState) => state.weatherState);
    const isDarkMode = useSelector((state: IState) => state.themeState.isDarkMode)
    const dispatch = useDispatch()

    async function getLocationWeeklyForecast(locationId: string) {
        if (!locationId) return toast.error('There are no results for this term, try to search again ... ');
        dispatch(changeCurrentWeeklyForecastAction(locationId, isMetricUnitPreferred))
    }

    useEffect(() => {
        if (!currentLocation) return;
        getLocationWeeklyForecast(currentLocation.id)
    }, [currentLocation, isMetricUnitPreferred])
    return (
        <div className=''>
            { currentWeeklyForecast ? 
                <div className={`${styles.gridContainer}`}>
                        { currentWeeklyForecast.map((dailyForecast: IDailyForecast, i) => <DailyForecastItem key={i} data={dailyForecast}/> )}
                </div>
                :
                <div className='text-center'>
                    { updateWeeklyForecast ? 
                        <div className={`spinner-border ${isDarkMode ? 'text-light' : 'text-dark'}`} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :
                        <p>
                            Unavailable to get Weekly Forecast ...
                        </p>
                    }
                    </div>
            }
        </div>
    )
}