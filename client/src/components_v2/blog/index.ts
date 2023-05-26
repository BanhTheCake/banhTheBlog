/* eslint-disable import/no-anonymous-default-export */
import CreateBlog from './Create';
import HandleBlog from './Handle';
import OptionsHandleBlog from './OptionsHandle';
import RelatedPosts from './Related';
import RelatedPostsFromAuthor from './RelatedFromAuthor';

export default {
    Create: CreateBlog,
    Handle: HandleBlog,
    OptionsHandle: OptionsHandleBlog,
    Related: RelatedPosts,
    RelatedFromAuthor: RelatedPostsFromAuthor,
};
