//Implement context for protected routing

import React, { createContext, useState, useContext,useEffect } from 'react';
const authUserContext=createContext(null);

export default function AuthProvider ({children}) {
    const [isAuthenticated, _setIsAuthenticated] = useState(
        JSON.parse(localStorage.getItem('isAuthenticated')) || false
    );
    const [userAddress, _setUserAddress] = useState(
        localStorage.getItem('userAddress') || null
    );

    const setIsAuthenticated = (value) => {
        localStorage.setItem('isAuthenticated', JSON.stringify(value));
        _setIsAuthenticated(value);
    };

    const setUserAddress = (value) => {
        localStorage.setItem('userAddress', value);
        _setUserAddress(value);
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', function (accounts) {
                if (accounts.length > 0) {
                    setUserAddress(accounts[0]);
                    setIsAuthenticated(true);
                } else {
                    setUserAddress(null);
                    setIsAuthenticated(false);
                }
            });
        }
    }, []);

    return (
        <authUserContext.Provider value={{ isAuthenticated, userAddress, setIsAuthenticated, setUserAddress }}>
            {children}
        </authUserContext.Provider>
    ); 
}

export const useAuth =()=>
{
    const context=useContext(authUserContext);
    if(context===undefined)
    {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
