
export const gameModes: { [K in string]: string } = {
  ashikaIsland: "Resurgence",
  rankedResurgence: "Ranked Resurgence",
  alMazrah: "Battle Royale",
  mw2Ranked: "MW2 Ranked",
  wz2Ranked: "WZ2 Ranked",
  mw3: "MW3",
  mw3Ranked: "MW3 Ranked",
  mwz: "Zombies",
}

export const gameModesOrder: { [K in string]: number } = {
  ashikaIsland: 1,
  rankedResurgence: 2,
  alMazrah: 3,
  mw3: 4,
  mw3Ranked: 5,
  mwz: 6,
}

export const slots = [
  'muzzle',
  'barrel',
  'laser',
  'optic',
  'stock',
  'comb',
  'underbarrel',
  'ammunition',
  'magazine',
  'rearGrip',
  'aftermarketParts',
]