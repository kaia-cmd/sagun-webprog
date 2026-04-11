import { Outlet } from 'react-router-dom';
import heroGif from '../assets/hero.gif';

const AuthLayout = () => {
    return (
        <section className='min-h-screen bg-zinc-100 text-zinc-900'>
            <div className='grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]'>
                <div className="flex items-center justify-center border-b-2 border-zinc-300 bg-zinc-200 p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-zinc-300 lg:p-16">
                    <div className='flex w-full max-w-2xl flex-col gap-6 rounded-[2rem] border-2 border-zinc-300 bg-gradient-to-br from-zinc-200 via-zinc-100 to-pink-100 p-8 sm:gap-7 sm:p-10 lg:gap-8 lg:p-12'>
                        <div>
                            <p className='text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500'>
                                Welcome to KAIA.TXT
                            </p>
                            <h2 className='mt-3 max-w-md text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl'>
                                Stories, reflections, and creative projects in one place.
                            </h2>
                            <p className='mt-4 max-w-md text-sm leading-7 text-zinc-600'>
                                Sign in to keep track of what you read, save your favorites, and continue your journey.
                            </p>
                        </div>

                        <div className='overflow-hidden rounded-3xl border-2 border-zinc-300 bg-zinc-50'>
                            <img
                                src={heroGif}
                                alt='Animated hero visual for the auth page'
                                className='h-48 w-full object-cover sm:h-56'
                            />
                        </div>

                        <blockquote className='rounded-2xl border-2 border-dashed border-zinc-400 bg-zinc-50 p-5'>
                            <p className='text-sm italic leading-7 text-zinc-700'>
                                "This space helps me turn ordinary moments into meaningful stories."
                            </p>
                        </blockquote>
                    </div>
                </div>

                <main className='flex items-center bg-zinc-50 px-6 py-10 sm:px-10 lg:px-16'>
                    <div className='mx-auto w-full max-w-md'>
                        <Outlet />
                    </div>
                </main>
            </div>
        </section>
    );
};

export default AuthLayout;