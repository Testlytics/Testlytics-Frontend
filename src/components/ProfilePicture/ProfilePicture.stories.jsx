import ProfilePicture from "./ProfilePicture";

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
  src: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  alt: "Default Profile Picture",
};

export const CustomImage = Template.bind({});
CustomImage.args = {
  src: "https://randomuser.me/api/portraits/men/75.jpg",
  alt: "Custom Profile Picture",
};
