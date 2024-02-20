import { NavLink, useLoaderData, useNavigate, useParams } from '@remix-run/react';
import React, { useEffect, useState } from 'react'
import { gameModes } from '~/lib/constants'

const NavBar = () => {
  const { type, weapon } = useParams()
  const navigate = useNavigate()
  const { data } = useLoaderData();

  useEffect(() => {
    if (!type) {
      navigate('ashikaIsland')
    }
  }, [type])
  
  return (
    <div className="tabs">
      {Object.entries(data.wzStatsTierList)
        .filter(([key, value]) => typeof value === "object" && !key.includes('2'))
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