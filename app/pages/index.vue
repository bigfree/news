<template>
    <main>
        <NewsList :articles="articles" />

        <div v-if="pending" class="flex justify-center my-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"/>
        </div>

        <div ref="loadMoreTrigger" class="h-10"/>
    </main>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import type {Article, NewsPayload} from "../types/news.types";

const articles = ref<Article[]>([]);
const page = ref(1);
const pageSize = 18;
const apiKey = '930b3fc8f2564bb382739710d55c8972';

// SEO Meta
useSeoMeta({
    title: 'Infinite News Feed',
    description: 'Stay updated with the latest news from around the world.',
    ogTitle: 'Infinite News Feed',
    ogDescription: 'Stay updated with the latest news from around the world.',
})

// Initial fetch with SSR support
const {data, status} = await useAsyncData<NewsPayload>('news', () =>
    $fetch(`https://newsapi.org/v2/everything?q=news&page=${page.value}&pageSize=${pageSize}&apiKey=${apiKey}`)
);

const pending = computed(() => status.value === 'pending');

if (data.value && (data.value as any).articles) {
    articles.value = (data.value as any).articles;
}

const fetchMore = async () => {
    if (status.value === 'pending') {
        return;
    }

    page.value++
    try {
        const response: NewsPayload = await $fetch(
            `https://newsapi.org/v2/everything?q=news&page=${page.value}&pageSize=${pageSize}&apiKey=${apiKey}`
        );

        if (response.articles) {
            articles.value.push(...response.articles);
        }
    } catch (e) {
        console.error('Error fetching more news:', e);
    }
}

// Infinite scroll trigger
const loadMoreTrigger = ref(null);

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
            fetchMore()
        }
    }, {rootMargin: '200px'})

    if (loadMoreTrigger.value) {
        observer.observe(loadMoreTrigger.value)
    }
})
</script>