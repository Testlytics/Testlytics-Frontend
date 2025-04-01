import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Heading from "../Heading/Heading"; // Import Heading Component

const data = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 50 },
  { name: "Mar", value: 40 },
  { name: "Apr", value: 70 },
  { name: "May", value: 100 },
  { name: "Jun", value: 90 },
  { name: "Jul", value: 120 },
];

const AreaChartComponent = () => {
  return (
    <div style={{ width: "100%", height: 350, padding: "20px", borderRadius: "10px" }}>
      {/* Section Heading */}
      <Heading text="Overall Performance" size="30px" />

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <defs>
            <linearGradient id="colorFill" x1="0" y1="0" x2="1" y2="0"> {/* Left to Right Gradient */}
              <stop offset="5%" stopColor="#5A643C" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#B6CA7A" stopOpacity={0.8} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#5A643C" fillOpacity={1} fill="url(#colorFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;
