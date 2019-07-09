import { Watcher } from "./Watcher";

/**
 * 收集依赖，用于通知依赖
 */
export interface Dep<T> {
    id: number;
    subs: Watcher<T>[];
    addSub(sub: Watcher<T>): void; // 储存依赖
    depend(): void; // 将this暴露出去，让依赖自行决定是否需要添加进来，用以添加依赖
    removeSub(sub: Watcher<T>): void; // 移除依赖
    notify(): void; // 通知所有依赖
}
