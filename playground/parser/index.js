Vue.component("normal", {
    template: "<span>normal<"
});
Vue.component("_underline", {
    template: "<span>_underline</span>"
});
Vue.component("colon:colon", {
    template: "<span>_underline</span>"
});
Vue.component("custom-render", {
    render: function (createElement) {
        // 不太一样啦
        // assertCodegen(
        //     '<div><div is="component1"></div></div>',
        //     `with(this){return _c('div',[_c("component1",{tag:"div"})],1)}`
        // )
        return createElement('div', {
            tag: 'p', // 这里被忽略了
            attrs: {
                id: 'foo'
            },
        }, this.$slots.default)
    }
});

var app = new Vue({
    el: "#app",
    data: {
        message: "hello",
    },
    mounted() {
    }
});
