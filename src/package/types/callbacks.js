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
 * @file Type declaration boutique callbacks.
 * @author James Reid
 */

// @ts-check

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { KeyedObject } from "./KeyedObject.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 * Listener generator callback.
 *
 * @callback listenerInitCb
 * @param {KeyedObject} state
 * @returns {listenerCb}
 */

/**
 * Listener callback.
 *
 * @callback listenerCb
 * @param {KeyedObject} detail
 * @returns {void}
 */

/**
 * Redaction generator callback.
 *
 * @callback redactionInitCb
 * @param {KeyedObject} state
 * @param {KeyedObject} detail
 * @returns {KeyedObject}
 */

/**
 * Redaction callback
 *
 * @callback redactionCb
 * @param {KeyedObject} [detail]
 * @returns {void}
 */

// @@exports
/**
 * @ignore
 * @type {listenerInitCb}
 */
export let listenerInitCb

/**
 * @ignore
 * @type {listenerCb}
 */
export let listenerCb

/**
 * @ignore
 * @type {redactionInitCb}
 */
export let redactionInitCb

/**
 * @ignore
 * @type {redactionCb}
 */
export let redactionCb
