/**
 * Redaction listener type.
 */
export type RedactionListener = {
    func: listenerCb;
    deps: string[];
};
/**
 * Redaction listener type.
 *
 * @typedef {object} RedactionListener
 * @property {listenerCb} func
 * @property {string[]} deps
 */
/**
 * @ignore
 * @type {RedactionListener}
 */
export let RedactionListener: RedactionListener;
import { listenerCb } from "./callbacks.js";
