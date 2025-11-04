import { Link } from 'react-router';
import type { PostMeta } from '~/types';

type LatestPostsProps = {
  posts: PostMeta[];
  limit?: number;
};

const LatestPosts = ({ posts, limit = 3 }: LatestPostsProps) => {
  const sorted = [...posts].sort((a: PostMeta, b: PostMeta) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const latest = sorted.slice(0, limit);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="mb-6 text-2xl font-bold text-white">🆕 Latest Posts</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block rounded-lg border border-gray-700 bg-gray-800 p-4 transition hover:shadow-md"
          >
            <h3 className="mb-1 text-lg font-semibold text-blue-400">
              {post.title}
            </h3>

            <p className="text-sm text-gray-300">{post.excerpt}</p>

            <span className="mt-3 block text-xs text-gray-400">
              {new Date(post.date).toDateString()}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;
