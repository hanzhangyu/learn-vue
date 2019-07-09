import { isObject } from "./util.js";

const bailRE = /[^\w.$]/;

function parsePath(path) {
    const segments = path.split(".");
    return function(obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return;
            obj = obj[segments[i]];
        }
        return obj;
    };
}

const seenObjects = new Set();

function traverse(value) {
    seenObjects.clear(); // 这样可以共用Set对象，减少创建与GC的开销
    _traverse(value);
}

function _traverse(value) {
    if (!isObject(value) || !Object.isExtensible(value)) {
        // preventExtensions can`t add __ob__
        return;
    }
    if (value.__ob__) {
        // getter之后同步的产生Observer
        const depId = value.__ob__.dep.id;
        if (seenObjects.has(depId)) return;
        seenObjects.add(depId);
    }
    let i;
    if (Array.isArray(value)) {
        i = value.length;
        while (i--) _traverse(value[i]);
    } else {
        Object.keys(value).forEach(key => _traverse(value[key]));
    }
}

export default class Watcher {
    constructor(vm, path, cb, options) {
        this.vm = vm;
        this.deps = [];
        this.depIds = [];
        this.getter = parsePath(path);
        this.cb = cb;

        if (options) {
            this.deep = !!options.deep;
        } else {
            this.deep = false;
        }

        this.value = this.get();
    }

    get() {
        window.target = this; // Vue中使用了 targetStack 来实现
        const value = this.getter(this.vm);
        if (this.deep) {
            // target alive
            // trigger deep getter recursive
            traverse(value);
        }
        window.target = undefined;
        return value;
    }

    addDep(dep) {
        if (this.depIds.includes(dep.id)) return;
        this.depIds.push(dep.id);
        this.deps.push(dep);
        dep.addSub(this);
    }

    teardown() {
        this.deps.forEach(dep => dep.removeSub(this));
    }

    update() {
        const oldVal = this.value;
        const val = this.get();
        this.cb.call(this, val, oldVal);
    }
}
