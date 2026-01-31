// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
        typeCheck: true,
    },
    compatibilityDate: '2026-01-31',
    modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
})