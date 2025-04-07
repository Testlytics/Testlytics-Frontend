import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import styles from "./barGraph.module.css";

const COLORS = ["#282A2B", "#677727", "#B0BEA8"]; // Different colors for bars

const BarGraph = ({ data, orientation = "vertical" }) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div className={styles.graphContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout={isHorizontal ? "vertical" : "horizontal"}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          {isHorizontal ? (
            <>
              <XAxis type="number" />
              <YAxis type="category" dataKey="label" />
            </>
          ) : (
            <>
              <XAxis dataKey="label" />
              <YAxis type="number" />
            </>
          )}

          <Tooltip />

          <Bar
            dataKey="value"
            barSize={25}
            radius={isHorizontal ? [0, 15, 15, 0] : [15, 15, 0, 0]}
          >
            <LabelList
              dataKey="value"
              position={isHorizontal ? "right" : "top"}
              fill="black"
              fontSize={18}
              fontWeight="bold"
            />
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;
