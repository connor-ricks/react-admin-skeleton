'use client';
import React, { createContext, useContext } from 'react';
import IAccount from '@models/account';

/** @type {React.Context<IAccount | undefined>} */
export const AccountContext = createContext(undefined);

/**
 * Provides the account context to child components.
 * @param {{ account: IAccount, children: React.JSX.Element }} props
 * @returns {React.JSX.Element}
 */
export const AccountProvider = ({ account, children }) => {
  return (
    <AccountContext.Provider value={account}>
      {children}
    </AccountContext.Provider>
  );
};

/**
 * A hook to access the account context.
 * @returns {IAccount}
 * @throws {Error} If the context is used outside of a AccountProvider
 */
export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccountContext must be used within a AccountProvider');
  }
  return context;
};
