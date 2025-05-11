import Config from 'react-native-config';
import { applicationInstance } from 'bvg-innovation-state-management';
import { GlobalApplicationContext } from './globalApplicationContext';

/**
 * Instantiate the GlobalApplicationContext
 * This is where to keep all UI project specific configs and implementation
 * to be used by the underlying layers (StateManagement, Business and Core)
 */
const { API_URL } = Config;

export const globalApplicationContext = new GlobalApplicationContext(
  API_URL + '_api/v1',
);

applicationInstance.setContext(globalApplicationContext);
