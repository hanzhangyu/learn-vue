const app = new Vue({
    el: "#app",
    data: {
        dynamicKey: "test",
        obj: {
            a: "A",
            b: "B",
        },
    },
    methods: {
        handleClick(e) {
            console.log(e);
        },
    },
});
