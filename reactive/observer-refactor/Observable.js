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
    _dep = [];
    /**
     * proxy for data
     * @type {Proxy}
     */
    _proxy = null;

    constructor(data) {
        this._proxy = this.walk(data);

        return this._proxy;
    }

    walk(data) {
        // console.log("data", data);
        if (!isObject(data)) {
            return data;
        }
        const keys = Object.keys(data);
        keys.forEach(key => {
            data[key] = new Observable(data[key]);
        });

        // console.log("this", this);

        return new Proxy(data, {
            set: (target, propKey, value, receiver) => {
                // console.log(
                //     "new Proxy",
                //     target,
                //     propKey,
                //     value,
                //     receiver,
                //     Reflect.get(target, propKey),
                //     target === this,
                // );
                const mayOldValue = Reflect.get(target, propKey);
                if (Array.isArray(target)) {
                    if (propKey !== "length") {
                        this._dep.forEach(watcher =>
                            watcher.update.call(
                                this._proxy,
                                value,
                                mayOldValue,
                            ),
                        );
                    }
                } else {
                    this._dep.forEach(watcher =>
                        watcher.update.call(
                            this._proxy,
                            value,
                            mayOldValue._proxy || mayOldValue, // primitive can not effect new opt
                        ),
                    );
                }
                return Reflect.set(target, propKey, value, receiver);
            },
            get: (target, propKey, value, receiver) => {
                return propKey === "_dep" ||
                    propKey === "_subsrible" ||
                    propKey === "_walkSub"
                    ? this[propKey]
                    : Reflect.get(target, propKey, receiver);
            },
        });
    }

    /**
     * 收集 watcher 至 dep
     * @param {Watcher} watcher
     */
    _subsrible(watcher) {
        this._walkSub(watcher);
    }

    _walkSub(watcher) {
        if (this._dep.find(item => watcher === item)) return;
        this._dep.push(watcher);
        Object.keys(this).forEach(key => {
            const target = this[key];
            if (!target._dep) return;
            target._walkSub(watcher);
        });
    }
}
