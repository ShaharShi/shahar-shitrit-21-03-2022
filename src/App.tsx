import './App.css';
import Header from './components/header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WeatherPage from './routes/weather-page';
import FavoritesPage from './routes/favorites-page';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';



function App() {
  const isDarkMode = useSelector((state: IState) => state.themeState.isDarkMode);
  const weatherErrorMessage = useSelector((state: IState) => state.weatherState.message);

  useEffect(() => {
    if (!weatherErrorMessage || !weatherErrorMessage.length) return;
    toast.error(weatherErrorMessage)
  }, [weatherErrorMessage])
  return (
    <div className={`App ${isDarkMode ? 'background-darker text-light' : 'background-lighter text-dark'}`}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<WeatherPage />}/>
          <Route path='/favorites' element={<FavoritesPage />} />
          <Route path='*' element={<WeatherPage />} />
        </Routes>
        <Toaster 
          position='bottom-center'
          toastOptions={{
            className: isDarkMode ? 'background-dark text-light box-shadow-dark' : 'background-light text-dark box-shadow-light',
            style: {
              width: 'fit-content',
              minWidth: 'fit-content'
            }
          }} />
      </Router>
    </div>
  );
}

export default App;
