import { useEffect, useState } from 'react';
import { Hint } from 'react-autocomplete-hint';
import { useSelector } from 'react-redux';
import styles from './style.module.css'
import { IoIosSearch } from 'react-icons/io'

interface ISearchBar {
    termLocations: IPartialLocation[];
    searchLocations: Function;
}

export default function SearchBar (props: ISearchBar) {
    const isDarkMode = useSelector((statae: IState) => statae.themeState.isDarkMode)
    const [searchTerm, setSearchTerm] = useState('')
    const [hintData, setHintData] = useState<string[]>([])

    useEffect(() => {
        const { termLocations } = props;
        const hintArr: string[] = termLocations.map((t: IPartialLocation) => t.locationName);
        setHintData(hintArr)
    }, [props.termLocations])

    useEffect(() => {
        const { searchLocations } = props;
        const delayDebounceTimeout = setTimeout(() => {
            searchLocations(searchTerm)
        }, 300)
        return () => clearTimeout(delayDebounceTimeout)
      }, [searchTerm])
    return (
        <div className={styles.searchBarContainer}>
            <div className={`${isDarkMode ? 'background-dark text-light box-shadow-dark' : 'background-light text-dark box-shadow-light'}`}>
                <div className='d-flex align-items-center border-end px-2 me-2'><IoIosSearch size={40}/></div>
                <div className='flex-grow-1'>
                    <Hint options={hintData} allowTabFill>
                        <input type='text' className={`${styles.searchInput} ${isDarkMode ? 'text-light' : 'text-dark'}`} list={'cities'} name={'term'} onChange={(e) => setSearchTerm(e.target.value)} placeholder={'Search for a location ...'}/>
                    </Hint>
                </div>
            </div>
        </div>
    )
}