import {createContext, useContext} from 'react';
import {globalApplicationContext} from './globalState';

export const AppContext = createContext(globalApplicationContext);

export const useAppContext = () => useContext(AppContext);
