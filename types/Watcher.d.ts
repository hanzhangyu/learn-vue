import { Dep } from "./Dep";

interface Vm {}

export type parsePath<K, T> = (path: string) => (obj: K) => T; // 解析path，返回一个根据解析的path获取对应值的函数。

/**
 * 依赖，相应值的变化
 */
export interface Watcher<T> {
    vm: Vm; // 响应式的对象
    deep: boolean;
    deps: Dep<T>[]; // 在那些依赖收集器中
    depIds: Set<string>; // 依赖收集器的ID
    getter(vm: Vm): T; // 根据预定义的路劲，获取到vm的对应值，会触发依赖收集
    cb(val: T, oldVal: T): void; // 依赖的回调函数
    value: T; // 响应式的值
    get(): T; // 通过getter获取该值，并触发依赖收集，如果是deep则对所有的子属性触发一次defineReactive的getter操作
    addDep(dep: Dep<T>): void; // 添加this到依赖收集器
    teardown(): void; // 从所有的依赖收集器中移除本依赖
    update(): void; // 接受更新的handle
}
