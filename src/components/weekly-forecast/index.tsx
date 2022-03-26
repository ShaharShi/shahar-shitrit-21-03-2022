import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DailyForecastItem from '../daily-forecast-item';
import styles from './style.module.css'

interface IWeeklyForecast {
    fetchLocationWeeklyForecast: Function;
}
export default function WeeklyForecast({ fetchLocationWeeklyForecast }: IWeeklyForecast) {
    const currentLocation = useSelector((state: IState) => state.weatherState.currentLocation)
    const currentWeeklyForecast = useSelector((state: IState) => state.weatherState.currentWeeklyForecast)
    const isMetricUnitPreferred = useSelector((state: IState) => state.weatherState.isMetricUnitPreferred)

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