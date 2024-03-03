import { NavLink, useNavigate, useParams } from '@remix-run/react';
import { useEffect, useState } from 'react'
import { gameModes } from '~/lib/constants'
import './NavBar2.css'

const games = {
  WZ: ['ashikaIsland', 'rankedResurgence', 'alMazrah'],
  MW3: ['mw3', 'mw3Ranked', 'mwz'],
}

const NavBar2 = () => {
  const [game, setGame] = useState('WZ')
  const { type, weapon } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!type) {
      navigate('ashikaIsland')
    }
  }, [type])
  
  useEffect(() => {
    if (!games[game].includes(type)) {
      navigate(`${games[game][0]}/${weapon || ''}`)
    }
  }, [game, type])

  return (
    <div className="nav">
      <div className="nav__logo">
        <img data-active={game === 'WZ'} src="/images/wz2-logo.webp" alt="wz-logo" onClick={() => setGame('WZ')} />
        <img data-active={game === 'MW3'} src="/images/mw3-logo.webp" alt="wz-logo" onClick={() => setGame('MW3')} />
      </div>
      <div className="tabs">
        {games[game]
          .map((gameType) => (
            <NavLink
              to={`${gameType}/${weapon || ''}`}
              key={gameType}
              className="tab"
              data-active={gameType === type}
            >
              {gameModes[gameType]}
            </NavLink>
          ))}
      </div>
    </div>
  )
}

export default NavBar2