import { atom, selector } from "recoil";

// Stores user authentication status
export const isAuthenticatedState = atom({
  key: "isAuthenticatedState",
  default: false, // Initially, user is logged out
});

// Stores user role (admin/student)
export const userRoleState = atom({
  key: "userRoleState",
  default: "admin", // Default empty until login
});

// Stores user credentials (optional)
export const userState = atom({
  key: "userState",
  default: {
    username: "",
    password: "",
  },
});

// Selector for checking login status
export const userAuthSelector = selector({
  key: "userAuthSelector",
  get: ({ get }) => {
    const isAuthenticated = get(isAuthenticatedState);
    const userRole = get(userRoleState);
    return { isAuthenticated, userRole };
  },
});
