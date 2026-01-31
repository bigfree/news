<template>
    <div class="flex items-center gap-4 bg-gray-100 p-2 rounded-lg" style="height: 46px">
        <div v-if="userStore.currentUser" class="flex items-center gap-2">
            <span class="text-sm font-medium">User: <span class="text-blue-600">{{
                    userStore.currentUser
                }}</span></span>
            <button class="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded" @click="logout">Logout</button>
        </div>
        <div v-else class="flex items-center gap-2">
            <input
                v-model="usernameInput"
                type="text"
                placeholder="Enter name..."
                class="text-sm p-1 border rounded"
                @keyup.enter="login"
            />
            <button class="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" @click="login">
                Login
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useUserStore} from '~/stores/user';

const userStore = useUserStore();
const usernameInput = ref('');

const login = () => {
    if (usernameInput.value.trim()) {
        userStore.setUser(usernameInput.value.trim());
        usernameInput.value = '';
    }
}

const logout = () => {
    userStore.setUser('');
}
</script>
