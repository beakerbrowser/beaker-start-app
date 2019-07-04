const NICE_PHRASES = [
  `Hope you're having a great day!`,
  `Hey, you're great.`,
  `By the way, you're the best!`
]

export function getNicePhrase () {
  return NICE_PHRASES[(Math.random() * NICE_PHRASES.length)|0]
}