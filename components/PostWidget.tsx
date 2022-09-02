import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import { graphCMSImageLoader } from '../util';
import { getRecentPosts, getSimilarPosts } from '../services/Index';

const PostWidget = ({ categories, slug }: any) => {
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        if(slug) {
            getSimilarPosts(categories, slug)
                .then((result) => {
                    setRelatedPosts(result)
                });
        } else {
            getRecentPosts()
                .then((result) => {
                    setRelatedPosts(result)
                });
        }   
    }, [slug]);

    console.log(relatedPosts);

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                {slug ? "Related Posts" : "Recent Posts"}
            </h3>
            {relatedPosts.map((post: any, index: any) => (
                <div className="flex items-center w-full mb-4" key={index}>
                    <div className="w-16 flex-none">
                        <Image
                            loader={graphCMSImageLoader}
                            alt={post.title}
                            height="60px"
                            width="60px"
                            unoptimized
                            className="align-middle rounded-full"
                            src={post.featuredImage.url}
                        />
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-gray-500 font-xs">
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                        </p>
                        <Link href={`/post/${post.slug}`} key={index} className="text-md">
                            {post['title']}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostWidget;