import ProfilePicture from "./ProfilePicture";
import Profile from "../../assets/images/profile.jpg";

export default {
  title: "Components/ProfilePicture",
  component: ProfilePicture,
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
  },
};

const Template = (args) => <ProfilePicture {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: Profile, // ✅ No curly braces around Profile
  alt: "Default Profile Picture",
};

export const CustomImage = Template.bind({});
CustomImage.args = {
  src: "https://randomuser.me/api/portraits/men/75.jpg",
  alt: "Custom Profile Picture",
};
