import React, { createContext, useContext } from 'react';
import config from './config';

const ConfigContext = createContext(config);

export const ConfigProvider = ({ children }) => {
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  return useContext(ConfigContext);
};