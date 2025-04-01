import { atom } from 'recoil';
 
export const userState = atom({
  key: 'userState',
  default: null,
});
 
export const userRoleState = atom({
  key: 'userRoleState',
  default: 'admin',
});
 
export const isAuthenticatedState = atom({
  key: 'isAuthenticatedState',
  default: false,
});
 
export const authLoadingState = atom({
  key: 'authLoadingState',
  default: false,
});
 
export const authErrorState = atom({
  key: 'authErrorState',
  default: '',
});