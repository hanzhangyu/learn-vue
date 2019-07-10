import Vue from "../index.js";

const vm = new Vue({
    data: {
        normal: 1,
        deepWrap: {
            deep: 2
        },
        array: []
    }
});
console.log((window.vm = vm));

const cb = tag => (val, oldVal) => {
    console.log(`[${tag}] received changes `, oldVal, " to ", val);
    document.getElementById("view").innerText = JSON.stringify(
        vm.data,
        undefined,
        2
    );
};
let unwatchNormal, unwatchDeep, unwatchArray;
const handlers = {
    watch() {
        unwatchNormal = vm.$watch("data.normal", cb("normal"), {
            immediate: true
        });
        unwatchDeep = vm.$watch("data.deepWrap.deep", cb("deep"), { deep: true });
        unwatchArray = vm.$watch("data.array", cb("array"));
    },
    unwatch() {
        unwatchNormal();
        unwatchDeep();
        unwatchArray();
    },
    normal() {
        vm.data.normal = Math.random();
    },
    deep() {
        vm.data.deepWrap.deep = Math.random();
    },
    push() {
        vm.data.array.push(1);
    },
    set() {
        vm.$set(vm.data.array, 0, Math.random());
    },
    del() {
        vm.$delete(vm.data.array, 0);
    }
};

document.body.onclick = function(event) {
    handlers[event.target.id] && handlers[event.target.id](event);
};
