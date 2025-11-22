import Link from "next/link";
import { notFound } from "next/navigation";

async function getPost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

async function getUser(userId) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
}

async function getComments(postId) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export default async function PostPage({ params }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  const [author, comments] = await Promise.all([
    getUser(post.userId),
    getComments(post.id),
  ]);

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Posts
        </Link>

        <article className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
          <div className="p-8 md:p-12">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                Post #{post.id}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              {post.title}
            </h1>

            {author && (
              <div className="mb-8 p-4 bg-zinc-50 dark:bg-zinc-700/50 rounded-lg">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                  Author
                </p>
                <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {author.name}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  {author.email}
                </p>
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                {post.body}
              </p>
            </div>
          </div>

          {comments.length > 0 && (
            <div className="border-t border-zinc-200 dark:border-zinc-700 p-8 md:p-12 bg-zinc-50 dark:bg-zinc-900/50">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                Comments ({comments.length})
              </h2>
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white dark:bg-zinc-800 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                          {comment.name}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          {comment.email}
                        </p>
                      </div>
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {comment.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}

