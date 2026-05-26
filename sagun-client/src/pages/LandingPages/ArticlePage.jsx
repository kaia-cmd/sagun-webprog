import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button.jsx";
import { fetchArticleByName } from '../../services/ArticleService.js';
import NotFoundPage from "../NotFoundPage.jsx";

const getFallbackImage = (name = '') => {
  const hash = String(name)
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const imageIndex = (hash % 10) + 1;
  return `/images/articles/card${imageIndex}.jpg`;
};

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const response = await fetchArticleByName(name);
        setArticle(response.data);
      } catch (error) {
        if (error.response?.status === 404) {
          setNotFound(true);
        } else {
          console.error('Failed to fetch article:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [name]);

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <p className="text-sm text-zinc-600">Loading article...</p>
        </section>
      </div>
    );
  }

  if (!article || notFound) {
    return (
      <div className="flex w-full flex-col gap-6">    
            <NotFoundPage />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4">
            <Button to="/articles">← Back to Articles</Button>
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Article
          </p>
          <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            {article.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}
          </p>
        </div>
      </section>

      <section className="border-y-2 border-pink-200 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] border-2 border-pink-200 bg-pink-50">
            <img
              src={article.image || getFallbackImage(article.name)}
              alt={article.title}
              className="h-full w-full rounded-[1.25rem] object-cover"
              onError={(event) => {
                event.currentTarget.src = getFallbackImage(article.name);
              }}
            />
          </div>

          <div className="prose prose-sm max-w-none space-y-4 text-zinc-700">
            {(article.content || []).map((paragraph, index) => (
              <p key={index} className="text-base leading-7 text-zinc-700 whitespace-pre-wrap">
                {paragraph}
              </p>
            ))} 
          </div>

          <div className="mt-8 border-t-2 border-pink-200 pt-6">
            <Button to="/articles">Back to Articles</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;