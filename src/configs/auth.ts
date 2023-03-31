import { STORAGE_KEYS } from "./storage";

export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',

  storageTokenKeyName: STORAGE_KEYS.accessToken,
  onTokenExpiration: 'logout'
}
