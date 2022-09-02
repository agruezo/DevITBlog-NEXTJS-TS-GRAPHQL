import React from 'react';
import { useRouter } from 'next/router';
import { getPosts, getPostDetails } from '../../services/Index';
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../../components/Index';
import { AdjacentPosts } from '../../sections/index';

const PostDetails = ({ post }: any) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    <PostDetail post={post} />
                    <Author author={post.author} />
                    <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
                    <CommentsForm slug={post.slug} />
                    <Comments slug={post.slug} />
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <PostWidget slug={post.slug} categories={post.categories.map((category: any) => category.slug)} />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default PostDetails

export async function getStaticProps({ params }: any) {
    const data = (await getPostDetails(params.slug));

    return {
        props: { post: data }
    }
}

export async function getStaticPaths() {
    const posts = await getPosts();

    return {
        paths: posts.map(({ node: { slug }}: any) => ({ params: { slug }})),
        fallback: false,
    }
}