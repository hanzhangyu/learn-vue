Vue.component("todo-item1", {
    data() {
        return this.todo; // 在父组件中的Ob对象中统计被其他 vm 当做 root 使用的 个数
    },
    props: ["todo"],
    template: "<span>{{ todo.text }}</span>"
});

Vue.component("todo-item2", {
    data() {
        return this.todo;
    },
    props: ["todo"],
    template: "<span>{{ todo.text }}</span>"
});

Vue.mixin({
    mounted() {
        console.log('mixin mounted')
    }
})

var app = new Vue({
    // el: "#ddd",
    data: {
        todo: {
            text: "nothing"
        },
    },
    mounted() {
        this.todo.text = "get";
        console.log('app mounted')
    }
});
app.$mount('#app');

console.log(app._data.todo.__ob__.vmCount); // 2
console.log(app._data.todo === app.$children[0]._data); // true
console.log(app._data.todo === app.$children[1]._data); // true
app.$children[1].$destroy();
console.log(app._data.todo.__ob__.vmCount); // 1
