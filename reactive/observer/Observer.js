/**
 * @file https://github.com/vuejs/vue/blob/master/src/core/observer/index.js
 */
import Dep from "./Dep.js";
import { isObject, def, isValidArrayIndex } from "./util.js";
import { arrayMethods } from "./array.js";

const arraykeys = Object.getOwnPropertyNames(arrayMethods);

function defineReactive(data, key, val) {
    const childOb = observe(val);
    // 1. childOb.dep是值被改动时主动push
    // 2. dep 是 setter 主动推送
    // 本质上是一致的，只是方便在不同的地方可以有不同的策略触发
    const dep = new Dep(); // 与childOb.dep上的Watcher一致
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

export function observe(val) {
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
            // inject mutator for operator
            if ("__proto__" in {}) {
                val.__proto__ = arrayMethods;
            } else {
                arraykeys.forEach(key => {
                    val[key] = arrayMethods[key];
                });
            }
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

export function set(target, key, val) {
    // array
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key);
        target.splice(key, 1, val);
        return val;
    }
    // exit object property
    if (Object.prototype.hasOwnProperty.call(target, key)) {
        target[key] = val;
        return val;
    }
    // region new object property
    const ob = target.__ob__;
    if (ob._isVue) {
        console.warn('不要在root或者instance里面定义reactive属性');
        return val;
    }
    if (!ob) { // not reactive
        target[key] = val;
        return val;
    }
    defineReactive(target, key, val);
    ob.dep.notify();
    return val;
    // endregion
}

export function del(target, key) {
    // array
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.splice(key, 1);
        return;
    }
    // region 删除必须先检查是否为root
    const ob = target.__ob__;
    if (ob._isVue) {
        console.warn('不能删除root或者instance里面定义任何属性');
        return ;
    }
    // endregion
    // not exit object property
    if (!Object.prototype.hasOwnProperty.call(target, key)) {
        return;
    }
    delete target[key];
    ob.dep.notify();
}
