<template>
    <div v-if="modalContent" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

        <div class="relative bg-white w-full max-w-2xl mx-4 p-6 rounded-lg shadow-lg">

            <CloseIcon class="absolute top-3 right-3 cursor-pointer" @click="closeModal" />
            <component :is="modalContent.component" v-bind="modalContent.props"></component>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Subscription } from 'rxjs';

import { modalService } from '../../../services/modal.service';
import type { ModalContent } from '../../../interfaces/modalServices.interface';
import CloseIcon from '@/icons/CloseIcon.vue';


const modalContent = ref<ModalContent | null>(null);
let subscription: Subscription;

onMounted(() => {
    subscription = modalService.modal$.subscribe(content => {
        modalContent.value = content;
    });
});

onUnmounted(() => {
    subscription.unsubscribe();
});

const closeModal = () => {
    modalService.closeModal();
};
</script>
