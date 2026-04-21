import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function MutationGraph({ data }) {
  return (
    <div className="glass-panel" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '200px' }}>
      <h3 style={{ margin: 0, fontSize: '1.1rem', marginBottom: '1rem', color: '#00f0ff' }}>Mutation Frequency Over Time</h3>
      
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 10}} />
            <YAxis stroke="rgba(255,255,255,0.4)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 10}} allowDecimals={false} />
            <Tooltip 
              contentStyle={{ background: 'rgba(5, 5, 10, 0.9)', border: '1px solid rgba(0,240,255,0.3)', borderRadius: '8px' }}
              itemStyle={{ color: '#00f0ff' }}
            />
            <Line type="monotone" dataKey="mutations" stroke="#ff3366" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MutationGraph;
