export interface Vue {
    _isVue: true;
    data: Object;
    $watch(
        expOrFn: Function | string,
        cb: Function,
        options?: Object
    ): Function;
    $set<T>(target: Array<T> | Object, key: string | number, value: T): T;
    $delete<T>(target: Array<T> | Object, key: string | number): void;
}
