import ReactMarkdown from 'react-markdown';
import type { Route } from './+types/details';
import type { PostMeta } from '~/types';
import { Link } from 'react-router';

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;
  //   console.log(slug);

  const url = new URL('/data/posts-meta.json', request.url);
  const res = await fetch(url.href);

  if (!res.ok) throw new Error('Failed to fetch data');

  const index = await res.json();
  //   console.log(index);

  const postMeta = index.find((post: PostMeta) => post.slug === slug);
  //   console.log(postMeta);

  if (!postMeta) throw new Response('Not Found', { status: 404 });

  //   Dynamically import raw markdown
  const markdown = await import(`../../posts/${slug}.md?raw`);
  //   console.log(markdown);

  return { postMeta, markdown: markdown.default };
}

type BlogPostDetailsPageProps = {
  loaderData: {
    postMeta: PostMeta;
    markdown: string;
  };
};

const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
  const { postMeta, markdown } = loaderData;
  //   console.log(postMeta, markdown);

  return (
    <div className="mx-auto max-w-3xl bg-gray-900 px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold text-blue-400">
        {postMeta.title}
      </h1>

      <p className="mb-6 text-sm text-gray-400">
        {new Date(postMeta.date).toDateString()}
      </p>

      <div className="max-w non prose prose-invert mb-12">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>

      <Link
        to="/blog"
        className="inline-block. rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
      >
        ← Back To Posts
      </Link>
    </div>
  );
};

export default BlogPostDetailsPage;
