import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import NewsItem from './NewsItem.vue'

describe('NewsItem', () => {
    const mockArticle = {
        title: 'Test Article Title',
        description: 'Test Description',
        url: 'https://example.com',
        urlToImage: 'https://example.com/image.jpg',
        publishedAt: '2026-01-01T10:00:00Z',
        source: {name: 'Test Source', id: 'test-source'},
        content: 'Content',
        author: 'Author',
    }

    it('renders article title and description', () => {
        const wrapper = mount(NewsItem, {
            props: {
                article: mockArticle
            },
            global: {
                stubs: {
                    FavoriteButton: true,
                    NuxtLink: true
                }
            }
        });

        expect(wrapper.text()).toContain('Test Article Title');
        expect(wrapper.text()).toContain('Test Description');
    })

    it('renders "No image" placeholder when urlToImage is missing', () => {
        const articleWithoutImage = {...mockArticle, urlToImage: null};
        const wrapper = mount(NewsItem, {
            props: {
                article: articleWithoutImage
            },
            global: {
                stubs: {
                    FavoriteButton: true,
                    NuxtLink: true
                }
            }
        });

        expect(wrapper.text()).toContain('No image');
    })
})
