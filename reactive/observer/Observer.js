/**
 * @file https://github.com/vuejs/vue/blob/master/src/core/observer/index.js
 */
import Dep from "./Dep.js";
import { isObject, def } from "./util.js";

function defineReactive(data, key, val) {
    const childOb = observe(val);
    const dep = new Dep();
    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
            dep.depend(); // 将获取该属性的值的依赖添加进dep
            if (childOb) {
                childOb.dep.depend(); // 将使用数组operator行为也添加进dep
            }
            return val;
        },
        set(newVal) {
            if (val === newVal) return;
            val = newVal;
            dep.notify();
        }
    });
}

function observe(val) {
    if (!isObject(val)) return;
    if (val["__ob__"]) {
        return val["__ob__"];
    }
    return new Observer(val);
}

export default class Observer {
    constructor(val) {
        this.value = val;
        this.dep = new Dep();
        def(val, "__ob__", this);

        if (Array.isArray(val)) {
            // TODO listen operator of array
            this.observeArray(val);
        } else {
            this.walk(val);
        }
    }

    observeArray(ary) {
        ary.forEach(item => observe(item));
    }
    walk(obj) {
        const keys = Object.keys(obj);
        keys.forEach(key => defineReactive(obj, key, obj[key]));
    }
}
