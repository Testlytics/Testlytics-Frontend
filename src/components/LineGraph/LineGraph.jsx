import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./lineGraph.module.css";
import Heading from "../Heading/Heading";

const LineGraph = ({ title = "", data = [], lines = [] }) => {
  if (data.length === 0 || lines.length === 0) {
    return <div className={styles.graphContainer}>No data available</div>;
  }

  return (
    <div className={styles.graphContainer}>
      {title && (
        <div className={styles.titleContainer}>
          <Heading text={title} size="30px"/>
        </div>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="testName" />
          <YAxis />
          <Tooltip />
          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color || "#5A643C"}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
