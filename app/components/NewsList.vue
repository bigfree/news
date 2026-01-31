<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NewsItem
            v-for="(article, index) in articles"
            :key="`${article.url}-${index}`"
            :article="article"
        />
    </div>
</template>

<script setup lang="ts">
import type {Article} from '~/types/news.types'

defineProps<{
    articles: Article[]
}>()
</script>
