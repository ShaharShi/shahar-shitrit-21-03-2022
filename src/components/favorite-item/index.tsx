import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { onChangeCurrentLocation } from '../../store/weather/weather.actions';
import styles from './style.module.css'

interface IFavoriteItem {
    data: ILocation;
}
export default function FavoriteItem({ data }: IFavoriteItem) {
    const isDarkMode = useSelector((state: IState) => state.themeState.isDarkMode)
    const isMetricUnitPreferred = useSelector((state: IState) => state.weatherState.isMetricUnitPreferred)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    function handleClick() {
        dispatch(onChangeCurrentLocation(data));
        navigate('/')
    }
    return (
        <div className={`${styles.itemContainer} ${isDarkMode ? 'background-dark box-shadow-dark' : 'background-light box-shadow-light'} text-center py-5 px-3 m-4`} onClick={handleClick}>
            <div className='d-flex flex-column mb-3'>
                <span>{ data.locationName }</span>
                { isMetricUnitPreferred ? 
                    <span>{ data.temperature.Metric.Value }&#176; { data.temperature.Metric.Unit }</span>
                    :   
                    <span>{ data.temperature.Imperial.Value }&#176; { data.temperature.Imperial.Unit }</span>
                }
            </div>
            <p>{ data.condition }</p>
        </div>
    )
}