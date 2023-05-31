import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useState, createContext, useEffect } from "react";

export const AuthenticationContext = createContext();
export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const auth = getAuth();

  const saveUserToStorage = async (user) => {
    try {
      const userJson = JSON.stringify(user);
      await AsyncStorage.setItem("user", userJson);
    } catch (error) {
      console.log("Error saving user data to AsyncStorage: ", error);
    }
  };
  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
      saveUserToStorage(usr);
    } else {
      setIsLoading(false);
    }
  });
  const initializeApp = async () => {
    try {
      const userJson = await AsyncStorage.getItem("user");
      if (userJson) {
        const user = JSON.parse(userJson);
        setUser(user);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error initializing app: ", error);
      setIsLoading(false);
    }
  };

  // Call initializeApp when the component mounts
  useEffect(() => {
    initializeApp();
  }, []);

  const onLogin = (email, password) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((u) => {
        setUser(u.user); // Access the user object from the response
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      setError("Error: Passwords don't match");
      return;
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((u) => {
        setUser(u.user); // Access the user object from the response
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.message);
      });
  };

  const onLogout = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
        user,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
