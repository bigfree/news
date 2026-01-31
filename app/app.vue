<template>
    <div>
        <AppHeader />
        <main class="container mx-auto px-4 py-8">
            <NuxtPage/>
        </main>
    </div>
</template>

<script setup>
import {useUserStore} from '~/stores/user';
import {onMounted} from 'vue';

const userStore = useUserStore();

onMounted(() => {
    userStore.loadFromStorage();
})
</script>