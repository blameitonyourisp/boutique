/**
 * Listener generator callback.
 */
export type listenerInitCb = (state: KeyedObject, detail?: void | {
    [x: string]: any;
} | undefined) => listenerCb;
/**
 * Listener generator callback.
 *
 * @callback listenerInitCb
 * @param {KeyedObject} state
 * @param {KeyedObject|void} [detail]
 * @returns {listenerCb}
 */
/**
 * Listener callback.
 *
 * @callback listenerCb
 * @param {KeyedObject|void} detail
 * @returns {void}
 */
/**
 * Redaction generator callback.
 *
 * @callback redactionInitCb
 * @param {KeyedObject} state
 * @param {KeyedObject} [detail]
 * @returns {KeyedObject|void}
 */
/**
 * Redaction callback
 *
 * @callback redactionCb
 * @param {KeyedObject} [detail]
 * @returns {void}
 */
/**
 * @ignore
 * @type {listenerInitCb}
 */
export let listenerInitCb: listenerInitCb;
/**
 * Listener callback.
 */
export type listenerCb = (detail: KeyedObject | void) => void;
/**
 * @ignore
 * @type {listenerCb}
 */
export let listenerCb: listenerCb;
/**
 * Redaction generator callback.
 */
export type redactionInitCb = (state: KeyedObject, detail?: {
    [x: string]: any;
} | undefined) => KeyedObject | void;
/**
 * @ignore
 * @type {redactionInitCb}
 */
export let redactionInitCb: redactionInitCb;
/**
 * Redaction callback
 */
export type redactionCb = (detail?: {
    [x: string]: any;
} | undefined) => void;
/**
 * @ignore
 * @type {redactionCb}
 */
export let redactionCb: redactionCb;
import { KeyedObject } from "./KeyedObject.js";
