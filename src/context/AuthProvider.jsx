import React, { Children, useState } from 'react';
import AuthContext from './AuthContext';
import { info } from 'autoprefixer';

const AuthProvider = ({Children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const authInfo = {

    }
    return (
        <AuthContext.Provider value={authInfo}>
        {Children}
            
        </AuthContext.Provider>
    );
};

export default AuthProvider;