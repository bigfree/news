<template>
    <main class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
                v-for="(article, index) in articles"
                :key="`${article.url}-${index}`"
                class="flex flex-col border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
            >
                <img
                    v-if="article.urlToImage"
                    :src="article.urlToImage"
                    :alt="article.title"
                    class="w-full h-48 object-cover"
                    loading="lazy"
                />
                <div v-else class="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                    No image
                </div>

                <div class="p-4 flex flex-col flex-grow">
                    <h2 class="text-lg font-semibold mb-2 line-clamp-2">{{ article.title }}</h2>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{{ article.description }}</p>

                    <div class="flex justify-between items-center mt-auto h-10">
                        <a
                            :href="article.url"
                            target="_blank"
                            rel="noopener"
                            class="text-blue-500 hover:underline text-sm font-medium"
                        >
                            Read more
                        </a>

                        <FavoriteButton :article-published-at="article.publishedAt" :article-title="article.title"
                                        :article-source="article.source"/>
                    </div>
                </div>
            </div>
        </div>

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
const pageSize = 13;
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
    }, {threshold: 0.5})

    if (loadMoreTrigger.value) {
        observer.observe(loadMoreTrigger.value)
    }
})
</script>