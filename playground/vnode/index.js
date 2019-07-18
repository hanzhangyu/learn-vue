Vue.component("todo-item", {
    props: ["todo"],
    template: "<span>{{ todo.text }}</span>"
});

Vue.component("func-item", {
    functional: true,
    render: function(createElement, context) {
        console.log(context.scopedSlots.default(), context.slots().default);
        return createElement("button", context.data, context.children);
    }
});

var app = new Vue({
    el: "#app",
    data: {
        message: "hello",
        groceryList: [
            { id: 0, text: "蔬菜" },
            { id: 1, text: "奶酪" },
            { id: 2, text: "随便其它什么人吃的东西" }
        ]
    },
    mounted() {
        const len = this._vnode.children.length;
        const child = this._vnode.children;
        // region context
        // vnode.contenxt === this
        console.log(
            "this._vnode.context===this: ",
            this._vnode.context === this
        ); // true
        // functional vnode 的 fnContent === this
        console.log(
            "functional button: ",
            child[len - 5],
            child[len - 5].fnContext === this
        ); // true
        // endregion
        // region v-for会实例化出新的VueCompenent
        console.log(
            "child[len-1].componentInstance === child[len-2].componentInstance: ",
            child[len - 1].componentInstance ===
                child[len - 2].componentInstance
        ); // false
        // endregion
        // region 组件状态任何的更新，都会导致子该组件产生vnode全部为新的，然后子组件根据子组件状态是否生成新的vnode。（而vnode的改变与否是判断属性的）
        // https://github.com/vuejs/vue/blob/master/src/core/vdom/patch.js#L34-L49
        const oldVnodesChild = child.slice(); // 浅复制保持元素不变
        // region 修改，注释修改，结果将会都为true
        this.message = "hello again";
        this.$set(this.groceryList, 2, { id: 22, text: "不能吃的哟" });
        // endregion
        this.$nextTick(() => {
            const len = this._vnode.children.length;
            const child = this._vnode.children;
            for (let i = 0; i < len; i++) {
                const oldVnode = oldVnodesChild[i];
                const newVnode = child[i];
                console.log(oldVnode === newVnode, oldVnode, newVnode);
            }
            console.log("v-for组件奶酪，child.vnode为新实例", oldVnodesChild[len - 2].child._vnode === child[len - 2].child._vnode);
        });
        // endregion（）

        console.log(child);
    }
});
