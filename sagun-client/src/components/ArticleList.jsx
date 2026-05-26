import { Link } from "react-router-dom";
import Button from './Button';

const getFallbackImage = (name = '') => {
    const hash = String(name)
        .split('')
        .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const imageIndex = (hash % 10) + 1;
    return `/images/articles/card${imageIndex}.jpg`;
};

const ArticleList = ({ articles }) => {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {articles.map((article, index) => (
                <article key={article.name} className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-4">
                    <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-pink-50">
                        <img
                            src={article.thumbnail || article.image || getFallbackImage(article.name)}
                            alt={article.title}
                            className="h-full w-full rounded-[1.25rem] object-cover"
                            loading="lazy"
                            onError={(event) => {
                                event.currentTarget.src = getFallbackImage(article.name);
                            }}
                        />
                    </div>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                        Article {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-zinc-900">{article.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-600">
                        {String(article.content?.[0] || 'No preview available yet.').substring(0, 150)}...
                    </p>
                    <Link to={`/articles/${article.name}`}>
                        <Button className="mt-4">Read More</Button>
                    </Link>
                </article>
            ))}
        </div>
    );
};

export default ArticleList;