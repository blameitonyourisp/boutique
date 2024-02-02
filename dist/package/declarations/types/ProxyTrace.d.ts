/**
 * Proxy trace with required string key for getter handler, and optional any
 * type value for setter handler.
 */
export type ProxyTrace = {
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
export let ProxyTrace: ProxyTrace;
