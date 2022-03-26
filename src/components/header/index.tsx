import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { onDarkModeChange, onLightModeChange } from '../../store/theme/theme.actions';
import styles from './style.module.css';
import { MdDarkMode, MdFavorite } from 'react-icons/md';
import { BsSunFill } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { RiCelsiusLine, RiFahrenheitLine } from 'react-icons/ri';
import { useEffect } from 'react';
import { onToggleUnit } from '../../store/weather/weather.actions';

export default function Header () {
    const isDarkMode = useSelector((state: IState) => state.themeState.isDarkMode)
    const isMetricUnitPreferred = useSelector((state: IState) => state.weatherState.isMetricUnitPreferred)
    const dispatch = useDispatch()

    const setLocalStoragePreference = (key: string, enable: boolean) => localStorage.setItem(key, enable ? 'true' : 'false');

    function toggleTheme() {
        if (isDarkMode) {
            dispatch(onLightModeChange());
            setLocalStoragePreference('dark_mode_enabled', false)
        } else {
            dispatch(onDarkModeChange())
            setLocalStoragePreference('dark_mode_enabled', true)
        }
    }
    function toggleUnit() {
        if (isMetricUnitPreferred) {
            dispatch(onToggleUnit(false))
            setLocalStoragePreference('use_metric', false)
        } else {
            dispatch(onToggleUnit(true));
            setLocalStoragePreference('use_metric', true)
        }
    }

    useEffect(() => {
        const isMetricUnitPreferred = localStorage.getItem('use_metric');
        if (!isMetricUnitPreferred) return setLocalStoragePreference('use_metric', true);
        dispatch(onToggleUnit(JSON.parse(isMetricUnitPreferred)))
    }, [])
    useEffect(() => {
        const useDarkMode = localStorage.getItem('dark_mode_enabled');
        if (!useDarkMode) return setLocalStoragePreference('dark_mode_enabled', false);
        JSON.parse(useDarkMode) && dispatch(onDarkModeChange())
    }, [])
    return (
        <div className={`${styles.headerContainer} ${isDarkMode ? 'background-dark box-shadow-dark' : 'background-light box-shadow-light'}`}>
            <div>
                <h2 className='mx-2'> Herolo Weather </h2>
            </div>
            <div className='d-flex align-items-center'>
                <div className='d-flex align-items-center me-3'>
                    <div className='app-btn me-3' onClick={toggleUnit}>{isMetricUnitPreferred ? <RiFahrenheitLine size={25}/> : <RiCelsiusLine size={25}/>}</div>
                    <div className='app-btn' onClick={toggleTheme}>{isDarkMode ? <BsSunFill size={25}/> : <MdDarkMode size={25}/>}</div>
                </div>
                <div className='border-start border-2 ps-3'>
                    <Link className={`${isDarkMode ? 'text-light' : 'text-dark'} app-btn`} to={'/'}><FaHome size={25}/></Link>
                    <Link className={`${isDarkMode ? 'text-light' : 'text-dark'} app-btn mx-2`} to={'/favorites'}><MdFavorite size={25}/></Link>
                </div>
            </div>
        </div>
    )
}