'use client';
import React, { createContext, useContext } from 'react';
import ICompany from '@models/company';

/** @type {React.Context<ICompany | undefined>} */
export const CompanyContext = createContext(undefined);

/**
 * Provides the company context to child components.
 * @param {{ company: ICompany, children: React.JSX.Element }} props
 * @returns {React.JSX.Element}
 */
export const CompanyProvider = ({ company, children }) => {
  return (
    <CompanyContext.Provider value={company}>
      {children}
    </CompanyContext.Provider>
  );
};

/**
 * A hook to access the company context.
 * @returns {ICompany}
 * @throws {Error} If the context is used outside of a CompanyProvider
 */
export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompanyContext must be used within a CompanyProvider');
  }
  return context;
};
