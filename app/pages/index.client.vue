<template>
    <main>
        <h1>Top Headlines</h1>

        <div v-if="loading">Loading news...</div>

        <div v-else class="news-grid flex">
            <div v-for="(article, index) in news" :key="index" class="article-card">
                <img :src="article.urlToImage" alt="news image"/>
                <h2>{{ article.title }}</h2>
                <button @click="saveToReadLater(article)">Read Later</button>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const news = ref([]);
const loading = ref(true);
const apiKey = '930b3fc8f2564bb382739710d55c8972';
const response = await fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${apiKey}`);
const data = await response.json();
news.value = data.articles;
loading.value = false;

const saveToReadLater = (article) => {
    const list = JSON.parse(localStorage.getItem('read-later') || '[]');
    list.push(article.title);
    localStorage.setItem('read-later', JSON.stringify(list));
};
</script>