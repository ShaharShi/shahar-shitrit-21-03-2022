import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './style.module.css'

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
    const setCity = (city: IPartialLocation) => props.setLocation(city);

    function setCities() {
        const citiesArr: IPartialLocation[] = props.termLocations;
        setCitiesComplete(citiesArr)
    }

    useEffect(() => setCities(), [props.termLocations])
    useEffect(() => {
        if (!searchTerm.length) return setCitiesComplete([]);
        const city = citiesComplete.find(c => c.locationName.toLocaleLowerCase() === searchTerm.toLocaleLowerCase());
        if (city) return setCity(city)

        const delayDebounceTimeout = delaySearch()
        return () => clearTimeout(delayDebounceTimeout)
      }, [searchTerm])
    return (
        <div className={styles.searchBarContainer}>
            <div className={`w-75 ${isDarkMode ? 'background-dark text-light box-shadow-dark' : 'background-light text-dark box-shadow-light'}`}>
                <div className='flex-grow-1'>
                    <input type='text' className={`${styles.searchInput} ${isDarkMode ? 'text-light' : 'text-dark'}`} onChange={(e) => setSearchTerm(e.target.value)} list={'cities'} name={'term'} placeholder={'Search for a location ...'}/>
                    <datalist id={'cities'}>
                        { citiesComplete.map(city => <option key={city.id}>{ city.locationName }</option>)}
                    </datalist>
                </div>
            </div>
        </div>
    )
}