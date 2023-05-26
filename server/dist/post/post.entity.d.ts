import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';
export type PostDocument = HydratedDocument<Post>;
export declare class Post {
    _id: string;
    title: string;
    slug: string;
    content: string;
    subContent: string;
    img: string;
    count: number;
    user: User;
    categories: Category[];
    favoritesUser: User[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const PostSchema: mongoose.Schema<Post, mongoose.Model<Post, any, any, any, mongoose.Document<unknown, any, Post> & Omit<Post & Required<{
    _id: string;
}>, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Post, mongoose.Document<unknown, {}, mongoose.FlatRecord<Post>> & Omit<mongoose.FlatRecord<Post> & Required<{
    _id: string;
}>, never>>;
