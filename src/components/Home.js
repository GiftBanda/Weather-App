import { useState, useEffect } from "react";

const Home = () => {

    const [weather, setWeather] = useState(null)
    // const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [city, setCity] = useState('Pretoria')

    const getWeather = async () => {
        // e.preventDefault()
       
        const api_call = await fetch(`http://localhost:3001/api?q=${city}`, {
            accept: 'application/json'
        })
        const data = await api_call.json()
        if (data.cod === "404") {
            setError('City not found')
        } else {
            setWeather(data)
            setError('')
           console.log(data)
        }
        //setIsLoading(false)
    }

    useEffect(() => {
        getWeather();
    }, [])


    const onSubmit = (e) => {
        e.preventDefault()
        getWeather()

        setCity('')
    }

    return(
        
        <div className="container">
            <img  className="wallpaper" src='../images/rain.jpg' alt="weather icon" />
            {error && <div className="error">{error}</div>}
            {weather === null ? <div><
                h1>Loading.....</h1>
               
             </div>: <div className="card"><h1>Weather App</h1>
            <h3>{weather.name === null ? '' : weather.name}</h3>
            
            <h2>Wind Speed: {weather.wind.speed === null ? '' : weather.wind.speed}</h2>
            <h2>Temperature: {weather.main.temp === null ? '': weather.main.temp}</h2>
            <h2>Clouds: {weather.weather[0].description === null ? '' : weather.weather[0].description}</h2>
            <form onSubmit={onSubmit}>
                <input type="text" name="city" placeholder="City" onChange={(e) => setCity(e.target.value) }/>
                <button onClick={getWeather}>Get Weather</button>
            </form>
            </div>}
        </div>
    );
}

export default Home;