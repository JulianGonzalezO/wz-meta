import { NavLink, useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";

function _entries(object = {}) {
  return Object.entries(object)
}

const TierList = () => {
  const { type, weapon } = useParams()
  const navigate = useNavigate()
  const { data } = useLoaderData();

  useEffect(() => {
    if (type && !weapon) {
      const firstWeapon = data.wzStatsTierList[type].META[0]
      navigate(`${type}/${firstWeapon}`)
    }
  }, [weapon, type])

  const tier = data.wzStatsTierList[type]
  
  const [filter, setFilter] = useState('')
  
  return (
    <div className="tier__list">
      <input value={filter} placeholder="Search..." onChange={(e) => setFilter(e.target.value)} />
      {_entries(tier)
        .map(([key2, value2]) => (
          <div key={key2} className="tier">
            <h2>{key2}</h2>
            <nav className="weapons--side">
              {value2
                .filter(value3 => !filter || value3.includes(filter))
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
    >
      <div className="weapon__title">
        <img
          alt={weapon}
          src={`https://imagedelivery.net/BN5t48p9frV5wW3Jpe6Ujw/${weapon}-bold/gunDisplayLoadouts`}
        />
        <div>
          <h3>{weaponInfo.name}</h3>
          <h5>{weaponInfo.type}</h5>
        </div>
      </div>
    </NavLink>
  );
}
export default TierList