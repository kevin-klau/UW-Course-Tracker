import './App.css';
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, ReferenceArea, ReferenceDot, ReferenceLine, Brush, Legend, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";

const chartStyle={
    fontFamily: 'Anderson Grotesk',
};

export default function Chart ({ data }){
    
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
            <XAxis dataKey="x" type="number" name="Easiness" unit="%" />
            <YAxis dataKey="y" type="number" name="Usefulness" unit="%" />
            <ZAxis dataKey="z" type="number" range={[100, 250]} name="Ratings" unit="" />
            <Tooltip class="chart" cursor={{ strokeDasharray: '10 10', stroke: 'black'}} animationDuration={1000} animationEasing={'ease'} itemStyle={chartStyle} />
            <Legend />
            <Scatter data={data} fill="green" />
        </ScatterChart>
    );
}