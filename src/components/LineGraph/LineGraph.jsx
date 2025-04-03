import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "./lineGraph.module.css";

const LineGraph = ({ timeScoreData = [] }) => {
  if (!timeScoreData.length) {
    return <div className={styles.graphContainer}>No data available</div>;
  }

  // Extract subjects with at least one valid score
  const subjectKeys = Object.keys(timeScoreData[0])
    .filter(key => key !== "time")
    .filter(subject => timeScoreData.some(entry => typeof entry[subject] === "number"));

  console.log("Filtered Subject Keys for Lines:", subjectKeys);
  console.log("Final Time Score Data:", timeScoreData);

  if (!subjectKeys.length) {
    return <div className={styles.graphContainer}>No valid data to display</div>;
  }

  return (
    <div className={styles.graphContainer}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={timeScoreData}>
          <XAxis dataKey="time" domain={["auto", "auto"]} label={{ value: "Time (minutes)", position: "insideBottom", offset: -5 }} />
          <YAxis domain={[0, "auto"]} label={{ value: "Score", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          {subjectKeys.map((subject, index) => (
            <Line
              key={subject}
              type="monotone"
              dataKey={subject}
              stroke={["#8884d8", "#82ca9d", "#ff7300", "#5A643C"][index % 4]}
              activeDot={{ r: 6 }}
              connectNulls={true} // ✅ Ensures lines don't break at null values
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
