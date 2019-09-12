const app = new Vue({
    data() {
        // Property or method "notReactiveVal" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property.
        // 仔细看这个错误，错误是第一句，第二句是推荐
        this.notReactiveVal = 1;
        return {
            val: 1,
            undef: undefined,
        };
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
        },
    },
    methods: {
        propFn() {
            console.log("propFn");
        },
    },
    mounted() {
        setTimeout(() => {
            this.undef = 2;
        }, 2000);
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
            get template() {
                function trackFn() {
                    console.log("get child template");
                }
                trackFn(); // for performance tracking
                return "<span>{{propFunc}} {{propVal}} {{propBool}}</span>";
            },
            created() {
                console.log((window.child = this));
            },
        },
    },
}).$mount("#app");
