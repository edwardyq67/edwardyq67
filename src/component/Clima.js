import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Clima = () => {
    const[Weather,setWeather]=useState({});
    const[kelvin,setKelvin]=useState(0);
    const[thermal,setThermal]=useState(true);
    useEffect(()=>{
        const success=pos=>{
            const latitude=pos.coords.latitude;
            const longitude=pos.coords.longitude;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b95203633d0f67ec25ce3d9230290535`)
            .then(res=>{
                setKelvin(res.data.main.temp-273.15)
                console.log(res.data)
                setWeather(res.data)
            })
        }
        navigator.geolocation.getCurrentPosition(success);
        },[]);
        const thermalChange=()=>{
            if(thermal){
                setKelvin((kelvin*9/5)+32)
                setThermal(false)
            }else{
                setKelvin((kelvin-32)*5/9)
                setThermal(true)
            }
        }
    
    return (
        <div className='antes'>
            <div className='todo'>
            <p>{Weather.name},{Weather.sys?.country}</p>
            <img src={`http://openweathermap.org/img/wn/${Weather.weather?.[0].icon}@2x.png`}></img>
            <h3>{kelvin}{thermal?'°F':'°C'} </h3>
            <div className='demas'>
            <h2>HUMIDITY: {Weather.main?.humidity} %</h2>
            <h2>ATMOSPHERIC PRESSURE: {Weather.main?.pressure} hPa</h2>
            <h2>NUBOSIDAD: {Weather.clouds?.all} %</h2>
            <button onClick={thermalChange}> transform to {thermal?'°C':'°F'}</button>
            </div></div>
        </div>
    );
};

export default Clima;