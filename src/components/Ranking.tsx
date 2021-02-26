import React, { useEffect, useState } from 'react'
import styles from "../styles/components/Ranking.module.css"

import { db } from "../firebase"

function PlayerInfo({ player }) {
  return (
    <div className={styles.rankingItem}>
      <img src={player.imgUrl} alt={player.name} />
      <div>
        <p>{player.name}</p>
        <span>Level {player.level} - {player.currentExperience}xp</span>
      </div>
    </div>
  )
}

function Ranking() {
  const [players, setPlayers] = useState([])
  useEffect(() => {
    return db.users
      .onSnapshot(snapshot => setPlayers(snapshot.docs.map(doc => {
        const { name, imgUrl, progress } = doc.data()

        let data = {
          id: doc.id,
          name,
          imgUrl,
          level: progress.level,
          currentExperience: progress.currentExperience
        }
        return data
      })
        .sort((a, b) => a.level <= b.level && a.currentExperience < b.currentExperience ? 1 : -1)
      ))
  }, [])

  return (
    <div className={styles.rankingContainer}>
      <h4>Ranking</h4>
      {players.length > 0 && players.map((player) =>
        <PlayerInfo key={player.id} player={player} />
      )}
    </div>
  )
}

export default Ranking
