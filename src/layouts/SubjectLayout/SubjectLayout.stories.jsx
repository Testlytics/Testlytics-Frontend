import React from "react";
import { RecoilRoot } from "recoil";
import SubjectLayout from "./SubjectLayout";

export default {
  title: "Layouts/SubjectLayout",
  component: SubjectLayout,
};

const Template = (args) => (
  <RecoilRoot>
    <SubjectLayout {...args} />
  </RecoilRoot>
);

export const Default = Template.bind({});
Default.args = {
  subjectDetails: { subject: "Mathematics", totalExams: 12 },
  tableColumns: ["Student ID", "Student Name", "Test 1", "Test 2", "Test 3"],
  tableData: [
    { "Student ID": "S001", "Student Name": "John Doe", "Test 1": 85, "Test 2": 90, "Test 3": 88 },
    { "Student ID": "S002", "Student Name": "Jane Smith", "Test 1": 78, "Test 2": 82, "Test 3": 80 },
  ],
  performanceGraphData: [
    { label: "Test 1", score: 85 },
    { label: "Test 2", score: 90 },
    { label: "Test 3", score: 88 },
  ],
  classAccuracyData: [
    { label: "Test 1", accuracy: 92 },
    { label: "Test 2", accuracy: 95 },
    { label: "Test 3", accuracy: 93 },
  ],
  classToppers: ["John Doe", "Jane Smith", "Emily Johnson"],
};
