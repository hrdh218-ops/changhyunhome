import React, { useState, useEffect } from 'react';
import { useSite } from '../store/SiteContext';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft } from 'lucide-react';

export default function ProductCategory({ category }: { category: 'System' | 'Media' | 'Others' }) {
  const { products } = useSite();
  const [activeBrand, setActiveBrand] = useState<'EPSON' | 'ROLAND' | 'JAEHYUN'>('EPSON');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('ALL');
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);

  useEffect(() => {
    setActiveSubCategory('ALL');
  }, [activeBrand]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const navigate = (href: string) => {
    window.history.pushState({}, '', href);
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  const categoryTitle = category === 'System' ? 'PREMIUM SYSTEMS' : category === 'Media' ? 'HIGH-QUALITY MEDIA' : 'OTHERS';
  const categoryDesc = category === 'System' 
    ? '(주)창현이 제안하는 세계 최고의 디지털 프린팅 장비 라인업입니다.' 
    : category === 'Media' 
    ? '고품질 출력을 위한 프리미엄 미디어 솔루션입니다.' 
    : '잉크 및 기타 부자재 라인업입니다.';

  return (
    <div className="pt-24 min-h-screen bg-brand-dark-gray">
      {/* Header */}
      <div className="bg-neutral-900 border-b border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate('/products')}
            className="flex items-center text-neutral-400 hover:text-white mb-8 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> 제품 홈으로 돌아가기
          </button>
          <h1 className="text-4xl md:text-5xl font-black mb-4">{categoryTitle}</h1>
          <p className="text-neutral-400 text-lg">{categoryDesc}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Filters (Only for System) */}
        {category === 'System' && (
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              {(['EPSON', 'ROLAND', 'JAEHYUN'] as const).map(brand => (
                <button 
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeBrand === brand 
                      ? 'bg-white text-brand-black shadow-lg' 
                      : 'bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {(activeBrand === 'EPSON' || activeBrand === 'ROLAND' 
                ? ['ALL', 'SOLVENT', 'UV', 'WATERBASE'] 
                : ['ALL', 'UV', '멀티컷팅기']).map(sub => (
                <button
                  key={sub}
                  onClick={() => setActiveSubCategory(sub)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    activeSubCategory === sub
                      ? 'bg-brand-red text-white shadow-lg'
                      : 'bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid / List */}
        <div className={category === 'Media' ? "flex flex-col gap-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}>
          <AnimatePresence mode="popLayout">
            {products
              .filter(p => p.category === category)
              .filter(p => {
                if (category !== 'System') return true;
                const name = p.name.toLowerCase();
                
                let brandMatch = false;
                if (activeBrand === 'EPSON') brandMatch = name.includes('epson') || name.includes('엡손');
                if (activeBrand === 'ROLAND') brandMatch = name.includes('roland') || name.includes('롤랜드');
                if (activeBrand === 'JAEHYUN') brandMatch = name.includes('재현') || name.includes('jaehyun');
                
                if (!brandMatch) return false;

                if (activeSubCategory === 'ALL') return true;
                if (activeSubCategory === 'SOLVENT') return p.inkType === 'Solvent';
                if (activeSubCategory === 'UV') return p.inkType === 'UV';
                if (activeSubCategory === 'WATERBASE') return p.inkType === 'Waterbase';
                if (activeSubCategory === '멀티컷팅기') return name.includes('컷팅기') || name.includes('커터') || name.includes('cutter') || name.includes('multi cut') || name.includes('멀티컷');

                return true;
              })
              .map((product) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`group glass-morphism overflow-hidden hover:border-brand-red/50 transition-all duration-500 ${
                  category === 'Media' 
                    ? 'rounded-2xl flex flex-col p-4' 
                    : 'rounded-3xl flex flex-col'
                }`}
              >
                {category === 'Media' ? (
                  <>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div 
                        className="w-full md:w-48 h-32 shrink-0 overflow-hidden bg-white/5 rounded-xl relative cursor-pointer group/img"
                        onClick={() => setExpandedProductId(expandedProductId === product.id ? null : product.id)}
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=2071';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs font-bold px-3 py-1.5 bg-brand-red rounded-full">
                            {expandedProductId === product.id ? '접기' : '더보기'}
                          </span>
                        </div>
                        {product.mediaType && (
                          <div className="absolute top-2 left-2">
                            <span className="px-2 py-0.5 bg-brand-black/80 backdrop-blur-md text-brand-red text-[10px] font-bold tracking-widest rounded-full uppercase">
                              {product.mediaType}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col flex-grow cursor-pointer" onClick={() => navigate(`/products/${product.id}`)}>
                        <h4 className="text-xl font-bold mb-2 group-hover:text-brand-red transition-colors">{product.name}</h4>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                      <div 
                        className="flex items-center gap-2 text-white font-bold text-sm group/btn shrink-0 md:px-4 mt-4 md:mt-0 cursor-pointer"
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        자세히 보기 <ArrowRight size={16} className="group-hover/btn:translate-x-1 text-brand-red transition-transform" />
                      </div>
                    </div>

                    {/* Expanded Images for Media */}
                    <AnimatePresence>
                      {expandedProductId === product.id && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="flex flex-row gap-4 overflow-x-auto pb-2 snap-x custom-scrollbar"
                        >
                          {[product.image, ...(product.gallery || [])].map((img, idx) => (
                            <img 
                              key={idx}
                              src={img}
                              alt={`${product.name} detail ${idx + 1}`}
                              className="h-32 w-48 shrink-0 rounded-xl object-contain bg-white/5 border border-white/10 snap-start"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <>
                    <div 
                      className="aspect-[4/3] overflow-hidden bg-white/5 relative cursor-pointer group/img"
                      onClick={() => setExpandedProductId(expandedProductId === product.id ? null : product.id)}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=2071';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold px-3 py-1.5 bg-brand-red rounded-full">
                          {expandedProductId === product.id ? '접기' : '더보기'}
                        </span>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-brand-black/80 backdrop-blur-md text-brand-red text-xs font-bold tracking-widest rounded-full uppercase">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow cursor-pointer" onClick={() => navigate(`/products/${product.id}`)}>
                      <h4 className="text-2xl font-bold mb-4 group-hover:text-brand-red transition-colors">{product.name}</h4>
                      <p className="text-neutral-400 text-sm leading-relaxed mb-8 flex-grow">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 text-white font-bold text-sm group/btn mt-auto w-fit">
                        자세히 보기 <ArrowRight size={16} className="group-hover/btn:translate-x-1 text-brand-red transition-transform" />
                      </div>
                    </div>

                    {/* Expanded Images for System */}
                    <AnimatePresence>
                      {expandedProductId === product.id && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex flex-row gap-4 px-8 pb-8 overflow-x-auto snap-x custom-scrollbar"
                        >
                          {[product.image, ...(product.gallery || [])].map((img, idx) => (
                            <img 
                              key={idx}
                              src={img}
                              alt={`${product.name} detail ${idx + 1}`}
                              className="h-40 w-56 shrink-0 rounded-xl object-contain bg-white/5 border border-white/10 snap-start"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
