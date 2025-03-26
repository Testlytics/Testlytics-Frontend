import React from "react";
import TestReports from "./TestReports";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil"; // If using Recoil

export default {
  title: "Pages/TestReports",
  component: TestReports,
};

export const Default = () => (
  <RecoilRoot> {/* If using Recoil */}
    <MemoryRouter initialEntries={["/test-reports"]}>
      <TestReports />
    </MemoryRouter>
  </RecoilRoot>
);
