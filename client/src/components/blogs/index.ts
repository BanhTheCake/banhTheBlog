import CreateBlog from './CreateBlog';
import CreateCategories from './CreateCategories';
import HandleBlog from './HandleBlog';
import ModalUpdateCategory from './ModalUpdateCategory';
import OptionsDetailsPost from './OptionsHandlePost';
import RelatedPosts from './RelatedPosts';
import RelatedPostsFromAuthor from './RelatedPostsFromAuthor';

export default {
    Create: CreateBlog,
    CreateCategories,
    Handle: HandleBlog,
    ModalUpdateCategory,
    OptionsDetails: OptionsDetailsPost,
    Related: RelatedPosts,
    RelatedFromAuthor: RelatedPostsFromAuthor,
};
