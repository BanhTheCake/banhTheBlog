import { PostsPaginationDto } from './posts.pagination.dto';
export declare class SearchDto {
    categorySlug?: string;
    query?: string;
}
export declare class SearchPostsPaginationDto extends PostsPaginationDto {
    search: SearchDto;
}
