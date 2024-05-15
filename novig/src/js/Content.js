import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query'
import { getDate } from '../utils/dateUtils';
import Dropdown from '../components/js/Dropdown'
import Weather from '../components/js/Weather';

const days = [
    {
        id: 0,
        name: "Sunday"
    },
    {
        id: 1,
        name: "Monday"
    }, 
    {
        id: 2,
        name: "Tuesday"
    },
    {
        id: 3,
        name:  "Wednesday"
    }, 
    {
        id: 4,
        name: "Thursday"
    }, 
    {
        id: 5,
        name: "Friday"
    }, 
    {
        id: 6,
        name: "Saturday"
    }
];

const times = [
    {
        id: 0,
        name: "Morning",
        hours: [8, 9, 10, 11, 12]
    }, 
    {
        id: 1,
        name: "Afternoon",
        hours: [12, 13, 14, 15, 16, 17]
    },
    {
        id: 2,
        name:  "Evening",
        hours: [17, 18, 19, 20, 21]
    }, 
];

export default function Content() {
    const queryClient = useQueryClient();
    const today = new Date();

    const [location, setLocation] = useState('Central Park, NY');
    const [weekday, setWeekday] = useState(today.getDay());
    const [time, setTime] = useState(0);
    const [startDateResults, setStartDateResults] = useState();
    const [endDateResults, setEndDateResults] = useState();
    const [resultPage, setResultPage] = useState(0);


    useEffect(() => {
        fetchWeatherResults(resultPage);
    }, [location, weekday, resultPage]);

    async function fetchWeatherResults(page) {
        const [startDate, endDate] = getDate(weekday, page);

        const startDateData = await queryClient.fetchQuery({
            queryKey: [location, startDate],
            queryFn: weatherQueryFn,
            staleTime: 1800000,
        })

        const endDateData = await queryClient.fetchQuery({
            queryKey: [location, endDate],
            queryFn: weatherQueryFn,
            staleTime: 1800000,
        })

        setStartDateResults(startDateData);
        setEndDateResults(endDateData);
    }

    const weatherQueryFn = async ({ queryKey }) => {
        const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${queryKey[1]}?unitGroup=us&include=hours&elements=datetime,temp,humidity,precipprob,preciptype,windspeed,conditions,icon&key=${process.env.REACT_APP_WEATHER_API_KEY}`, {
            "method": "GET"
        })
        .then(response => response.json());

        return data;
    }

    const handleWeekdayChange = (day) => {
        setTimeout(() => {
            setResultPage(0);
            setWeekday(day);
        }, 200);
    }

    const handleLocationBlur = (e) => {
        setTimeout(() => {
            setLocation(e.target.value);
            setResultPage(0);
        }, 200);
    }

    const handleNext = () => {
        setResultPage(resultPage + 1);
    }

    const handleBack = () => {
        if (resultPage <= 0) return; 
        setResultPage(resultPage - 1);
    }

    return (
        <div className='container lg:w-5/6 xl:w-3/4 lg:my-4'>
            <div className='flex flex-col gap-5 border-b py-3 lg:flex-row lg:justify-around lg:items-center'>
                <div className="flex items-center lg:w-1/4">
                    <img src={require('../img/location-icon.png')} alt="location marker" className='w-8 h-full' />
                    <input
                        type="text"
                        className="block w-full text-xl text-left font-bold rounded-md border-0 py-1.5 px-2 text-gray-900 placeholder:text-gray-400 placeholder:font-normal lg:text-lg"
                        placeholder="Location"
                        defaultValue={location}
                        onBlur={handleLocationBlur}
                    />
                </div>

                <div className='flex items-center w-full lg:w-3/4 lg:justify-end'>
                    <span className='text-gray-900 text-sm'>Every</span><Dropdown options={days} defaultOption={weekday} update={handleWeekdayChange} />
                    <Dropdown options={times} defaultOption={time} update={(time) => setTime(time)} />
                </div>
            </div>
            
            {startDateResults && endDateResults && (
                <div className='lg:flex lg:items-center lg:justify-between'>
                    <button onClick={handleBack} className='fixed top-1/2 left-0 lg:relative'><img src={require('../img/chevron-left-icon.png')} alt="left arrow" className='w-16 lg:h-full' /></button>

                    <div className='flex flex-col gap-3 w-full lg:flex-row xl:gap-12'>
                        <Weather weekday={days[weekday].name} times={times[time]} date={startDateResults.days[0]} isLeft={true} />
                        <Weather weekday={days[weekday].name} times={times[time]} date={endDateResults.days[0]} />
                    </div>

                    <button onClick={handleNext} className='fixed top-1/2 right-0 lg:relative'><img src={require('../img/chevron-right-icon.png')} alt="right arrow" className='w-16 lg:h-full' /></button>
                </div>
            )}
        </div>
    )
}