import Button from "../components/Button";

function NotFoundPage() {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="relative overflow-hidden border-y-2 border-pink-200 bg-zinc-50 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                <div className="pointer-events-none absolute -left-16 top-0 h-44 w-44 rounded-full bg-pink-200/50 blur-3xl" />
                <div className="pointer-events-none absolute -right-20 bottom-0 h-52 w-52 rounded-full bg-rose-200/40 blur-3xl" />

                <div className="relative mx-auto max-w-3xl rounded-3xl border-2 border-pink-200 bg-pink-50 p-6 sm:p-8">
                    <p className="inline-flex rounded-full border-2 border-pink-300 bg-pink-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-700">
                        Error 404
                    </p>

                    <h1 className="mt-4 text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                        This page is missing, but your next read is not.
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
                        The page you are looking for may have been moved, renamed, or never existed.
                        You can return home, or browse the latest articles instead.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <Button to="/" variant="primary">Go Home</Button>
                        <Button to="/articles" variant="secondary">Browse Articles</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default NotFoundPage;