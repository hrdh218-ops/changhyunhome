import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSite, News } from '../store/SiteContext';
import { Calendar, ChevronRight, Newspaper } from 'lucide-react';

export default function NewsBoard({ navigate, path }: { navigate: (href: string) => void, path: string }) {
  const { news } = useSite();
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  React.useEffect(() => {
    if (path.startsWith('/news/')) {
      const id = path.split('/')[2];
      const found = news.find(n => n.id === id);
      if (found) setSelectedNews(found);
    } else {
      setSelectedNews(null);
      window.scrollTo(0, 0);
    }
  }, [path, news]);

  if (selectedNews) {
    return (
      <section className="pt-32 pb-24 px-6 min-h-screen z-10 relative bg-brand-black text-white">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate('/news')}
            className="text-neutral-400 hover:text-white mb-8 transition-colors flex items-center gap-2"
          >
            <ChevronRight className="rotate-180" size={16} /> 목록으로 돌아가기
          </button>
          
          <h1 className="text-3xl md:text-5xl font-black mb-6">{selectedNews.title}</h1>
          <div className="flex items-center gap-2 text-neutral-400 mb-12 border-b border-white/10 pb-8">
            <Calendar size={16} />
            <span>{selectedNews.date}</span>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            {selectedNews.imageUrl && (
              <img src={selectedNews.imageUrl} alt={selectedNews.title} className="w-full rounded-2xl mb-8" />
            )}
            <p className="whitespace-pre-line text-neutral-300 leading-relaxed text-lg">
              {selectedNews.content}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-24 px-6 min-h-screen z-10 relative bg-brand-black text-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4 text-brand-red">
            <Newspaper size={24} />
            <h2 className="font-bold tracking-widest text-sm">NEWS & NOTICE</h2>
          </div>
          <h1 className="text-3xl md:text-6xl font-black mb-6">사내 뉴스</h1>
          <p className="text-neutral-400 text-lg">창현의 최신 소식과 공지사항을 확인하세요.</p>
        </div>

        <div className="flex flex-col gap-4">
          {news.length === 0 ? (
            <div className="py-20 text-center text-neutral-500 border border-white/5 rounded-2xl">
              등록된 게시글이 없습니다.
            </div>
          ) : (
            news.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group cursor-pointer bg-white/5 hover:bg-white/10 border border-white/5 hover:border-brand-red/30 p-6 md:p-8 rounded-2xl transition-all"
                onClick={() => navigate(`/news/${item.id}`)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-brand-red transition-colors">{item.title}</h3>
                    <p className="text-neutral-400 line-clamp-2">{item.content}</p>
                  </div>
                  <div className="flex items-center gap-4 text-neutral-500 shrink-0">
                    <span className="flex items-center gap-2"><Calendar size={14} />{item.date}</span>
                    <ChevronRight className="opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all text-brand-red" />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
