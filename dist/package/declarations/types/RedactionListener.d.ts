/**
 * Redaction listener type.
 */
export type RedactionListener = {
    func: (detail: any) => void;
    deps: string[];
};
/**
 * @file Redaction listener type declaration.
 * @author James Reid
 */
/**
 * Redaction listener type.
 *
 * @typedef {object} RedactionListener
 * @property {(detail:any) => void} func
 * @property {string[]} deps
 */
/**
 * @ignore
 * @type {RedactionListener}
 */
export let RedactionListener: RedactionListener;
