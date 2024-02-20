import { useParams, useRouteLoaderData } from "@remix-run/react";
import { useState } from "react";
import { slots } from "~/lib/constants";

const getIsZombie = (build) => Object.keys(build).some((key) => key.includes("Zombie"))

export default function Contact() {
  const { weapon, type } = useParams()
  const { data, attachments } = useRouteLoaderData("root");
  const [isExpanded, setIsExpanded] = useState(true)
  const builds = attachments.builds.filter((build) => build.weaponId === weapon);
  const weaponInfo = data.weapons.find((item) => item.id === weapon)
  
  return (
    <div className="weapon">
      <div className="weapon__title" onClick={() => setIsExpanded(!isExpanded)}>
        <img
          alt={weapon}
          src={`https://imagedelivery.net/BN5t48p9frV5wW3Jpe6Ujw/${weapon}-bold/gunDisplayLoadouts`}
        />
        <h3>{weaponInfo.name}</h3>
      </div>
      <div className="builds">
        {builds
          .sort((a, b) => a.position - b.position)
          .sort((a, b) => type === 'mwz' && getIsZombie(a) ? -1 : 0)
          .map((build) => (
            <Build key={build.id} build={build} weaponInfo={weaponInfo} />
          ))}
      </div>
    </div>
  );
}


const Build = ({ build }) => {
  const isBest = Object.keys(build).some((key) => key.includes("Best"))
  const isZombie = getIsZombie(build)

  return (
    <div className="build">
      <div className="build__info">
        <h4>{build.playstyle} {isBest && !isZombie && "*"}{isZombie && "🧟"}</h4>
        <img alt={build.type} src={`https://wzstats.gg/assets/img/${build.type}-logo.webp`} />
      </div>
      {/* <WeaponGrid2 build={build} /> */}
      <WeaponGrid3 build={build} />
      {/* <div className="attachments">
        {attachments
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([key, value]) => (
          <div key={key} className="attachment">
            <h5>{key}</h5>
            <span>{value.name}</span>
          </div>
        ))}
      </div> */}
    </div>
  )
}


const WeaponGrid3 = ({ build }) => {
  return (
    <div className="weapon__grid">
      {slots.map((slot) => (
        <div
          key={slot}
          style={{ gridArea: slot }}
          className="attachment"
          data-empty={!build[slot]}
        >
          <h5>{slot}</h5>
          <span>{build[slot]?.name?.toUpperCase()}</span>
        </div>
      ))}
    </div>
  )
}
