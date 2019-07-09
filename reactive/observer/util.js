export function isObject(val) {
    return val !== null && typeof val === "object";
}

export function def(obj, key, val, enumerable) {
    return Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        configurable: true,
        writable: true,
    })
}