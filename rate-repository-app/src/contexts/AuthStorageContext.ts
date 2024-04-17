import { createContext } from 'react';
type AuthStorage = {
    removeAccessToken: () => void;
  };

const AuthStorageContext = createContext<AuthStorage | undefined>(undefined);

export default AuthStorageContext;