import { NavLink, useLoaderData, useNavigate, useParams } from '@remix-run/react';
import { useEffect } from 'react'
import { gameModes, gameModesOrder } from '~/lib/constants'
import './NavBar.css'

const NavBar = () => {
  const { type, weapon } = useParams()
  const navigate = useNavigate()
  const { data } = useLoaderData()

  useEffect(() => {
    if (!type) {
      navigate('ashikaIsland')
    }
  }, [type])
  
  return (
    <div className="tabs">
      {Object.entries(data.wzStatsTierList)
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
        ))}
    </div>
  )
}

export default NavBar