import { createContext, ReactNode, useContext } from "react"
import { useAuth } from "./AuthContext"
import { db } from "../firebase"

export interface UserProgressProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export interface UserProfileProps {
  name: string;
  imgUrl: string;
  email: string;
  progress: UserProgressProps
}

interface ProfileContextData {
  loadUserProgress: (id: string) => Promise<UserProgressProps>;
  saveUserProgress: (u: UserProgressProps) => void;
}

const ProfileContext = createContext({} as ProfileContextData)

export function useProfile() {
  return useContext(ProfileContext)
}

interface ProfileProviderProps {
  children: ReactNode;
}

export function ProfileProvider({ children }: ProfileProviderProps) {
  const { user } = useAuth()

  function loadUserProgress(id: string) {
    return db.users.doc(id)
      .get()
      .then(doc => {
        return doc.data().progress;
      })
      .catch(e => console.warn(e))
  }

  function saveUserProgress(up: UserProgressProps) {
    db.users.doc(user.id)
      .update({ progress: up })
      .then(() => {
        console.log("updated successfully")
      })
      .catch(e => {
        console.warn(e)
      })
  }

  return (
    <ProfileContext.Provider value={{ loadUserProgress, saveUserProgress }}>
      {children}
    </ProfileContext.Provider>
  )
}