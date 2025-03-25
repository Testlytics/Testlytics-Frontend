import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import styles from "./barGraph.module.css";

const COLORS = ["#282A2B", "#677727", "#B0BEA8"]; // Different colors for bars

const BarGraph = ({ data }) => {
  return (
    <div className={styles.graphContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={data} margin={{ left: 20, right: 30 }}>
          <XAxis type="number" hide />
          <YAxis dataKey="label" type="category" width={50} />
          <Tooltip />
          <Bar dataKey="value" barSize={25} radius={[0, 15,15,0]}>
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
