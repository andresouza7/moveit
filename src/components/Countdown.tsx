import styles from "../styles/components/Countdown.module.css"

import { useCountdown } from "../contexts/CountdownContext"

export default function Countdown() {
  const { minutes, seconds, isActive, hasFinished, startCountdown, resetCountdown } = useCountdown()
  
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("")
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("")

  // useEffect(() => {
  //   if (!activeChallenge && hasFinished) {
  //     setHasFinished(false)
  //     resetCountdown()
  //   }
  // }, [activeChallenge])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      ) : (
          <button
            className={`${styles.countdownButton} ${isActive && styles.countdownButtonActive}`}
            onClick={isActive ? resetCountdown : startCountdown}>
            {isActive ? "Abandonar ciclo" : "Iniciar um ciclo"}
          </button>
        )}
    </div>
  )
}