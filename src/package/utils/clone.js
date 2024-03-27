// Copyright (c) 2024 James Reid. All rights reserved.
//
// This source code file is licensed under the terms of the MIT license, a copy
// of which may be found in the LICENSE.md file in the root of this repository.
//
// For a template copy of the license see one of the following 3rd party sites:
//      - <https://opensource.org/licenses/MIT>
//      - <https://choosealicense.com/licenses/mit>
//      - <https://spdx.org/licenses/MIT>

/**
 * @file Deep copy for converting proxies to objects.
 * @author James Reid
 */

// @ts-check

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { KeyedObject } from "../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {KeyedObject} proxy
 * @returns {KeyedObject}
 */
const proxyToObject = proxy => {
    // Return call to array function if passed proxy is an array proxy.
    if (proxy instanceof Array) { return proxyToArray(proxy) }

    // Reconstruct original object from nested proxy.
    const object = /** @type {KeyedObject} */ ({})
    for (const key in proxy) {
        typeof proxy[key] === "object" ? object[key] = proxyToObject(proxy[key])
            : object[key] = proxy[key]
    }

    return object
}

/**
 *
 * @param {any[]} proxy
 * @returns {any[]}
 */
const proxyToArray = proxy => {
    // Reconstruct original object from nested proxy.
    const array = /** @type {any[]} */ ([])
    proxy.forEach(entry => {
        typeof entry === "object" ? array.push(proxyToObject(entry))
            : array.push(entry)
    })

    return array
}

// @@exports
export { proxyToObject }
