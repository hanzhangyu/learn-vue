/**
 * @typedef Watcher
 * @property {function(any, any)} update - callback.
 */

import { isObject } from "../observer/util.js";

/**
 * Observable 类
 */
export default class Observable {
    /**
     * collect watcher
     * @type {Array<Watcher>}
     */
    dep = [];
    /**
     * proxy for data
     * @type {Proxy}
     */
    proxy = null;

    constructor(data, cb) {
        this.proxy = this.walk(data);

        // 暴露 this.proxy
        return new Proxy(this, {
            get: (target, propKey, value, receiver) => {
                return (
                    Reflect.get(this.proxy, propKey, receiver) || this[propKey]
                );
            },
            set: (target, propKey, value, receiver) => {
                return Reflect.set(this.proxy, propKey, value, receiver);
            },
        });
    }

    walk(data) {
        console.log("data", data);
        if (!isObject(data)) {
            return;
        }
        const keys = Object.keys(data);
        keys.forEach(key => {
            data[key] = this.walk(data[key]); // fixme
        });

        return new Proxy(data, {
            set: (target, propKey, value, receiver) => {
                console.log(target, propKey, value, receiver);
                this.dep.forEach(watcher =>
                    watcher.update.call(
                        this,
                        value,
                        Reflect.get(target, propKey),
                    ),
                );
                return Reflect.set(target, propKey, value, receiver);
            },
        });
    }

    /**
     * 收集 watcher 至 dep
     * @param {Watcher} watcher
     */
    subsrible(watcher) {
        if (this.dep.find(item => watcher === item)) return;
        this.dep.push(watcher);
    }
}
