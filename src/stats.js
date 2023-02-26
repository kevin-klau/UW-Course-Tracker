import { useState, useEffect } from 'react';
import './App.css';
import data from './datafull.json';
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, ReferenceArea, ReferenceDot, ReferenceLine, Brush, Legend, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import { DefaultTooltipContent } from 'recharts/lib/component/DefaultTooltipContent';



const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{backgroundColor:'white', width:'270px', paddingLeft:'13px', borderColor:'green', border: '1px solid', borderRadius:'5px'}}>
          <p className="labelCode" style={{fontFamily: 'Anderson Grotesk', fontSize:'25px', paddingTop:'10px', marginBottom:'-5px', width:'200px'}}><strong>{payload[0].payload.code}</strong></p>
          <p className="labelCourse" style={{fontFamily: 'Anderson Grotesk', fontSize:'18px', marginBottom: '8px', width:'250'}}><strong>{payload[0].payload.name}</strong></p>
          <p className="label" style={{fontFamily: 'Anderson Grotesk', fontSize:'15px', marginBottom:'2px'}}><strong>Easy: </strong> {payload[0].payload.easy}%</p>
          <p className="label" style={{fontFamily: 'Anderson Grotesk', fontSize:'15px', marginBottom:'2px'}}><strong>Useful: </strong> {payload[0].payload.useful}%</p>
          <p className="label" style={{fontFamily: 'Anderson Grotesk', fontSize:'15px', marginBottom:'2px'}}><strong>Liked: </strong> {payload[0].payload.liked}%</p>
          <p className="label" style={{fontFamily: 'Anderson Grotesk', fontSize:'15px', marginBottom:'2px', paddingBottom:'10px'}}><strong>Ratings: </strong> {payload[0].payload.ratings}</p>
        </div>
      );
    }
  
    return null;
  };


function CustomXAxis (){
    <p>hihi</p>
}
function DataChart ({ data }){
    
    const chartStyle={
        fontFamily: 'Anderson Grotesk',
    };

    const labelStyle={
        color:'green',
    };

    return(
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
            <XAxis label={{value: "Easiness", position: 'insideLeft', offset:'100'}} dataKey="easy" type="number" name="Easiness" unit="%" />
            <YAxis dataKey="useful" type="number" name="Usefulness" unit="%" />
            <ZAxis dataKey="liked" type="number" range={[100, 300]} name="Ratings" unit="" />
            <Tooltip 
                class="chart" 
                cursor={{ strokeDasharray: '10 10', stroke: 'black'}} 
                animationDuration={1000} 
                animationEasing={'ease'} 
                itemStyle={chartStyle}
                content={CustomTooltip}
                labelStyle={labelStyle}
                
            />
            <Legend />
            <Scatter data={data} fill="green" />
        </ScatterChart>
    );
}

export default function Stats({ props }){
    const [filteredInfo, setFilteredInfo] = useState([]);


    useEffect(() => {
        setFilteredInfo(data.filter(item => item.code.substring(0, props.course.length+1) ===(props.course+" ")));
    }, [props]);
    
    const scatterPlotData = filteredInfo.map(item => (Number(item.ratings) >= 5 && {
        code: item.code,
        name: item.name,
        liked: (Number(item.liked.substring(0,item.liked.length-1)) >= 0 && Number(item.liked.substring(0,item.liked.length-1)) <= 100) ? Number(item.liked.substring(0,item.liked.length-1)) : 0,
        easy: (Number(item.easy.substring(0,item.easy.length-1)) >= 0 && Number(item.easy.substring(0,item.easy.length-1)) <= 100) ? Number(item.easy.substring(0,item.easy.length-1)) : 0,
        useful: (Number(item.useful.substring(0,item.useful.length-1)) >= 0 && Number(item.useful.substring(0,item.useful.length-1)) <= 100) ? Number(item.useful.substring(0,item.useful.length-1)) : 0,
        ratings: Number(item.ratings)
    }));

    return(
        <div id="statistics">
            
            <h1>{props.course}</h1>
            <h2>{props.name}</h2>    
            
            <DataChart data={scatterPlotData} />   
            {filteredInfo.map(item => (
                <div key={item.code}>
                    <h2>{item.code}</h2>
                    <p>{item.name}</p>
                    <p>Ratings: {item.ratings}</p>
                    <p>Useful: {item.useful}</p>
                    <p>Easy: {item.easy}</p>
                    <p>Liked: {item.liked}</p>
                </div>
            ))}
                 
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