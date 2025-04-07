import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Heading from "../Heading/Heading"; // Reusable heading component

const AreaChartComponent = ({
  data = [],
  title = "Chart Title",
  dataKey = "value",
  gradientId = "colorFill",
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: 350,
        padding: "20px",
        borderRadius: "10px",
      
      }}
    >
      {/* Section Heading */}
      <Heading text={title} size="30px" />

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="5%" stopColor="#5A643C" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#B6CA7A" stopOpacity={0.8} />
            </linearGradient>
          </defs>

          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#5A643C"
            fillOpacity={1}
            fill={`url(#${gradientId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;
