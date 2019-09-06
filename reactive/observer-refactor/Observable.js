/**
 * @typedef Watcher
 * @property {Function} update - callback.
 */

/**
 * Observable 类
 */
export default class {
    /**
     * collect watcher
     * @type {Array<Watcher>}
     */
    dep = [];

    constructor(data, cb) {
    }

    /**
     * 收集 watcher 至 dep
     * @param {Watcher} watcher
     */
    subsrible(watcher) {
        this.dep.push(watcher);
    }
}