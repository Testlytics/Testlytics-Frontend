import LoginPage from "./LoginPage";

export default {
  title: "Pages/LoginPage",
  component: LoginPage,
};

const Template = (args) => <LoginPage {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithError = Template.bind({});
WithError.args = {
  error: "Invalid email or password!",
};

export const SuccessfulLogin = Template.bind({});
SuccessfulLogin.args = {
  email: "admin@test.com",
  password: "admin123",
};
