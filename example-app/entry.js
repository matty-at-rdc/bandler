import { determineCoolness } from './m1.js'

import { IS_READY_FOR_PROD } from './m3.js'
if (IS_READY_FOR_PROD) {
    "Let's go to prod then!"
}

const main = () => {
  return determineCoolness()
}

const result = main()
console.log(`The result of determine coolness was: ${result}`)
