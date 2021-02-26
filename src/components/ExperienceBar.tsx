import React, { ReactChildren } from 'react'
import { useChallenge } from '../contexts/ChallengeContext'
import styles from "../styles/components/ExperienceBar.module.css"

function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useChallenge()

  let progress = currentExperience * 100 / experienceToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: progress + "%" }} />

        <span className={styles.currentExperience} style={{ left: "50%" }}>
          {currentExperience} xp
          </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}

export default ExperienceBar
