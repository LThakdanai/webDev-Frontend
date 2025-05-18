import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
  
  const data = [
    {
      time: '8:30-9:30',
      CanLoading1: 2800,
      CanLoading2: 2100,
      CanLoading3: 1400,
      CanLoading4: 700,
    },
    {
      time: '9:40-10:30',
      CanLoading1: 2500,
      CanLoading2: 2000,
      CanLoading3: 1350,
      CanLoading4: 600,
    },
  ];
  
  export default function ProductionVolumeChart() {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold text">Production Volume Per Hour</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="CanLoading1" stroke="#e74c3c" />
            <Line type="monotone" dataKey="CanLoading2" stroke="#3498db" />
            <Line type="monotone" dataKey="CanLoading3" stroke="#f1c40f" />
            <Line type="monotone" dataKey="CanLoading4" stroke="#1abc9c" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  