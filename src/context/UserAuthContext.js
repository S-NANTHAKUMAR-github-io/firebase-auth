import { createContext, useContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import {auth} from '../firebase'


const userAuthContext = createContext();

export function UserAuthContextProvider({children}) {

    const [user, setuser] = useState("")

    function signUp(email,pasword){
        return createUserWithEmailAndPassword(auth, email, pasword)
    }

    function login(email,pasword){
        console.log(email);
        return signInWithEmailAndPassword(auth, email, pasword)
    }

    function logOut() {
        return signOut(auth)
    }

    function googleSignIn(){
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth,googleAuthProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
                setuser(currentUser)
        });
        return () => {
            unsubscribe();
        }
    }, [])
    

    return (
        <userAuthContext.Provider value={{user,signUp,login,logOut,googleSignIn}}>
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