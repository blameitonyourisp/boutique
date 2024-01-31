export type RedactionListener = {
    func: (detail: any) => void;
    deps: string[];
};
/**
 * @file State store and manager class.
 * @author James Reid
 */
/**
 * @todo Move types to separate typedef files.
 * @todo Prevent multiple details being passed to redaction.
 */
/**
 * @typedef {object} RedactionListener
 * @property {(detail:any) => void} func
 * @property {string[]} deps
 */
export class Boutique {
    /**
     *
     * @param {any} state
     */
    constructor(state: any);
    /** @type {Object.<string,RedactionListener[]>} */
    events: {
        [x: string]: RedactionListener[];
    };
    state: any;
    /**
     *
     * @param {(state:any, detail:any) => any} callback
     * @returns {(detail:any) => void}
     */
    createRedaction(callback: (state: any, detail: any) => any): (detail: any) => void;
    /**
     *
     * @param {*} callback
     * @returns {RedactionListener}
     */
    createRedactionListener(callback: any): RedactionListener;
    /**
     *
     * @param {RedactionListener} listener
     * @returns {void}
     */
    addRedactionListener(listener: RedactionListener): void;
    /**
     *
     * @param {RedactionListener} listener
     * @returns {void}
     */
    removeRedactionListener(listener: RedactionListener): void;
    /**
     *
     * @param {[string, any][]} tracer
     * @param {*} detail
     * @param {RedactionListener[]} listeners
     * @returns {void}
     */
    redact(tracer: [string, any][], detail: any, listeners?: RedactionListener[]): void;
    /**
     *
     * @param {any[]} tracer
     * @param {string} path
     * @returns {ProxyHandler<object>}
     */
    handler(tracer: any[], path?: string): ProxyHandler<object>;
    /**
     * @returns {{state:object, tracer:any[]}}
     */
    get proxy(): {
        state: object;
        tracer: any[];
    };
}
