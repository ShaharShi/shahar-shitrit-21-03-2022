import moment from 'moment';
import { useSelector } from 'react-redux';
import styles from './style.module.css';

interface IDailyForecastItem {
    data: IDailyForecast;
}
export default function DailyForecastItem ({ data }: IDailyForecastItem) {
    const isDarkMode = useSelector((state: IState) => state.themeState.isDarkMode)

    return (
        <div className={`${styles.itemContainer} text-center fw-bold ${isDarkMode ? 'background-darken text-light' : 'background-lighten text-dark'}`}>
            <p>{moment(data.timestamp).format('ddd')}</p>
            <span>{data.temperature.Minimum.Value.toFixed(0)}&#176; - {data.temperature.Maximum.Value.toFixed(0)}&#176; {data.temperature.Maximum.Unit} </span>
        </div>
    )
}