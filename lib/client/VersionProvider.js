'use client';
import React, { createContext, useContext } from 'react';
import IVersion from '@models/version';

/** @type {React.Context<IVersion | undefined>} */
export const VersionContext = createContext(undefined);

/**
 * Provides the version context to child components.
 * @param {{ version: IVersion, children: React.JSX.Element }} props
 * @returns {React.JSX.Element}
 */
export const VersionProvider = ({ version, children }) => {
  return (
    <VersionContext.Provider value={version}>
      {children}
    </VersionContext.Provider>
  );
};

/**
 * A hook to access the version context.
 * @returns {IVersion}
 * @throws {Error} If the context is used outside of a VersionProvider
 */
export const useVersionContext = () => {
  const context = useContext(VersionContext);
  if (!context) {
    throw new Error('useVersionContext must be used within a VersionProvider');
  }
  return context;
};
