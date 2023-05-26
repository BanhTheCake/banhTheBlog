import { ICategory } from '@/lib/Types/Category';

export interface IPost {
    _id: string;
    title: string;
    subContent: string;
    img: string;
    createdAt: string;
    count: number;
    favoritesUser: string[];
    slug: string;
    categories: ICategory[];
    user: {
        _id: string;
        username: string;
        img?: string | null;
    };
}

export interface IPostDetails {
    _id: string;
    title: string;
    slug: string;
    content: string;
    img: string;
    count: number;
    createdAt: string;
    user: {
        _id: string;
        username: string;
        img?: string | null;
    };
    categories: ICategory[];
    favoritesUser: string[];
}

export interface IHandlePost {
    title: string;
    content: string;
    img: string;
    categories: string[];
    slug: string;
}
