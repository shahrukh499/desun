import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300 mb-4">
          Post Not Found
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          The post you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

