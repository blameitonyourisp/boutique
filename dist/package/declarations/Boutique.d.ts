export class Boutique {
    /**
     *
     * @param {KeyedObject} state
     */
    constructor(state: KeyedObject);
    /** @type {Object.<string,RedactionListener[]>} */
    evs: {
        [x: string]: RedactionListener[];
    };
    state: {
        [x: string]: any;
    };
    /**
     *
     * @param {redactionInitCb} callback
     * @returns {redactionCb}
     */
    createRedaction(callback: redactionInitCb): redactionCb;
    /**
     *
     * @param {listenerInitCb} callback
     * @returns {RedactionListener}
     */
    createListener(callback: listenerInitCb): RedactionListener;
    /**
     *
     * @param {RedactionListener} listener
     * @returns {void}
     */
    addListener(listener: RedactionListener): void;
    /**
     *
     * @param {RedactionListener} listener
     * @returns {void}
     */
    removeListener(listener: RedactionListener): void;
    /**
     *
     * @param {ProxyTrace[]} tracer
     * @param {KeyedObject|void} detail
     * @param {RedactionListener[]} listeners
     * @returns {void}
     */
    redact(tracer: ProxyTrace[], detail: KeyedObject | void, listeners?: RedactionListener[]): void;
    /**
     *
     * @param {ProxyTrace[]} tracer
     * @param {string} path
     * @returns {ProxyHandler.<KeyedObject>}
     */
    handler(tracer: ProxyTrace[], path?: string): ProxyHandler<KeyedObject>;
    /**
     * @returns {{state:KeyedObject, tracer:ProxyTrace[]}}
     */
    get proxy(): {
        state: KeyedObject;
        tracer: ProxyTrace[];
    };
}
import { RedactionListener } from "./types/index.js";
import { redactionInitCb } from "./types/index.js";
import { redactionCb } from "./types/index.js";
import { listenerInitCb } from "./types/index.js";
import { ProxyTrace } from "./types/index.js";
import { KeyedObject } from "./types/index.js";
