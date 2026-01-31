// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
        typeCheck: true,
    },
    compatibilityDate: '2026-01-31',
    runtimeConfig: {
        public: {
            newsApiKey: process.env.NUXT_PUBLIC_NEWS_API_KEY || '',
        },
    },
    modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
})
