<template>
    <div>
        <span>count is {{ state.count }}</span>
        <span>plusOne is {{ state.double }}</span>
        <button @click="increment">count++</button>
    </div>
</template>

<script>
import { reactive, computed } from "@vue/composition-api";

export default {
    setup() {
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
        };
    },
};
</script>
