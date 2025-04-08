// src/states/UserState.js

import { atom } from 'recoil';

// Stores full user object (e.g., { email, role, token })
export const userState = atom({
  key: 'userState',
  default: null,
});

// Stores only the user's role as a string
export const userRoleState = atom({
  key: 'userRoleState',
  default: '',
});

// Whether the user is authenticated
export const isAuthenticatedState = atom({
  key: 'isAuthenticatedState',
  default: false,
});

// Used to show loading while auth is being checked (during refresh or first load)
export const authLoadingState = atom({
  key: 'authLoadingState',
  default: true,
});

// Optionally used to show login errors or token failures
export const authErrorState = atom({
  key: 'authErrorState',
  default: '',
});
