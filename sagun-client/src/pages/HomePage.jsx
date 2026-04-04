import Button from '../components/Button';
import logo from '../assets/K.png';
import hero from '../assets/hero.gif';
import card1 from "../assets/card1.jpg";
import card2 from "../assets/card2.jpg";
import card3 from "../assets/card3.jpg";

import ArticleList from "../components/ArticleList";
import articles from "../assets/article-content.js";


const HomePage = () => {
    return (
        <div className='flex w-full flex-col gap-6'>
            <section className='border-y-2 border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8'>
                <div className='grid gap-8 lg:grid-cols-2 lg:items-center'>
                    <div>
                        <p className='mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500'>
                            PERSONAL BLOG
                        </p>
                        <h1 className='max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl'>
                            Stories, Study Notes, and Creative Projects by Kaia
                        </h1>
                        <p className='mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base'>
                            I write about student life, web development practice, and lessons from building projects. This blog is my space to share honest experiences, useful resources, and progress as I grow.
                        </p>
                        <div className='mt-6'>
                            <Button to="/about" variant="primary">
                                Learn More
                            </Button>
                        </div>
                    </div>

                    <div className="relative flex min-h-65 items-center justify-center rounded-[1.25rem] bg-pink-50 p-6"> <img src={hero} alt="Hero animation" className="h-80 w-auto object-contain" /> <img src={logo} alt="Kaia logo" className="absolute bottom-4 right-35 h-28 w-40 rounded-full border-2 border-pink-200 bg-white p-1 object-contain shadow-sm" /> </div>
                </div>
            </section>

            <section className='border-y border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8'>
                <div className='mb-6'>
                    <p className='text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500'>
                        KPI Section
                    </p>
                    <h2 className='mt-2 text-2xl font-semibold text-zinc-900'>
                        Quick overview blocks
                    </h2>
                </div>

                <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    <div className='rounded-3xl border-2 border-pink-200 bg-pink-50 p-5'>
                        <p className='text-2xl font-bold text-zinc-900'>24</p>
                        <p className='mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500'>
                            Posts Published
                        </p>
                    </div>
                    <div className='rounded-3xl border-2 border-pink-200 bg-pink-50 p-5'>
                        <p className='text-2xl font-bold text-zinc-900'>04</p>
                        <p className='mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500'>
                            Categories
                        </p>
                    </div>
                    <div className='rounded-3xl border-2 border-pink-200 bg-pink-50 p-5'>
                        <p className='text-2xl font-bold text-zinc-900'>06 min</p>
                        <p className='mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500'>
                            Average Read Time
                        </p>
                    </div>
                    <div className='rounded-3xl border-2 border-pink-200 bg-pink-50 p-5'>
                        <p className='text-2xl font-bold text-zinc-900'>320</p>
                        <p className='mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500'>
                            Monthly Readers
                        </p>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Feature Cards
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Latest Articles</h2> 
                </div>

                <div className="grid gap-4"> <ArticleList articles={articles.slice(0, 4)} /> </div>
            </section>
        </div>
    )
}
export default HomePage;
