import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoriteItem from '../../components/favorite-item';
import styles from './style.module.css';

export default function FavoritesPage () {
    const favorites = useSelector((state: IState) => state.weatherState.favorites)

    return (
        <div className='page-height'>
            { favorites.length ? 
                <div className={styles.gridContainer}>
                    { favorites.map(fav => <FavoriteItem key={fav.id} data={fav}/>) }
                </div> : 
                <div className='h-100 d-flex justify-content-center align-items-center'>
                    <div className='text-center'>
                        <h3>There are no favorite items to show.</h3>
                        <p>
                            To add item to favorites, please go back to <Link to={'/'}>Home Page</Link>, search for location and click "Add to favorites" button.
                        </p>
                    </div>
                </div>
            }
        </div>
    )
}