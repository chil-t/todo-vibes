import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Todo Vibes - A Fresh Todo App</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="bg-gray-50 min-h-screen">
        <header class="bg-blue-600 text-white p-4 shadow-md">
          <div class="max-w-4xl mx-auto">
            <h1 class="text-2xl font-bold">Todo Vibes</h1>
          </div>
        </header>
        <main class="max-w-4xl mx-auto py-8">
          <Component />
        </main>
        <footer class="border-t mt-12 py-6 text-center text-gray-500 text-sm">
          <div class="max-w-4xl mx-auto">
            <p>Todo Vibes - Built with Fresh and Deno</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
