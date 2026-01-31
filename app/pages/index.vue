<template>
    <main>
        <NewsList :articles="articles" />

        <div v-if="showInitialSpinner" class="flex justify-center my-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"/>
        </div>

        <div v-if="showLoadMoreSpinner" class="flex justify-center my-8">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"/>
        </div>

        <div ref="loadMoreTrigger" class="h-10"/>
    </main>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import type {Article, NewsPayload} from "../types/news.types";
import {fetchNewsPage} from "../utils/newsApi";

const articles = ref<Article[]>([]);
const page = ref(1);
const pageSize = 18;
const config = useRuntimeConfig();

const apiKey = config.public?.newsApiKey || '';
const fetchPage = (pageNum: number) => fetchNewsPage(pageNum, pageSize, apiKey);

// SEO Meta
useSeoMeta({
    title: 'Infinite News Feed',
    description: 'Stay updated with the latest news from around the world.',
    ogTitle: 'Infinite News Feed',
    ogDescription: 'Stay updated with the latest news from around the world.',
})

const {data, status} = await useAsyncData<NewsPayload>(
    'news',
    () => fetchPage(page.value)
);

const isLoadingMore = ref(false);
const showInitialSpinner = computed(() => status.value === 'pending' && articles.value.length === 0);
const showLoadMoreSpinner = computed(() => isLoadingMore.value);

if (data.value?.articles) {
    articles.value = data.value.articles;
}

watch(page, async (newPage) => {
    if (newPage <= 1) {
        return;
    }
    if (isLoadingMore.value) {
        return;
    }

    try {
        isLoadingMore.value = true;
        const response = await fetchPage(newPage);

        if (response.articles) {
            articles.value.push(...response.articles);
        }
    } catch (e) {
        console.error('Error fetching more news:', e);
    } finally {
        isLoadingMore.value = false;
    }
})

// Infinite scroll trigger
const loadMoreTrigger = ref<HTMLElement | null>(null);
useInfiniteScroll(loadMoreTrigger, () => {
    page.value++;
});
</script>
