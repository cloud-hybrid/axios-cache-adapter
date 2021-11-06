// ECMA Script Polyfills:
import "core-js/stable";

// Needed for the generator functions which are transpiled from your async await keywords
import "regenerator-runtime/runtime";

import { setup, setupCache, serializeQuery } from './api'
import RedisStore from './redis'
import RedisDefaultStore from './redis-default'

export { setup, setupCache, serializeQuery, RedisStore, RedisDefaultStore }
export default { setup, setupCache, serializeQuery, RedisStore, RedisDefaultStore }
