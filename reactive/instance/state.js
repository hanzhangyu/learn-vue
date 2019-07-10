import Watcher from "../observer/Watcher.js";
import { set, del } from "../observer/Observer.js";

export function stateMixin(Vue) {
    Vue.prototype.$delete = del;
    Vue.prototype.$set = set;
    Vue.prototype.$watch = function(expOrFn, cb, options = {}) {
        const vm = this;
        const watcher = new Watcher(vm, expOrFn, cb, options);
        if (options.immediate) {
            cb.call(this, watcher.value);
        }
        return function unwatchFn() {
            watcher.teardown();
        };
    };
}
