import { Dep } from "./Dep";

export function defineReactive<K, T> (data: K, key: string, val: T): void; // 通过get/set将data中的key变为响应式，如果val是Array/Object 则进行deep的创建Observer

export function observe<T>(val: T): Observer<T>; // 为val创建一个Observer实例

/**
 * 将一个对象变为响应式，让该对象变的只要获取了就等于绑定了依赖
 */
export interface Observer<T> {
    value: T;
    dep: Dep<T>; // 挂载在该对象的ob上的依赖，主要用来收集数组非value的变动
    observeArray(ary: T): void; // 通过observe，为每个数组元素deep创建Observer
    walk(obj: T): void; // 通过defineReactive，为每个对象属性deep创建Observer
}
export function set<T>(target: Array<T> | Object, key: string | number, value: T): T; // 为val创建一个Observer实例

export function del<T>(target: Array<T> | Object, key: string | number): void