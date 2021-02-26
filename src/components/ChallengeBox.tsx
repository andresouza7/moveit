import React from 'react'
import styles from "../styles/components/ChallengeBox.module.css"

import { useChallenge } from "../contexts/ChallengeContext"
import { useCountdown } from '../contexts/CountdownContext'

function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useChallenge()
  const { resetCountdown } = useCountdown()

  function handleChallengeSucceeded() {
    completeChallenge()
    resetCountdown()
  }

  function handleChallengeFailed() {
    resetChallenge()
    resetCountdown()
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              className={styles.challengeFailButton}
              onClick={handleChallengeFailed}
            >Falhei</button>
            <button
              className={styles.challengeSuccessButton}
              onClick={handleChallengeSucceeded}
            >Completei</button>
          </footer>
        </div>
      ) : (
          <div className={styles.challengeNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="level up" />
          Avance de level completando desafios.
        </p>
          </div>
        )}
    </div>
  )
}

export default ChallengeBox
