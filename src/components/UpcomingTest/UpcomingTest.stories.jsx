import React from "react";
import UpcomingTest from "./UpcomingTest";

export default {
  title: "Components/UpcomingTest",
  component: UpcomingTest,
};

const testData = [
  { date: "2025-03-25", subject: "Math" },
  { date: "2025-03-28", subject: "Physics" },
  { date: "2025-04-01", subject: "Chemistry" }
];

export const Default = () => <UpcomingTest tests={testData} />;
export const NoTests = () => <UpcomingTest tests={[]} />;
