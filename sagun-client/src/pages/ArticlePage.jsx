import Button from '../components/Button';
import card1 from '../assets/card1.jpg';
import card2 from '../assets/card2.jpg';
import card3 from '../assets/card3.jpg';
import card4 from '../assets/card4.jpg';

const articles = [
  {
    id: '01',
    category: 'Student Life',
    title: 'Surviving Midterms Without Burning Out',
    excerpt:
      'The weekly routine that helped me balance deadlines, rest, and personal projects without feeling overwhelmed.',
    image: card1,
    alt: 'Message',
  },
  {
    id: '02',
    category: 'Projects',
    title: 'Lessons From My First Capstone Project',
    excerpt:
      'What failed, what improved, and which teamwork habits I will carry into every future collaboration.',
    image: card2,
    alt: 'Error',
  },
  {
    id: '03',
    category: 'Wellness',
    title: 'How I Reset After a Tough Week',
    excerpt:
      'My reset-day checklist for regaining focus and motivation when school and life start to pile up.',
    image: card3,
    alt: 'Checklist',
  },
  {
    id: '04',
    category: 'Personal Reflection',
    title: 'Love in the Things We Throw Away',
    excerpt:
      'Gently learning to throw away pressure, perfectionism, and thoughts that no longer help me.',
    image: card4,
    alt: 'Trash',
  },
];

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-2xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Moments, Meanings, and Lessons From My Everyday Life
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
          This page is a collection of personal blog entries inspired by student life, project challenges, and simple things around me that carry deeper meaning. Each post reflects a real experience and what it taught me.
        </p>
        <div className="mt-6">
          <Button to="/" variant="primary">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Latest Posts
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Featured article grid</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {articles.map((article) => (
            <article key={article.id} className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-4">
              <div className="overflow-hidden rounded-[1.25rem]">
                <img src={article.image} alt={article.alt} className="aspect-4/3 w-full object-cover" />
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                {article.category} • {article.id}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900">{article.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{article.excerpt}</p>
              <Button className="mt-4" variant="primary">Read More</Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;