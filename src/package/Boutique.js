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
import { RedactionListener } from "./types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
class Boutique {
    /**
     *
     * @param {any} state
     */
    constructor(state) {
        /** @type {Object.<string,RedactionListener[]>} */
        this.events = {}
        this.state = state
    }

    /**
     *
     * @param {(state:any, detail:any) => any} callback
     * @returns {(detail:any) => void}
     */
    createRedaction(callback) {
        const { state, tracer } = this.proxy
        return detail => this.redact(tracer, callback(state, detail))
    }

    /**
     *
     * @param {*} callback
     * @returns {RedactionListener}
     */
    createRedactionListener(callback) {
        const { state, tracer } = this.proxy
        const func = (/** @type {any} */ detail) => callback(state)(detail)
        callback(state)
        return { func, deps: tracer.filter(elem => elem.trim) }
    }

    /**
     *
     * @param {RedactionListener} listener
     * @returns {void}
     */
    addRedactionListener(listener) {
        listener.deps.forEach(key => {
            this.events[key] = [...this.events[key] || [], listener]
        })
    }

    /**
     *
     * @param {RedactionListener} listener
     * @returns {void}
     */
    removeRedactionListener(listener) {
        listener.deps.forEach(/** @type {string} */ key => {
            this.events[key] = this.events[key].filter(obj => obj !== listener)
        })
    }

    /**
     *
     * @param {[string, any][]} tracer
     * @param {*} detail
     * @param {RedactionListener[]} listeners
     * @returns {void}
     */
    redact(tracer, detail, listeners = []) {
        if (!detail) { return }
        tracer.forEach(diff => {
            let prop = this.state
            diff[0].split(".").slice(1).reduce((acc, cur, index, arr) => {
                if (!cur) { return acc }
                index !== arr.length - 1 ? prop = prop[cur] || {}
                    : prop[cur] = diff[1]
                acc = `${acc}.${cur}`
                listeners.push(...this.events[acc] || [])
                return acc
            }, "")
        });
        [...new Set(listeners)].forEach(listener => listener.func(detail))
    }

    /**
     *
     * @param {any[]} tracer
     * @param {string} path
     * @returns {ProxyHandler<object>}
     */
    handler(tracer, path = "") {
        /**
         *
         * @param {any} target
         * @param {string} prop
         * @returns {any}
         */
        const get = (target, prop) => {
            const nestedPath = `${path}.${prop}`
            path !== "" ? tracer.splice(- 1, 1, nestedPath)
                : tracer.push(nestedPath)
            const value = target[prop]
            return typeof value !== "object" ? value
                : new Proxy(value, this.handler(tracer, nestedPath))
        }

        /**
         *
         * @param {any} _
         * @param {string} prop
         * @param {any} value
         * @returns {boolean}
         */
        const set = (_, prop, value) => {
            return !!tracer.push([`${path}.${prop}`, value])
        }

        return { get, set }
    }

    /**
     * @returns {{state:object, tracer:any[]}}
     */
    get proxy() {
        /** @type {any[]} */
        const tracer = []
        return { state: new Proxy(this.state, this.handler(tracer)), tracer }
    }
}

// @@exports
export { Boutique }
