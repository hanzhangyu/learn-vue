<template>
    <div>
        {{state}}
        <span>count is {{ state.count }}</span>
        <span>plusOne is {{ state.double }}</span>
        <button @click="increment">count++</button>
        <p>x: {{ x }}, y: {{ y }}</p>
    </div>
</template>

<script>
import { reactive, computed } from "@vue/composition-api";
import useMousePosition from "./components/useMousePosition";

export default {
    setup() {
        Object.assign(window, {
            reactive,
            computed,
        });
        console.assert(this === undefined, "`this` is always be undefined");
        const { x, y } = useMousePosition();

        const state = reactive({
            count: 0,
            double: computed(() => state.count * 2),
        });

        function increment() {
            state.count++;
        }

        return {
            state,
            increment,
            x,
            y,
        };
    },
};
</script>
