import { useState } from 'react';
import type { PostMeta } from '~/types';
import type { Route } from './+types';
import PostCard from '~/components/PostCard';
import Pagination from '~/components/Pagination';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL('/data/posts-meta.json', request.url);
  const res = await fetch(url);

  if (!res.ok) throw new Error('Failed to fetch data');

  const data = await res.json();
  // console.log(data);

  data.sort((a: PostMeta, b: PostMeta) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return { posts: data };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const { posts } = loaderData;
  // console.log(posts);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="mx-auto mt-10 max-w-3xl bg-gray-900 px-6 py-6">
      <h2 className="mb-8 text-3xl font-bold text-white">📝 Blog</h2>

      {currentPosts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default BlogPage;
