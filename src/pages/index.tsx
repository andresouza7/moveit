import Head from "next/head"
import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import ChallengeBox from "../components/ChallengeBox";
import Ranking from "../components/Ranking"

import styles from "../styles/pages/Home.module.css"
import CountdownProvider from "../contexts/CountdownContext";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <Head>
            <title>Início | Moveit</title>
          </Head>
          <ExperienceBar />

          <CountdownProvider>
            <section className={styles.containerGrid}>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
              <div>
                <Ranking />
              </div>
            </section>
          </CountdownProvider>
        </div>
        <div className={styles.footer}>
          <p>Projeto MoveIt desenvolvido no NLW4 da Rocketseat - Fev/2021</p>
          <p>available @ {"  "}
            <a href="https://github.com/andresouza7/moveit" target="blank">github/andresouza7/moveit</a>
          </p>
      </div>
      </div>
    </>
  )
}
