import React from "react";
import DetailedReport from "./DetailedReport";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil"; // Import RecoilRoot

export default {
  title: "Pages/DetailedReport",
  component: DetailedReport,
};

export const Default = () => (
  <RecoilRoot> {/* Wrap inside RecoilRoot */}
    <MemoryRouter initialEntries={["/detailed-report/Math Test 1"]}>
      <DetailedReport />
    </MemoryRouter>
  </RecoilRoot>
);
