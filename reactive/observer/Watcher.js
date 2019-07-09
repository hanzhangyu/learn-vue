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
            // TODO traverse all deep values，use getter to collect this reference to emit cb when changed deeply
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
