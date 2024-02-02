/**
 * Keyed object with unknown string keys.
 */
type KeyedObject = {
    [x: string]: any;
};
/**
 * @file Type declaration for generic keyed object.
 * @author James Reid
 */
/**
 * Keyed object with unknown string keys.
 *
 * @typedef {Object.<string,any>} KeyedObject
 */
/**
 * @ignore
 * @type {KeyedObject}
 */
declare let KeyedObject: KeyedObject;

/**
 * Listener generator callback.
 */
type listenerInitCb = (state: KeyedObject, detail?: void | {
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
declare let listenerInitCb: listenerInitCb;
/**
 * Listener callback.
 */
type listenerCb = (detail: KeyedObject | void) => void;
/**
 * @ignore
 * @type {listenerCb}
 */
declare let listenerCb: listenerCb;
/**
 * Redaction generator callback.
 */
type redactionInitCb = (state: KeyedObject, detail?: {
    [x: string]: any;
} | undefined) => KeyedObject | void;
/**
 * @ignore
 * @type {redactionInitCb}
 */
declare let redactionInitCb: redactionInitCb;
/**
 * Redaction callback
 */
type redactionCb = (detail?: {
    [x: string]: any;
} | undefined) => void;
/**
 * @ignore
 * @type {redactionCb}
 */
declare let redactionCb: redactionCb;

/**
 * Proxy trace with required string key for getter handler, and optional any
 * type value for setter handler.
 */
type ProxyTrace = {
    key: string;
    value?: any;
};
/**
 * @file Type declaration for proxy trace objects.
 * @author James Reid
 */
/**
 * Proxy trace with required string key for getter handler, and optional any
 * type value for setter handler.
 *
 * @typedef {object} ProxyTrace
 * @property {string} key
 * @property {any} [value]
 */
/**
 * @ignore
 * @type {ProxyTrace}
 */
declare let ProxyTrace: ProxyTrace;

/**
 * Redaction listener type.
 */
type RedactionListener = {
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
declare let RedactionListener: RedactionListener;

declare class Boutique {
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

/**
 *
 * @param {KeyedObject} proxy
 * @returns {KeyedObject}
 */
declare function proxyToObject(proxy: KeyedObject): KeyedObject;

export { Boutique, proxyToObject };
