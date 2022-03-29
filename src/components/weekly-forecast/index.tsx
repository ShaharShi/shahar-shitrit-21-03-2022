import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { weatherService } from '../../services/weather.service';
import { onChangeCurrentWeeklyForecast } from '../../store/weather/weather.actions';
import DailyForecastItem from '../daily-forecast-item';
import styles from './style.module.css'

export default function WeeklyForecast() {
    const { currentLocation, currentWeeklyForecast, isMetricUnitPreferred } = useSelector((state: IState) => state.weatherState)
    const dispatch = useDispatch()

    async function fetchLocationWeeklyForecast(locationId: string) {
        if (!locationId) return toast('There are no results for this term, try to search again ... ');

        const weeklyForecastResult = await weatherService.fetchWeeklyForecast(locationId, isMetricUnitPreferred);
        if (!weeklyForecastResult.result) return toast('There are no results for this term, try to search again ... ');

        dispatch(onChangeCurrentWeeklyForecast(weeklyForecastResult.result.weeklyForecast))
    }

    useEffect(() => {
        if (!currentLocation) return;
        fetchLocationWeeklyForecast(currentLocation.id)
    }, [currentLocation, isMetricUnitPreferred])
    return (
        <div className=''>
            { currentWeeklyForecast ? 
                <div className={`${styles.gridContainer}`}>
                        { currentWeeklyForecast.map((dailyForecast: IDailyForecast, i) => <DailyForecastItem key={i} data={dailyForecast}/> )}
                </div>
                :
                <div className='text-center'> Unavailable to get Weekly Forecast ...</div>
            }
        </div>
    )
}