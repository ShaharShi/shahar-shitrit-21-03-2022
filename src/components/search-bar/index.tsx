import { createRef, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './style.module.css'
import { IoIosSearch } from 'react-icons/io'

interface ISearchBar {
    termLocations: IPartialLocation[];
    searchLocations: Function;
    setLocation: Function;
}

export default function SearchBar (props: ISearchBar) {
    const isDarkMode = useSelector((state: IState) => state.themeState.isDarkMode)
    const [searchTerm, setSearchTerm] = useState('')
    const [citiesComplete, setCitiesComplete] = useState<IPartialLocation[]>([])

    const delaySearch = () => setTimeout(() => props.searchLocations(searchTerm), 500);

    function setCities() {
        const citiesArr: IPartialLocation[] = props.termLocations;
        setCitiesComplete(citiesArr)
    }
    function handleClick(e: any) {
        const { setLocation } = props;
    }
    useEffect(() => setCities(), [props.termLocations])
    useEffect(() => {
        if (!searchTerm.length) return setCitiesComplete([]);

        const delayDebounceTimeout = delaySearch()
        return () => clearTimeout(delayDebounceTimeout)
      }, [searchTerm])
    return (
        <div className={styles.searchBarContainer}>
            <div className={`w-75 ${isDarkMode ? 'background-dark text-light box-shadow-dark' : 'background-light text-dark box-shadow-light'}`}>
                <div className='flex-grow-1'>
                    <input type='text' className={`${styles.searchInput} ${isDarkMode ? 'text-light' : 'text-dark'}`} onChange={(e) => setSearchTerm(e.target.value)} list={'cities'} name={'term'} placeholder={'Search for a location ...'}/>
                    <datalist id={'cities'}>
                        { citiesComplete.map(city => <option data-value={city.id} key={city.id}>{ city.locationName }</option>)}
                    </datalist>
                </div>
            </div>
            <div className={`w-25 d-flex justify-content-center align-items-center mx-4 ${isDarkMode ? 'background-dark text-light box-shadow-dark' : 'background-light text-dark box-shadow-light'}`}>
                <button className={styles.searchBtn} onClick={handleClick}>
                    <IoIosSearch size={40}/>
                </button>
            </div>
        </div>
    )
}