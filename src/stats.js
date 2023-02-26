import { useState, useEffect } from 'react';
import './App.css';
import data from './datafull.json';
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, ReferenceArea, ReferenceDot, ReferenceLine, Brush, Legend, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";


export default function Stats({ props }){
    const [filteredInfo, setFilteredInfo] = useState([]);

    const chartStyle={
        fontFamily: 'Anderson Grotesk',
        
    };

    useEffect(() => {
        setFilteredInfo(data.filter(item => item.code.substring(0, props.course.length+1) ===(props.course+" ")));
    }, [props]);
    
    const scatterPlotData = filteredInfo.map(item => (Number(item.ratings) >= 5 && {
        name: item.name,
        x: Number(item.easy.substring(0,item.easy.length-1)),
        y: Number(item.useful.substring(0,item.easy.length-1)),
        z: Number(item.ratings.substring(0,item.easy.length-1))
    }));

    return(
        <div id="statistics">
            
            <h1>{props.course}</h1>
            <h2>{props.name}</h2>
            <ScatterChart
                width={600}
                height={500}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 10,
                    left: 10,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" type="number" name="Easiness" unit="%" />
                <YAxis dataKey="y" type="number" name="Usefulness" unit="%" />
                <ZAxis dataKey="z" type="number" range={[64, 144]} name="Ratings" unit="" />
                <Tooltip class="chart" cursor={{ strokeDasharray: '10 10'}} animationDuration={1000} animationEasing={'ease'} itemStyle={chartStyle} />
                <Legend />
                <Scatter name="A pool" data={scatterPlotData} fill="green" />
                </ScatterChart>
        </div>

    );

}

/*{filteredInfo.map(item => (
                <div key={item.code}>
                    <h2>{item.code}</h2>
                    <p>{item.name}</p>
                    <p>Ratings: {item.ratings}</p>
                    <p>Useful: {item.useful}</p>
                    <p>Easy: {item.easy}</p>
                    <p>Liked: {item.liked}</p>
                </div>
            ))}*/