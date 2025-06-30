import { NewsCard, type News } from "./news-card";

type NewsListProps = {
  news: News[];
};

export const NewsList = ({ news }: NewsListProps) => {
  if (news.length === 0) {
    return (
      <section className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl text-gray-400">📰</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Aucune actualité disponible
        </h3>
        <p className="text-gray-600">
          Les dernières nouvelles apparaîtront ici dès qu&apos;elles seront
          publiées.
        </p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((article: News, index: number) => (
        <NewsCard key={article.id} article={article} index={index} />
      ))}
    </section>
  );
};
