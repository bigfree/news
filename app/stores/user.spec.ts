import {beforeEach, describe, expect, it} from 'vitest'
import {createPinia, setActivePinia} from 'pinia'
import {useUserStore} from './user'

describe('User Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    })

    it('sets the current user correctly', () => {
        const store = useUserStore();
        store.setUser('Adam');
        expect(store.currentUser).toBe('Adam');
        expect(store.favoritesMap.has('Adam')).toBe(true);
    })

    it('toggles favorites correctly', () => {
        const store = useUserStore();
        store.setUser('Adam');
        const articleId = 'source:title:date';

        // Add to favorites
        store.toggleFavorite(articleId);
        expect(store.isFavorite(articleId)).toBe(true);

        // Remove from favorites
        store.toggleFavorite(articleId);
        expect(store.isFavorite(articleId)).toBe(false);
    })

    it('does not create an entry for empty username', () => {
        const store = useUserStore();
        store.setUser('');
        expect(store.currentUser).toBe('');
        expect(store.favoritesMap.has('')).toBe(false);
    })
})
