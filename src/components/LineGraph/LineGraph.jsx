import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import styles from "./lineGraph.module.css";

const LineGraph = ({ data = [], lines = [] }) => {
  // Prevent rendering if data is empty
  if (data.length === 0 || lines.length === 0) {
    return <div className={styles.graphContainer}>No data available</div>;
  }

  return (
    <div className={styles.graphContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color || "#5A643C"} // Default stroke color if undefined
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
