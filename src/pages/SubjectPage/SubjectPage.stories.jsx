import React from "react";
import { RecoilRoot } from "recoil";
import SubjectPage from "./SubjectPage";

export default {
  title: "Pages/SubjectPage",
  component: SubjectPage,
};

const mockSubjects = [
  { subjectId: "math101", subjectName: "Mathematics" },
  { subjectId: "phy102", subjectName: "Physics" },
  { subjectId: "chem103", subjectName: "Chemistry" },
];

const mockSubjectDetails = {
  subject: "Mathematics",
  totalExams: 12,
};

const mockTableColumns = [
  { header: "Exam", accessor: "exam" },
  { header: "Score", accessor: "score" },
];

const mockTableData = [
  { exam: "Midterm", score: 85 },
  { exam: "Final", score: 90 },
];

const mockPerformanceGraphData = [
  { name: "Exam 1", score: 75 },
  { name: "Exam 2", score: 85 },
  { name: "Exam 3", score: 90 },
];

const mockClassToppers = ["Alice", "Bob", "Charlie"];

const Template = (args) => (
  <RecoilRoot>
    <SubjectPage {...args} />
  </RecoilRoot>
);

export const Default = Template.bind({});
Default.args = {
  leftListProps: {
    title: "Subjects",
    data: mockSubjects,
    itemKey: "subjectId",
    itemLabel: "subjectName",
    selectedItemId: "math101",
    onItemClick: () => {}, // Dummy function
  },
  subjectLayoutProps: {
    subjectDetails: mockSubjectDetails,
    tableColumns: mockTableColumns,
    tableData: mockTableData,
    performanceGraphData: mockPerformanceGraphData,
    classAccuracyData: mockPerformanceGraphData, // Same structure as performance data
    classToppers: mockClassToppers,
  },
};
