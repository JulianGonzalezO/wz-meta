import { NavLink, useLoaderData, useParams } from "@remix-run/react";
import { weaponTypes } from "~/lib/constants";

const WeaponShort = ({ weapon }) => {
  const { game, type, weapon: selectedWeapon } = useParams()
  const { data } = useLoaderData();
  
  const weaponInfo = data.weapons.find((item) => item.id === weapon) || {}
  
  return (
    <NavLink
      to={`${game}/${type}/${weapon}`}
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

export default WeaponShort