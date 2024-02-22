import { useNavigate, useParams, useRouteLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import Attachment from "~/components/Attachment";
import { slots } from "~/lib/constants";

const getIsZombie = (build) => build.isMW3ZombieBestBuild

const sortWarzone = (a, b) => {
  if (a.type === 'wz2' && b.type === 'wz2') {
    return a.position - b.position
  } else if (a.type === 'wz2') {
    return -1
  }
  return 0
}

export default function Contact() {
  const navigate = useNavigate()
  const { weapon, type } = useParams()
  const { data, attachments } = useRouteLoaderData("root");
  const [isExpanded, setIsExpanded] = useState(true)

  const weaponInfo = data.weapons.find((item) => item.id === weapon)
  
  const sortMW3Multi = (a, b) => {
    if (!type.includes('mw3')) return 0
    if (a.type === 'mw3' && b.type === 'mw3') {
      return a.position - b.position
    } else if (a.type === 'mw3') {
      return -1
    }
  }
  const filterZombies = (build) =>
   (type !== 'mwz' && !build.isMW3ZombieBestBuild)
   || (type === 'mwz' && build.isMW3ZombieBestBuild)

  const filterMW3Ranked = (build) =>
    (type !== 'mw3Ranked' && !build.isMW3RankedBestBuild)
    || (type === 'mw3Ranked' && build.isMW3RankedBestBuild)

  const builds = attachments.builds
    .filter((build) => build.weaponId === weapon)
    .filter(filterZombies)
    .filter(filterMW3Ranked)

  useEffect(() => {
    if (builds.length === 0) {
      navigate(`/${type}`)
    }
  }, [builds])

  const tier = Object.keys(data.wzStatsTierList[type])
    .find(key => data.wzStatsTierList[type][key].includes(weapon))
  
  const onClose = () => {
    navigate(`/${type}`)
  }

  return (
    <div className="weapon">
      <div className="weapon__title info" onClick={() => setIsExpanded(!isExpanded)}>
        <img
          alt={weapon}
          src={`https://imagedelivery.net/BN5t48p9frV5wW3Jpe6Ujw/${weapon}-bold/gunDisplayLoadouts`}
        />
        <h3>{weaponInfo.name}</h3>
        <span>Tier {tier}</span>
        <span className="close" onClick={onClose}></span>
      </div>
      <div className="builds scrollbar">
        {builds
          .sort((a, b) => a.position - b.position)
          .sort(sortWarzone)
          .sort(sortMW3Multi)
          .sort((a, b) => type === 'mwz' && getIsZombie(a) ? -1 : 0)
          .map((build) => (
            <Build key={build.id} build={build} />
          ))}
      </div>
    </div>
  );
}


const Build = ({ build }) => {
  const isBest = Object.keys(build).some((key) => key.includes("Best") && build[key])
  const isZombie = getIsZombie(build)
  const isBestRanked = Object.keys(build).some((key) => key.includes("Ranked") && build[key])
  return (
    <div className="build">
      <div className="build__info">
        <h4>
          {build.playstyle.replace('_', ' ')}
          {isBest && !isBestRanked && !isZombie && "⭐"}
          {isZombie && "🧟"}
        </h4>
        {isBestRanked && <img src="/images/ranked.png" />}
        <img alt={build.type} src={`/images/${build.type}-logo.webp`} />
        {build.isAshikaBuild && <img src="/images/ashika.webp" />}
      </div>
      <AttachmentsGrid build={build} />
    </div>
  )
}

const AttachmentsGrid = ({ build }) => {
  return (
    <div className="weapon__grid">
      {slots.map((slot) => (
        <Attachment key={slot} attachment={build[slot]} slot={slot} />
      ))}
    </div>
  )
}
