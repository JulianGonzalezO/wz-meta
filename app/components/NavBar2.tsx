import { NavLink, useLoaderData, useNavigate, useParams } from '@remix-run/react';
import { useEffect, useState } from 'react'
import { gameModes, gameModesOrder } from '~/lib/constants'
import './NavBar2.css'

const games = {
  WZ: ['ashikaIsland', 'rankedResurgence', 'alMazrah'],
  MW3: ['mw3', 'mw3Ranked', 'mwz'],
}

const NavBar2 = () => {
  const [game, setGame] = useState('WZ')
  const { type, weapon } = useParams()
  const navigate = useNavigate()
  const { data } = useLoaderData()

  useEffect(() => {
    if (!type) {
      navigate('ashikaIsland')
    }
  }, [type])
  
  useEffect(() => {
    navigate(`${games[game][0]}/${weapon || ''}`)
  }, [game])

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
      {/* {Object.entries(data.wzStatsTierList)
        .filter(([key, value]) => typeof value === "object" && !key.includes('2'))
        .sort((a, b) => gameModesOrder[a[0]] - gameModesOrder[b[0]])
        .map(([key]) => (
          <NavLink
            to={`${key}/${weapon || ''}`}
            key={key}
            className="tab"
            data-active={key === type}
          >
            {gameModes[key]}
          </NavLink>
        ))} */}
    </div>
  )
}

export default NavBar2