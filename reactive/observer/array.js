import { def } from "./util.js";

const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(
    function(method) {
        const originMethod = arrayProto[method];
        def(arrayMethods, method, function mutator(...args) {
            const result = originMethod.apply(this, args);
            const ob = this.__ob__;
            let inserted; // 插入的需要设置为响应式的元素数组
            switch (method) {
                case 'push':
                case 'unshift':
                    inserted = args;
                    break;
                case 'splice':
                    inserted = args.slice(2);
                    break;
            }
            if (inserted) ob.observeArray(inserted);
            ob.dep.notify();
            return result;
        });
    }
);
