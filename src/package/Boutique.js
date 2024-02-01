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
 * @file State store and manager class.
 * @author James Reid
 */

// @ts-check

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import {
    listenerInitCb,
    redactionInitCb,
    redactionCb,
    KeyedObject,
    ProxyTrace,
    RedactionListener
} from "./types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
class Boutique {
    /**
     *
     * @param {KeyedObject} state
     */
    constructor(state) {
        /** @type {Object.<string,RedactionListener[]>} */
        this.evs = {}
        this.state = state
    }

    /**
     *
     * @param {redactionInitCb} callback
     * @returns {redactionCb}
     */
    createRedaction(callback) {
        const { state, tracer } = this.proxy
        return detail => this.redact(tracer, callback(state, detail))
    }

    /**
     *
     * @param {listenerInitCb} callback
     * @returns {RedactionListener}
     */
    createListener(callback) {
        const { state, tracer } = this.proxy
        const func = (/** @type {KeyedObject|void} */ detail) => {
            return callback(state)(detail)
        }
        callback(state)
        return { func, deps: tracer.map(trace => trace.key) }
    }

    /**
     *
     * @param {RedactionListener} listener
     * @returns {void}
     */
    addListener(listener) {
        listener.deps.forEach(key => {
            this.evs[key] = [...this.evs[key] || [], listener]
        })
    }

    /**
     *
     * @param {RedactionListener} listener
     * @returns {void}
     */
    removeListener(listener) {
        listener.deps.forEach(/** @type {string} */ key => {
            this.evs[key] = this.evs[key].filter(obj => obj !== listener)
        })
    }

    /**
     *
     * @param {ProxyTrace[]} tracer
     * @param {KeyedObject|void} detail
     * @param {RedactionListener[]} listeners
     * @returns {void}
     */
    redact(tracer, detail, listeners = []) {
        tracer.forEach(diff => {
            if (diff.value) {
                let prop = this.state
                diff.key.split(".").slice(1).reduce((acc, cur, index, arr) => {
                    index !== arr.length - 1 ? prop = prop[cur] || {}
                        : prop[cur] = diff.value
                    acc = `${acc}.${cur}`
                    listeners.push(...this.evs[acc] || [])
                    return acc
                }, "")
            }
        });
        [...new Set(listeners)].forEach(listener => listener.func(detail))
    }

    /**
     *
     * @param {ProxyTrace[]} tracer
     * @param {string} path
     * @returns {ProxyHandler<KeyedObject>}
     */
    handler(tracer, path = "") {
        /**
         *
         * @param {KeyedObject} target
         * @param {string} prop
         * @returns {KeyedObject|ProxyHandler<KeyedObject>}
         */
        const get = (target, prop) => {
            const key = `${path}.${prop}`
            path && key.includes(tracer[0].key)
                ? tracer.splice(0, 1, { key })
                : tracer.unshift({ key })
            const value = target[prop]
            return typeof value !== "object" ? value
                : new Proxy(value, this.handler(tracer, key))
        }

        /**
         *
         * @param {any} _
         * @param {string} prop
         * @param {any} value
         * @returns {boolean}
         */
        const set = (_, prop, value) => {
            return !!tracer.push({ key: `${path}.${prop}`, value })
        }

        return { get, set }
    }

    /**
     * @returns {{state:KeyedObject, tracer:ProxyTrace[]}}
     */
    get proxy() {
        /** @type {ProxyTrace[]} */
        const tracer = []
        return { state: new Proxy(this.state, this.handler(tracer)), tracer }
    }
}

// @@exports
export { Boutique }
