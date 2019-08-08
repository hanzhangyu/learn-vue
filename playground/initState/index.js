const app = new Vue({
    data: {
        val: 1,
    },
    computed: {
        computedVal: {
            get() {
                return this.val + 1;
            },
            set(val) {
                return val - 1;
            },
        },
        computedValNoUse() {
            return this.val + 2;
        }
    },
    methods: {
        propFn() {
            console.log("propFn");
        },
    },
    components: {
        Child: {
            props: {
                propFunc: {
                    // 函数也是 reactive 的
                    type: Function,
                },
                propVal: true, // type 始终正确
                propBool: {
                    type: Boolean,
                },
            },
            template: "<span>{{propFunc}} {{propVal}} {{propBool}}</span>",
            created() {
                console.log((window.child = this));
            },
        },
    },
}).$mount("#app");
