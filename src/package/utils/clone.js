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
    /** @type {KeyedObject} */
    const obj = {}
    for (const key in proxy) {
        typeof proxy[key] === "object" ? obj[key] = proxyToObject(proxy[key])
            : obj[key] = proxy[key]
    }
    return obj
}

// @@exports
export { proxyToObject }
