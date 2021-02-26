import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useRouter } from "next/router"

import firebase from "firebase/app"
import { db, auth } from "../firebase"
import { UserProfileProps, UserProgressProps } from "./ProfileContext"

interface UserProps {
  id: string;
  name: string;
  email: string;
  imgUrl?: string;
}

interface AuthContextData {
  user: UserProps;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextData)

export function useAuth() {
  return useContext(AuthContext)
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null as UserProps)

  const router = useRouter()

  function checkIfUserExists(email) {
    return db.users.where("email", "==", email)
      .get()
      .then(snapshot => {
        return snapshot.docs.length ? true : false;
      })
      .catch(e => {
        console.warn(e)
        return false
      })
  }

  useEffect(() => {
    return auth.onAuthStateChanged(signedUser => {
      // console.log(signedUser)
      if (signedUser) {
        setUser({
          id: signedUser.uid,
          name: signedUser.displayName,
          email: signedUser.email,
          imgUrl: signedUser.photoURL
        })
      }
      else setUser(null)
    }, error => {
      console.warn(error)
    })
  }, [])

  function signIn() {
    let provider = new firebase.auth.GoogleAuthProvider;

    auth.signInWithPopup(provider)
      .then(async (result) => {
        const signedUser = result.user;

        try {
          if (signedUser) {
            const newUserProgress: UserProgressProps = {
              level: 1,
              challengesCompleted: 0,
              currentExperience: 0
            }
            const newUserProfile: UserProfileProps = {
              name: signedUser.displayName,
              email: signedUser.email,
              imgUrl: signedUser.photoURL,
              progress: newUserProgress
            }
            // check if user exists
            const isRegistered = await checkIfUserExists(signedUser.email)
            if (!isRegistered) {
              db.users.doc(signedUser.uid).set(newUserProfile)
            } 
          }
        } catch (error) {
          console.warn(error)
        }
      })
      .catch(e => {
        console.warn(e.message)
      })
  }

  function signOut() {
    auth.signOut()
      .then(() => {
        setUser(null)
      })
      .catch(e => {
        console.warn(e)
      })
  }

  const CONTEXT_VALUES: AuthContextData = {
    user,
    signIn,
    signOut
  }

  return (
    <AuthContext.Provider value={CONTEXT_VALUES}>
      {children}
    </AuthContext.Provider>
  )
}
