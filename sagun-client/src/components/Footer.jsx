import { Link } from "react-router-dom";

const links = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Articles", to: "/articles" },
];

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-2 overflow-hidden border-t-2 border-pink-200 bg-zinc-50">
            <div className="pointer-events-none absolute -left-20 top-0 h-48 w-48 rounded-full bg-pink-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-rose-200/40 blur-3xl" />

            <div className="relative px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-3">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Kaia.txt
                        </p>
                        <h3 className="mt-2 text-2xl font-bold leading-tight text-zinc-900">
                            Learning in public, one story at a time.
                        </h3>
                        <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-600">
                            Notes on student life, projects, and growth. 
                        </p>
                    </div>

                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Explore
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {links.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="inline-flex rounded-full border-2 border-pink-200 bg-pink-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 transition hover:border-pink-400 hover:bg-pink-100"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Connect
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <a
                                href="mailto:sagunae@students.national-u.edu.ph"
                                className="rounded-full border-2 border-pink-200 bg-pink-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 transition hover:border-pink-400 hover:bg-pink-100"
                            >
                                Email
                            </a>
                            <a
                                href="https://github.com/kaia-cmd"
                                className="rounded-full border-2 border-pink-200 bg-pink-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 transition hover:border-pink-400 hover:bg-pink-100"
                            >
                                GitHub
                            </a>
                            <a
                                href="https://m.me/angelikasagun"
                                className="rounded-full border-2 border-pink-200 bg-pink-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 transition hover:border-pink-400 hover:bg-pink-100"
                            >
                                Messenger
                            </a>
                        </div>
                        <p className="mt-4 text-sm text-zinc-500">
                            Open for collaboration and student project ideas.
                        </p>
                    </div>
                </div>

                <div className="mt-8 border-t-2 border-pink-200 pt-4 text-xs uppercase tracking-[0.18em] text-zinc-500">
                    {`© ${year} Kaia.txt. All rights reserved.`}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
