import { useChallenge } from "../contexts/ChallengeContext"
import styles from "../styles/components/CompletedChallenges.module.css"

export default function CompletedChallenges() {
  const {challengesCompleted} = useChallenge()

  return(
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}