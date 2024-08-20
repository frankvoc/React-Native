import {useState, useEffect} from 'react';
import axios from 'axios';

const apiKey = '9b77b27bf1b5490c9ff144933242008';
const url = 'http://api.weatherapi.com/v1';

interface weatherData{
    location:{
        name: string;
        region: string;
        country: string;
    };
    current:{
        temp_f: number;
        feelslike_f: number;
        condition:{
            text: string;
            icon: string
        };
    };
    forecast: {
        forecastday: Array<{
          date: string;
          day: {
            maxtemp_f: number;
            mintemp_f: number;
            condition: {
              text: string;
              icon: string;
            };
          };
        }>;
      };
    }    

const weatherHook = (location: string)=>{
    const [weather, setWeather] = useState<weatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchWeahter = async () =>{
            try {
                const response = await axios.get(`${url}/forecast.json`,{
                    params:{
                        key: apiKey,
                        q: location,
                        days:7,
                    },
                });
                setWeather(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                
            }
        };
        fetchWeahter();
    },[location]);
    return{weather,loading,error};
    };
export default weatherHook;