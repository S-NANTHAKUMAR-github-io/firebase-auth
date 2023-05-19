import { createContext, useContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    RecaptchaVerifier,    
} from 'firebase/auth';
import { auth } from '../firebase'


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    // const auth = getAuth();
    const [user, setuser] = useState("")

    function signUp(email, pasword) {
        return createUserWithEmailAndPassword(auth, email, pasword)
    }

    function login(email, pasword) {
        // console.log(email);
        return signInWithEmailAndPassword(auth, email, pasword)
    }

    function logOut() {
        return signOut(auth)
    }

    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    function setUpRecaptha(number) {
        const recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {},
            auth
        );
        recaptchaVerifier.render();
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setuser(currentUser)
        });
        return () => {
            unsubscribe();
        }
    }, [])


    return (
        <userAuthContext.Provider 
        value={{ 
            user, 
            signUp, 
            login, 
            logOut, 
            googleSignIn, 
            setUpRecaptha 
            }}
            >
            {children}
        </userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext)
}

// To summarize the order of execution:

// Import statements
// userAuthContext creation
// userAuthContextProvider function definition
// State initialization
// Authentication functions
// useEffect subscription
// Context provider return
// useUserAuth custom hook