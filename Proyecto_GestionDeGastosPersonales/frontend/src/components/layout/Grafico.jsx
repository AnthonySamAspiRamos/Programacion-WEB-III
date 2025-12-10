import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate, Link } from 'react-router-dom';
function Grafico() {  
  const data = [
    { name: "Enero", gastos: 400 },
    { name: "Febrero", gastos: 300 },
    { name: "Marzo", gastos: 500 },
  ];

  return (
    <div style={{ width: "100%", height: 250 ,marginTop:'10%'}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="gastos" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Grafico;


