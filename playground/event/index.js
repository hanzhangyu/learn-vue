const Foo = {
    name: "Foo",
    template: "<div>foo</div>",
    created() {
        this.$emit("hello", 123); // 这时候子组件还不存在与DOM，但是我们还是可以使用事件
        this.$emit("hello", 456); // 组件监听的 once 修饰符
    },
};

const app = new Vue({
    el: "#app",
    data: {
        ok: true, // 使用 v-if 能够移除旧的 once
    },
    methods: {
        print($event) {
            console.log($event);
        },
        handleBreakOnce($event) {
            console.log($event);
            return null; // 返回 null once 失效，这 condition 为 内部方法，请不要返回 null
        },
        handleOnce($event) {
            console.log($event);
        },
        handleFather($event) {
            console.log("father", $event);
        },
        foo($event) {
            console.log($event);
        },
    },
    components: {
        Foo,
    },
});
