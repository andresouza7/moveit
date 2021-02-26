import { AuthProvider } from "../contexts/AuthContext"
import { ChallengesProvider } from "../contexts/ChallengeContext"
import { ProfileProvider } from "../contexts/ProfileContext"
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ProfileProvider>
        <ChallengesProvider>
          <Component {...pageProps} />
        </ChallengesProvider>
      </ProfileProvider>
    </AuthProvider>
  )
}

export default MyApp
