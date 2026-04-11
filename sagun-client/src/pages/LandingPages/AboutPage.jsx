import Button from "../../components/Button";
import AboutImage from "../../assets/about.jpg";

const AboutPage = () => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div className="rounded-3xl border-2 border-dashed border-pink-300 bg-pink-50 p-6">
                        <div className="flex min-h-42 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <img
                                src={AboutImage}
                                alt="Personal workspace symbolizing reflection and growth"
                                className="h-95 w-full object-cover"
                            />
                        </div>
                    </div>

                        <div>
                            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                                About Me
                            </p>
                            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                                The person behind the stories, reflections, and creative projects
                            </h1>
                            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                                I am Kaia, a student in National University-Manila taking up BSIT-MWA. I write about growth, school life, and the lessons hidden in ordinary moments. This blog is my space to document what I am learning in class, in projects, and in life.
                            </p>
                    
                    <div className="mt-6 flex flex-wrap gap-3">
                    <Button to="/" variant="primary">Back Home</Button>
                    <Button to="/articles">Open Articles</Button>
                </div>
            </div>
        </div>
    </section>

    <section className="border-y-2 border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">At a Glance</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">My blog journey so far</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5">
                <p className="text-2xl font-bold text-zinc-900">24</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Journal Entries</p>
            </div>
            <div className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5">
                <p className="text-2xl font-bold text-zinc-900">04</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Main Categories</p>
            </div>
            <div className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5">
                <p className="text-2xl font-bold text-zinc-900">06 min</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Average Reading Time</p>
            </div>
            <div className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5">
                <p className="text-2xl font-bold text-zinc-900">320</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Monthly Readers</p>
            </div>
        </div>
    </section>

    <section className="border-y-2 border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-4xl"> <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">What You Will Find Here</p> <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Stories with meaning, not just updates</h2>

            <div className="mt-6 space-y-4">
                <article className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Student Life and Real Lessons</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">Honest posts about deadlines, pressure, and the routines that help me stay grounded during busy school weeks.</p>
                </article>

                <article className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Projects, Creativity, and Reflection</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">Behind-the-scenes notes from my web projects, creative experiments, and symbolic moments that inspire personal growth.</p>
                </article>
            </div>
        </div>
    </section>
    </div>    
    );
};

export default AboutPage;