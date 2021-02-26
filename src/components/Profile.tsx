import { useAuth } from "../contexts/AuthContext"
import { useChallenge } from "../contexts/ChallengeContext"
import styles from "../styles/components/Profile.module.css"

export default function Profile() {
  const { level } = useChallenge()

  const { user, signIn, signOut } = useAuth()

  function onSignIn(e) {
    e.preventDefault()
    signIn()
  }

  function onSignOut(e) {
    e.preventDefault()
    signOut()
  }

  return (
    <div className={styles.profileContainer}>
      {/* <img src="https://avatars.githubusercontent.com/u/14267530?s=400&u=5d427eaff1f902702d34a5816c66df8781071f4b&v=4" alt="profile_img" /> */}

      <img src={user ? user.imgUrl : "icons/twitter.svg"} alt={"img"} />
      <div>
        <strong>{user ? user.name : "Visitante"}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
        {user && <small><a href="" onClick={onSignOut}>Sair</a></small>}
      </div>
      {!user && (
        <div className={styles.profileActionLinks}>
          <a href="" onClick={onSignIn}>Entrar com Google</a>
        </div>
      )}
    </div>
  )
}