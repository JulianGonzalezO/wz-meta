export const fetchApi = async (url: string) => {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

const paramsMap = {
  "streamerProfileId": "wzstats",
  "weaponGames": ["mw3", "mw2", "bo6"],
  weaponAttributes: [
    "game",
    "name",
    "type",
    "isNew",
    "recoil",
    "adsTime",
    "updateMW2",
    "updateWZ2",
    "averageTTKLong",
    "averageTTKShort",
    "bulletVelocity",
    "movementSpeed",
    "adsMovementSpeed",
    "unlockCondition",
    "description",
    "shortDescription",
  ]
}

export function buildParams() {
  const params = new URLSearchParams()

  Object.entries(paramsMap).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(value => params.append(key, value.toString()))
    } else {
      params.append(key, value.toString())
    }
  });
  return params.toString()
}