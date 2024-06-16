<template>
    <button :class="[
        'flex items-center justify-center rounded-3xl custom-btn-padding text-white bg-btn-red-normal  hover:bg-btn-red-pressed transition  text-center',
        buttonWidth,
        { 'bg-gray-300 hover:bg-gray-500': !active, 'bg-btn-red-normal': active }
    ]">
        <slot name="icon"></slot>
        <span class="ml-2">{{ name }}</span>
    </button>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';

interface Props {
    name: string;
    icon?: string;
    fullWidth?: boolean;
    active: boolean;
}
const props = defineProps<Props>();

const buttonWidth = computed(() => (props.fullWidth ? 'w-full' : 'w-auto'));
</script>

<style scoped>
.custom-btn-padding {
    padding: 11px 20px;
}
</style>
