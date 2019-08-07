const s = Symbol();

// 子组件注入
const Child = {
    inject: {
        simple: "simpleP",
        foo: {
            from: "fooP", // 从一个不同名字的属性注入，则使用 from 来表示其源属性
            default: () => [1, 2, 3],
        },
        s, // 绑定在子组件 inject 内的不能使用 Symbol，Vue 不支持
        reactive: "reactive", // 响应式 ob
        notReactive: "notReactive", // 非响应式
        inheritVal: { // 继承属性
            from: "inheritVal",
            default: "not found",
        },
    },
    template:
        "<span>{{foo}} {{simple}} {{s}} {{reactive}} {{notReactive}}</span>",
    created() {
        console.log(this.foo); // bar
        console.log(this.simple); // Simple Provide
        console.log(this.s); // Symbol Provide
        console.log(this.reactive); // {__ob__: Observer}
        console.log(this.inheritVal); // not found
    },
    // ...
};

// 父级组件提供
const Provider = {
    provide() {
        return {
            simpleP: "Simple Provide",
            fooP: "bar",
            [s]: "Symbol Provide",
            reactive: this.reactive,
            notReactive: {
                val: "not reactive initial value",
            },
            __proto__: {
                inheritVal: 1,
            },
        };
    },
    data: {
        reactive: {
            val: 1,
        },
    },
    // ...
    components: {
        Child,
    },
};

const app = new Vue(Provider).$mount("#app");
setTimeout(() => {
    app.reactive.val = 2;
    Vue.nextTick(() => {
        app.$children[0].notReactive.val = "not reactive changed, no effect";
    });
}, 1000);
