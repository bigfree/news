import type {NewsPayload} from "../types/news.types";

export const buildNewsUrl = (pageNum: number, pageSize: number, apiKey: string) =>
    `https://newsapi.org/v2/everything?q=news&page=${pageNum}&pageSize=${pageSize}&apiKey=${apiKey}`;

export const fetchNewsPage = (pageNum: number, pageSize: number, apiKey: string) =>
    $fetch<NewsPayload>(buildNewsUrl(pageNum, pageSize, apiKey));
