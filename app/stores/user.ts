import {defineStore} from 'pinia';
import type {ArticleSource} from '~/types/news.types';

const STORAGE_KEY = 'user-store';

export const useUserStore = defineStore('user', {
    state: () => ({
        currentUser: '',
        // Map of <userName, Set<articleId>>
        favoritesMap: new Map<string, Set<string>>(),
        isLoaded: false,
    }),
    getters: {
        userFavorites: (state): string[] => {
            if (!state.currentUser) {
                return [];
            }
            const favoritesSet = state.favoritesMap.get(state.currentUser);
            return favoritesSet ? Array.from(favoritesSet) : [];
        }
    },
    actions: {
        computedId(source: ArticleSource, title: string, publishedAt: string): string {
            return `${source.id ?? source.name ?? ''}:${title ?? ''}:${publishedAt ?? ''}`;
        },
        setUser(username: string): void {
            this.currentUser = username;

            if (username && !this.favoritesMap.has(username)) {
                this.favoritesMap.set(username, new Set<string>());
            }

            this.saveToStorage();
        },
        toggleFavorite(articleId: string): void {
            if (!this.currentUser) {
                return;
            }

            let favoritesSet = this.favoritesMap.get(this.currentUser);
            if (!favoritesSet) {
                favoritesSet = new Set<string>();
                this.favoritesMap.set(this.currentUser, favoritesSet);
            }

            if (favoritesSet.has(articleId)) {
                favoritesSet.delete(articleId);
            } else {
                favoritesSet.add(articleId);
            }

            this.saveToStorage();
        },
        isFavorite(articleId: string): boolean {
            if (!this.currentUser) return false;
            return this.favoritesMap.get(this.currentUser)?.has(articleId) ?? false;
        },
        saveToStorage(): void {
            if (import.meta.client) {
                // Convert Map<string, Set<string>> to [string, string[]][] for JSON
                // Filter out empty usernames to prevent polluting storage
                const serializableFavorites = Array.from(this.favoritesMap.entries())
                    .filter(([user]) => user !== "")
                    .map(([user, set]) => [user, Array.from(set)]);

                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    currentUser: this.currentUser,
                    favoritesMap: serializableFavorites,
                }));
            }
        },
        loadFromStorage(): void {
            if (import.meta.client && !this.isLoaded) {
                const data = localStorage.getItem(STORAGE_KEY);

                if (data) {
                    const parsed = JSON.parse(data);
                    this.currentUser = parsed.currentUser || '';

                    if (parsed.favoritesMap) {
                        // Reconstruct Map<string, Set<string>> from [string, string[]][]
                        this.favoritesMap = new Map(
                            (parsed.favoritesMap as [string, string[]][]).map(
                                ([user, items]) => [user, new Set(items)]
                            )
                        );
                    }
                }

                this.isLoaded = true;
            }
        }
    }
});
