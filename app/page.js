import Link from "next/link";

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Blog Reader
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            Discover amazing posts from our community
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              className="group"
            >
              <article className="h-full bg-white dark:bg-zinc-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-zinc-200 dark:border-zinc-700">
                <div className="p-6 h-full flex flex-col">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                      Post #{post.id}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3 grow">
                    {post.body}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <footer className="mt-12 text-center text-zinc-600 dark:text-zinc-400">
          <p>Powered by JSONPlaceholder API</p>
        </footer>
      </div>
    </div>
  );
}
