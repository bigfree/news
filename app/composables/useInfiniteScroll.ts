import {onBeforeUnmount, onMounted, type Ref} from "vue";

type UseInfiniteScrollOptions = IntersectionObserverInit;

export const useInfiniteScroll = (
    target: Ref<HTMLElement | null>,
    onIntersect: () => void,
    options: UseInfiniteScrollOptions = {
        threshold: 0.1
    }
) => {
    let observer: IntersectionObserver | null = null;

    onMounted(() => {
        observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            if (entries[0]?.isIntersecting) {
                onIntersect();
            }
        }, options);

        if (target.value) {
            observer.observe(target.value);
        }
    });

    onBeforeUnmount(() => {
        observer?.disconnect();
        observer = null;
    });
};
