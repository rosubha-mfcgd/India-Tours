"use strict";
// cacheMap.js
const cityCache = new Map([]);
const stateCache = new Map([]);
const countryCache = new Map([]);
const tourOperatorCache = new Map([]);
// Export the single instance for use everywhere
module.exports = { cityCache, stateCache, countryCache, tourOperatorCache };
