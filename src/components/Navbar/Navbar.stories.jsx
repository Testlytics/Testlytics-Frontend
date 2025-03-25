import Navbar from "./Navbar";
import { RecoilRoot } from "recoil";

export default {
  title: "Components/Navbar",
  component: Navbar,
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
};

export const Default = () => <Navbar />;
