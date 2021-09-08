import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});


export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userLoggedInfo = localStorage.getItem('isLoggedUser');

        if(userLoggedInfo === 'true') setIsLoggedIn(true);
    }, []);

    const loginHandler = (email, password) => {
        localStorage.setItem('isLoggedUser', 'true');
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.setItem('isLoggedUser', 'false');
        setIsLoggedIn(false);
    };

    return <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler}}>{props.children}</AuthContext.Provider>
}

export default AuthContext;