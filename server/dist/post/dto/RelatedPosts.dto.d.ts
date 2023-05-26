import { PostsPaginationDto } from './posts.pagination.dto';
export declare class RelatedPostsDto extends PostsPaginationDto {
    categories?: string[];
    userId?: string;
    currentId: string;
}
