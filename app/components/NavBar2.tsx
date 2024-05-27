import { NavLink, useNavigate, useParams } from '@remix-run/react';
import { useEffect, useState } from 'react'
import { gameModes } from '~/lib/constants'
import './NavBar2.css'

const games = {
  WZ: ['ashikaIsland', 'rankedResurgence', 'alMazrah'],
  MW3: ['mw3', 'mw3Ranked', 'mwz'],
}

const NavBar2 = () => {
  const { game = 'WZ', type, weapon } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!game || !games[game]) {
      navigate('WZ')
    } else if (!games[game].includes(type)) {
      navigate(`${game}/${games[game][0]}/${weapon || ''}`)
    }
  }, [game])

  useEffect(() => {
    if (!type) {
      navigate(`${game}/${games[game][0]}`)
    }
  }, [type])


  return (
    <div className="nav">
      <div className="nav__logo">
        <NavLink
          to={`WZ/${type}/${weapon || ''}`}
          data-active={game === 'WZ'}
        >
          <img data-active={game === 'WZ'} src="/images/wz2-logo.webp" alt="wz-logo"  />
        </NavLink>
        <NavLink
          to={`MW3/${type}/${weapon || ''}`}
          data-active={game === 'MW3'}
        >
          <img data-active={game === 'MW3'} src="/images/mw3-logo.webp" alt="wz-logo" />
        </NavLink>
      </div>
      <div className="tabs">
        {games[game]
          ?.map((gameType) => (
            <NavLink
              to={`${game}/${gameType}/${weapon || ''}`}
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