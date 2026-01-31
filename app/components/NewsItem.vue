<template>
    <article class="flex flex-col border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
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

        <section class="p-4 flex flex-col flex-grow">
            <h2 class="text-lg font-semibold mb-2 line-clamp-2">{{ article.title }}</h2>
            <p class="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{{ article.description }}</p>

            <div class="flex justify-between items-center mt-auto">
                <a
                    :href="article.url"
                    target="_blank"
                    rel="noopener"
                    class="text-blue-500 hover:underline text-sm font-medium"
                >
                    Read more
                </a>

                <FavoriteButton
                    :article-title="article.title"
                    :article-source="article.source"
                    :article-published-at="article.publishedAt"
                />
            </div>
        </section>
    </article>
</template>

<script setup lang="ts">
import type {Article} from '~/types/news.types'

defineProps<{
    article: Article
}>()
</script>
