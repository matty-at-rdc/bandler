import { add } from './m2.js'

import { IS_READY_FOR_PROD } from './m3.js'
if (IS_READY_FOR_PROD) {
    "Let's go to prod then!"
}

export const determineCoolness = () => add(4, 5)

// Circular
// export const magicNumber = () => 1
