
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,  } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.init";
import axios from "axios";





 export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();
 

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);

    };

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        return signInWithPopup(auth, provider )
    }


    const logOut = () => {
        return signOut(auth);
    }
    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser , updatedData);
    }
    


    


    const userInfo = {
        user,
        setUser,
        createNewUser,
        logOut,
        userLogin,
        loading,
        signInWithGoogle,
        updateUserProfile,

        
    };
    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('state captured', currentUser)
            if(currentUser?.email) {
                const user = {email: currentUser.email};

                axios.post('https://assignment-11-server-nine-chi.vercel.app/jwt', user, {withCredentials: true})
                .then(res => console.log(res.data))
                setLoading(false);


            }
            else {
                axios.post('https://assignment-11-server-nine-chi.vercel.app/logout', {}, {
                    withCredentials: true
                })
                .then(res => console.log('logout', res.data))
                setLoading(false);
            }
           



            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, []);

   
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;