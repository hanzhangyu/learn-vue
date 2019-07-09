import { Observer } from "./Observer";

interface obVal<T> {
    __ob__: Observer<T>
}

// 创建一层屏蔽属性，让Observer的array继承与此
export interface arrayMethod<T extends obVal<T>> {
    push(...items: T[]): number;
    pop(): T;
    shift(): T;
    unshift(...items: T[]): number;
    splice(start: number, deleteCount: number, ...items: T[]): T[];
    sort(compareFn?: (a: T, b: T) => number): this;
    reverse(): this;
    __proto__: Array<T>
}
