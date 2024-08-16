'use client';
import React, { createContext, useContext } from 'react';
import IUser from '@models/user';

/** @type {React.Context<IUser | undefined>} */
export const UserContext = createContext(undefined);

/**
 * Provides the user context to child components.
 * @param {{ user: IUser, children: React.JSX.Element }} props
 * @returns {React.JSX.Element}
 */
export const UserProvider = ({ user, children }) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

/**
 * A hook to access the user context.
 * @returns {IUser}
 * @throws {Error} If the context is used outside of a UserProvider
 */
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
