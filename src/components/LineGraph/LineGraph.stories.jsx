import LineGraph from "./LineGraph";

export default {
  title: "Components/LineGraph",
  component: LineGraph,
};

const sampleData = [
  { label: "Jan", value1: 40, value2: 20 },
  { label: "Feb", value1: 30, value2: 50 },
  { label: "Mar", value1: 50, value2: 70 },
  { label: "Apr", value1: 80, value2: 30 },
];

const sampleLines = [
  { dataKey: "value1", color: "#992E2E" }, // Red Line
  { dataKey: "value2", color: "#677727" }, // Blue Line
];

export const Default = () => <LineGraph data={sampleData} lines={sampleLines} />;
