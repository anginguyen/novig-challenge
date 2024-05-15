import Chart from 'chart.js/auto'
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import "../../weather-icons/clear-day.svg";

Chart.register(CategoryScale);

export default function Weather({ weekday, times, date, isLeft=false }) {
    const chartTimes = [times.hours[0] - 2, times.hours[0] - 1, ...times.hours, times.hours[times.hours.length-1] + 1, times.hours[times.hours.length-1] + 2];
    const chartData = {
        labels: chartTimes.map((time) => {
            if (time <= 12) {
                return time + ":00";
            }
            return (time-12) + ":00";
        }), 
        datasets: [
            {
                label: "Temperature (ºF)",
                data: chartTimes.map((time) => date.hours[time].temp),
                borderColor: "rgb(51, 148, 208)",
                borderWidth: 2,
                pointStyle: false,
                segment: {
                    borderColor: ctx => (ctx.p0DataIndex < 2 || ctx.p0DataIndex > times.hours.length) ? "rgba(51, 148, 208, 0.25)" : undefined
                },
                spanGaps: true 
            },
            {
                label: "Humidity (%)",
                data: chartTimes.map((time) => date.hours[time].humidity),
                borderColor: "rgb(65, 165, 94)",
                borderWidth: 2,
                pointStyle: false,
                segment: {
                    borderColor: ctx => (ctx.p0DataIndex < 2 || ctx.p0DataIndex > times.hours.length) ? "rgba(65, 165, 94, 0.25)" : undefined
                },
                spanGaps: true 
            },
            {
                label: "Wind Speed (mph)",
                data: chartTimes.map((time) => date.hours[time].windspeed),
                borderColor: "rgb(223, 77, 79)",
                borderWidth: 2,
                pointStyle: false,
                segment: {
                    borderColor: ctx => (ctx.p0DataIndex < 2 || ctx.p0DataIndex > times.hours.length) ? "rgba(223, 77, 79, 0.25)" : undefined
                },
                spanGaps: true 
            },
        ]
    }
    
    return (
        <div className='w-full flex flex-col gap-8 my-5 lg:w-1/2'>
            <p className={`text-center text-2xl font-bold ${isLeft ? 'text-red-600' : ''}`}>{weekday} the {date.datetime[date.datetime.length-2] !== '0' ? date.datetime[date.datetime.length-2] : ''}{date.datetime[date.datetime.length-1]}{date.datetime[date.datetime.length-1] === '1' ? "st" : date.datetime[date.datetime.length-1] === '2' ? "nd" : date.datetime[date.datetime.length-1] === '3' ? "rd" : "th"}</p>

            <div className='flex justify-center items-center gap-5'>
                <img src={require(`../../weather-icons/${date.icon}.svg`)} alt={`Weather API icon for ${date.icon}`} className='h-20' />

                <div className='flex flex-col gap-2'>
                    <p className='font-medium'>{date.conditions} {date.temp}ºF</p>

                    <div className='flex items-center gap-2'>
                        <img src={require('../../img/wind-icon.png')} alt="Wind speed" className='w-6 h-full' />
                        <p className='text-sm'>winds {date.windspeed}mph</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <img src={require('../../img/rain-icon.png')} alt="Chance of rain" className='w-6 h-full' />
                        <p className='text-sm'>{date.preciptype ? `${date.precipprob}% chance ${date.preciptype[0]}` : "no rain"}</p>
                    </div>
                </div>
            </div>

            <div className="chart-container">
                <Line 
                    data={chartData}
                    options={{
                        scales: {
                            y: {
                                grid: {
                                    display: false
                                },
                                suggestedMin: 0,
                                suggestedMax: 100,
                                steps: 20,
                            },
                            x: {
                                ticks: {
                                    color: ctx => (ctx.index < 2 || ctx.index > times.hours.length+1) ? 'grey' : 'black',
                                    font: {
                                        weight:  ctx => (ctx.index < 2 || ctx.index > times.hours.length+1) ? 'normal' : 'bold'
                                    }
                                }
                            }
                        }
                    }}
                />
                <p className='text-center text-sm mt-2 font-medium'>{times.name.toUpperCase()}</p>
            </div>
        </div>
    )
}