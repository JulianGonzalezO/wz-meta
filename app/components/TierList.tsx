import { NavLink, useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import './TierList.css'
import { weaponTypes } from "~/lib/constants";

function _entries(object = {}) {
  return Object.entries(object)
}

function removeDuplicates(array: Array<string>) {
  return array.filter((value, index) => array.indexOf(value) === index)
}

const TierList = () => {
  const { type, weapon } = useParams()
  const navigate = useNavigate()
  const { data, attachments } = useLoaderData();

  useEffect(() => {
    if (type && !weapon) {
      const firstWeapon = data.wzStatsTierList[type].META[0]
      // navigate(`${type}/${firstWeapon}`)
    }
  }, [weapon, type])

  const tier = data.wzStatsTierList[type]
  
  const [filter, setFilter] = useState('')

  const filterMW3Ranked = (weapon) => {
    if (type !== 'mw3Ranked') return true
    const builds = attachments.builds.filter((build) => build.weaponId === weapon && build.isMW3RankedBestBuild);
    return builds.length > 0
  }
  
  return (
    <div className="side__list" data-active={!!weapon}>
      <input value={filter} placeholder="Search..." onChange={(e) => setFilter(e.target.value)} />
      <div className="tier__list scrollbar">
        {_entries(tier)
          .map(([key2, value2]) => (
            <div key={key2} className="tier">
              <h2>{key2}</h2>
              <nav className="weapons--side">
                {removeDuplicates(value2)
                  .filter(value3 => !filter || value3.includes(filter))
                  .filter(filterMW3Ranked)
                  .map((value3) => (
                    <WeaponShort
                      key={value3}
                      weapon={value3}
                    />
                ))}
              </nav>
            </div>
        ))}
      </div>
    </div>
  )
}


const WeaponShort = ({ weapon }) => {
  const { type, weapon: selectedWeapon } = useParams()
  const { data } = useLoaderData();
  const weaponInfo = data.weapons.find((item) => item.id === weapon)

  return (
    <NavLink
      to={`${type}/${weapon}`}
      className="weapon"
      data-selected={weapon === selectedWeapon}
      data-game={weaponInfo.game}
    >
      <div className="weapon__title">
        <img
          alt={weapon}
          src={`/images/${weapon}.png`}
        />
        <h3>{weaponInfo.name}</h3>
        <h5>{weaponTypes[weaponInfo.type] || weaponInfo.type}</h5>
        <img
          alt={weaponInfo.game}
          src={`/images/${weaponInfo.game}-logo.webp`}
        />
      </div>
    </NavLink>
  );
}

export default TierList