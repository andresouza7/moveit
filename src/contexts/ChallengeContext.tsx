import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import challenges from "../../challenges.json"
import { useAuth } from "./AuthContext"
import { useProfile } from "./ProfileContext"

import { UserProgressProps } from "./ProfileContext"

interface ChallengeObjectProps {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: ChallengeObjectProps;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

const ChallengesContext = createContext({} as ChallengesContextData)

export const useChallenge = function () {
  return useContext(ChallengesContext)
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const { user } = useAuth()
  const { loadUserProgress, saveUserProgress } = useProfile()

  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)

  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    if (user) {
      loadUserProgress(user.id)
        .then(u => {
          if (u) {
            setLevel(u.level)
            setCurrentExperience(u.currentExperience)
            setChallengesCompleted(u.challengesCompleted)
          }
        })
    } else {
      resetProgress()
    }
  }, [user])

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    // new Audio("/notification.mp3").play()

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🎉", {
        body: `Valendo ${challenge.amount}xp`
      })
    }
  }

  function resetProgress() {
    setLevel(1);
    setCurrentExperience(0)
    setChallengesCompleted(0)
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) return;

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount;

    if (finalExperience > experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp()
    }

    setChallengesCompleted(challengesCompleted + 1)
    setCurrentExperience(finalExperience)
    resetChallenge()

    if (user) {
      const newProgress: UserProgressProps = {
        level: level + 1,
        currentExperience: finalExperience,
        challengesCompleted: challengesCompleted + 1
      }

      saveUserProgress(newProgress)
    }
  }

  const CONTEXT_VALUES: ChallengesContextData = {
    level,
    currentExperience,
    experienceToNextLevel,
    challengesCompleted,
    activeChallenge,
    levelUp,
    startNewChallenge,
    resetChallenge,
    completeChallenge
  }

  return (
    <ChallengesContext.Provider value={CONTEXT_VALUES}>
      {children}
    </ChallengesContext.Provider>
  )
}