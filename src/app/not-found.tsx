import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 py-24 bg-cream">
            <h2 className="text-6xl font-bold font-serif text-lime mb-4">404</h2>
            <h1 className="text-3xl font-bold font-serif text-forest mb-6">Page Not Found</h1>
            <p className="mb-10 text-lg text-gray-600 max-w-md mx-auto">
                Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
            </p>
            <Link
                href="/"
                className="rounded-md bg-lime px-3.5 py-2.5 text-sm font-semibold text-forest shadow-sm hover:bg-lime/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime transition-colors"
            >
                Go back home
            </Link>
        </div>
    );
}
