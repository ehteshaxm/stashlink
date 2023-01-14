import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { TwitterAuthProvider, signInWithPopup } from 'firebase/auth';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unSubscribe();
  }, []);

  const provider = new TwitterAuthProvider();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = TwitterAuthProvider.credentialFromResult(result);
      })
      .catch((error) => console.log(error));
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
    console.log('Logout done');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
