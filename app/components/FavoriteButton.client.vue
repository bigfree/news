<template>
    <button
        v-if="userStore.currentUser"
        class="p-2 rounded-full hover:bg-gray-100 transition-colors w-10 h-10"
        :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        @click="userStore.toggleFavorite(articleId)"
    >
        <span v-if="isFavorite" class="text-red-500">❤️</span>
        <span v-else class="text-gray-400">🤍</span>
    </button>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useUserStore} from '~/stores/user';
import type {ArticleSource} from '~/types/news.types';

const props = defineProps<{
    articlePublishedAt: string;
    articleTitle: string;
    articleSource: ArticleSource;
}>();

const userStore = useUserStore();

const articleId = computed(() => userStore.computedId(
    props.articleSource,
    props.articleTitle,
    props.articlePublishedAt
));
const isFavorite = computed(() => userStore.isFavorite(articleId.value));
</script>
