<template>
    <div class="flex justify-between space-x-3 w-full">

        <button :disabled="isFirstPage" @click="$router.push({ query: { page: page - 1 } })"
            class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300 hover:bg-blue-600 transition">
            <ArrowLeft />
            <span>Preview</span>
        </button>

        <button @click="$router.push({ query: { page: page + 1 } })" :disabled="hasMoreData"
            class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300 hover:bg-blue-600 transition">
            <span>Next</span>
            <ArrowRight />
        </button>

    </div>
</template>
<script lang="ts" setup>
import ArrowLeft from '@/icons/ArrowLeft.vue';
import ArrowRight from '@/icons/ArrowRight.vue';

interface Props {
    page: number;
    isFirstPage: boolean;
    hasMoreData: boolean
}

defineProps<Props>()


</script>