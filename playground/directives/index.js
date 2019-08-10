const app = new Vue({
    el: "#app",
    data: {
        dynamic: "test",
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
