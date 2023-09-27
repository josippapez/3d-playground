import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Oops, an empty Canvas!',
  description: "Looks like you've found our corner where nothing exists — yet!",
};

function NotFoundPage() {
  return (
    <main className="bg-background h-screen flex items-center text-center">
      <section className="flex flex-col gap-12 max-w-screen-4xl m-auto px-12 md:px-32">
        <h1 className="fluid-text-xl uppercase font-sans tracking-tight">
          Oops, an empty Canvas!
        </h1>
        <p className="fluid-text-lg font-sansAlt uppercase">
          Looks like you&apos;ve found our corner where nothing exists — yet!
        </p>
      </section>
    </main>
  );
}

export default NotFoundPage;
