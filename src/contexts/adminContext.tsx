'use client'

import { createContext, useContext } from 'react';

export const AdminContext = createContext<any>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return (
        <AdminContext.Provider 
            value={{}}
        >
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = (): any => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
}