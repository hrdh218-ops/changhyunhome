import React, { useState, useEffect } from 'react';
import { useSite } from '../store/SiteContext';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft } from 'lucide-react';

export default function ProductCategory({ category }: { category: 'System' | 'Media' | 'Others' }) {
  const { products } = useSite();
  const [activeBrand, setActiveBrand] = useState<'EPSON' | 'ROLAND' | 'OTHERS'>('EPSON');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('ALL');
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setActiveSubCategory(category === 'Others' ? '잉크' : 'ALL');
  }, [activeBrand, category]);

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
    ? '창현이 제안하는 세계 최고의 디지털 프린팅 장비 라인업입니다.' 
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
            className="flex items-center text-neutral-400 hover:text-white mb-8 transition-colors text-sm"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> 제품 홈으로 돌아가기
          </button>
          <h1 className="text-2xl md:text-5xl font-black mb-4">{categoryTitle}</h1>
          <p className="text-sm md:text-lg text-neutral-400">{categoryDesc}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Filters (Only for System) */}
        {category === 'System' && (
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
              {(['EPSON', 'ROLAND', 'OTHERS'] as const).map(brand => (
                <button 
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`px-3 py-1.5 md:px-6 md:py-2 rounded-full text-[11px] md:text-sm font-bold transition-all duration-300 ${
                    activeBrand === brand 
                      ? 'bg-white text-brand-black shadow-lg' 
                      : 'bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mt-2">
              {(activeBrand === 'EPSON' || activeBrand === 'ROLAND' 
                ? ['ALL', 'SOLVENT', 'UV', 'WATERBASE'] 
                : ['ALL', 'UV', '멀티컷팅기']).map(sub => (
                <button
                  key={sub}
                  onClick={() => setActiveSubCategory(sub)}
                  className={`px-2.5 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold transition-all duration-300 ${
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

        {/* Filters for Others */}
        {category === 'Others' && (
          <div className="flex flex-col items-center gap-4 mb-20 animate-fade-in">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {['잉크', '거치대', '부자재'].map(sub => (
                <button
                  key={sub}
                  onClick={() => setActiveSubCategory(sub)}
                  className={`px-3 py-1.5 md:px-8 md:py-3 rounded-full text-[11px] md:text-base font-bold transition-all duration-300 ${
                    activeSubCategory === sub
                      ? 'bg-brand-red text-white shadow-xl shadow-brand-red/20 scale-105'
                      : 'bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
            
            {/* Dynamic Content based on SubCategory */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSubCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center max-w-3xl mx-auto mt-8"
              >
                <h2 className="text-2xl md:text-5xl font-black mb-4 text-white">
                  {activeSubCategory === '잉크' && '잉크 (INK)'}
                  {activeSubCategory === '거치대' && '거치대 (STAND)'}
                  {activeSubCategory === '부자재' && '부자재 (SUBSIDIARY)'}
                </h2>
                <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
                  {activeSubCategory === '잉크' && '최상의 출력 품질을 보장하는 고품질 정품 잉크 라인업입니다.'}
                  {activeSubCategory === '거치대' && '다양한 환경에 맞춰 사용하는 실내외 배너 거치대입니다.'}
                  {activeSubCategory === '부자재' && '현수막 및 출력물 마감에 사용되는 다양한 필수 부자재입니다.'}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Featured Products Section for Media */}
        {category === 'Media' && (
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-brand-red font-bold tracking-widest text-xs md:text-sm mb-4">FEATURED</h2>
              <h3 className="text-2xl md:text-4xl font-black text-white">NEW & BEST</h3>
              <p className="text-neutral-400 text-sm md:text-base mt-3 max-w-2xl mx-auto">
                창현이 새롭게 제안하는 혁신적인 미디어와 가장 사랑받는 베스트셀러를 만나보세요.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
              {/* New Product 1: Magic Fabric */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => navigate('/products/magic-fabric')}
                className="group relative bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 cursor-pointer flex flex-col"
              >
                <div className="aspect-[16/9] w-full overflow-hidden relative bg-black/50">
                  <img 
                    src="/products/media/magic-fabric.png" 
                    alt="Magic Fabric" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 to-transparent"></div>
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <div className="bg-blue-600/90 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1 rounded-full tracking-wider shadow-lg flex items-center gap-1 border border-white/20">
                      <span className="w-1 h-1 rounded-full bg-white animate-pulse"></span>
                      NEW
                    </div>
                    <div className="bg-brand-red/90 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1 rounded-full tracking-wider shadow-lg flex items-center gap-1 border border-white/20">
                      <span className="w-1 h-1 rounded-full bg-white"></span>
                      BEST
                    </div>
                  </div>
                </div>
                <div className="p-5 md:p-6 flex-grow flex flex-col relative z-10 -mt-6">
                  <h4 className="text-xl md:text-2xl font-black text-white mb-2">Magic Fabric</h4>
                  <p className="text-neutral-400 leading-relaxed mb-4 flex-grow text-sm">
                    최대 3.2M 와이드까지 가능한 다양한 규격, 구김없는 텐션과 마법같은 선명한 발색을 경험하세요.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-blue-500 transition-colors mt-auto">
                    Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>

              {/* Best Product 2: Magic Cal Series */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                onClick={() => navigate('/products/magic-cal-series')}
                className="group relative bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 hover:border-brand-red/50 hover:shadow-2xl hover:shadow-brand-red/20 transition-all duration-500 cursor-pointer flex flex-col"
              >
                <div className="aspect-[16/9] w-full overflow-hidden relative bg-black/50 flex items-center justify-center">
                  <img 
                    src="/products/media/magic-cal-series.png" 
                    alt="Magic Cal Series" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 to-transparent"></div>
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                     <div className="bg-blue-600/90 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1 rounded-full tracking-wider shadow-lg flex items-center gap-1 border border-white/20">
                       <span className="w-1 h-1 rounded-full bg-white animate-pulse"></span>
                       NEW
                     </div>
                     <div className="bg-brand-red/90 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1 rounded-full tracking-wider shadow-lg flex items-center gap-1 border border-white/20">
                       <span className="w-1 h-1 rounded-full bg-white"></span>
                       BEST
                     </div>
                  </div>
                </div>
                <div className="p-5 md:p-6 flex-grow flex flex-col relative z-10 -mt-6">
                  <h4 className="text-xl md:text-2xl font-black text-white mb-2">Magic Cal Series</h4>
                  <p className="text-neutral-400 leading-relaxed mb-4 flex-grow text-sm">
                    라미네이팅 없이 완성하는 완벽한 실사출력 솔루션을 경험하세요.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-brand-red transition-colors mt-auto">
                    Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Product Grid / List */}
        <div className={
          category === 'Others' && activeSubCategory === '거치대' ? "grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto" :
          category === 'Others' ? "flex flex-wrap justify-center gap-6" :
          category === 'Media' ? "flex flex-col gap-4" : 
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        }>
          <AnimatePresence mode="popLayout">
            {products
              .filter(p => p.category === category)
              .filter(p => p.id !== 'magic-cal-series' && p.id !== 'magic-fabric')
              .filter(p => {
                const name = p.name.toLowerCase();
                const desc = p.description?.toLowerCase() || '';

                if (category === 'Others') {
                  if (activeSubCategory === '잉크') return p.otherType === 'Ink';
                  if (activeSubCategory === '거치대') return p.otherType === 'Stand';
                  if (activeSubCategory === '부자재') return p.otherType === 'Subsidiary';
                  return false;
                }

                if (category !== 'System') return true;
                
                let brandMatch = false;
                if (activeBrand === 'EPSON') brandMatch = name.includes('epson') || name.includes('엡손');
                if (activeBrand === 'ROLAND') brandMatch = name.includes('roland') || name.includes('롤랜드');
                if (activeBrand === 'OTHERS') brandMatch = !name.includes('epson') && !name.includes('엡손') && !name.includes('roland') && !name.includes('롤랜드');
                
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
                  category === 'Others' && activeSubCategory === '거치대'
                    ? 'rounded-3xl p-6 md:p-8 flex flex-col items-center w-full'
                    : category === 'Others'
                    ? 'w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] rounded-2xl p-4 flex flex-col items-center text-center'
                    : category === 'Media'
                    ? 'rounded-2xl flex flex-col p-4' 
                    : 'rounded-3xl flex flex-col'
                }`}
              >
                {category === 'Others' && activeSubCategory === '거치대' ? (
                  <div className="w-full flex flex-col items-center h-full">
                    <h3 className="text-lg md:text-2xl font-black mb-6 text-white text-center">{product.name}</h3>
                    <div className="flex flex-col gap-4 w-full flex-1">
                      <div 
                        className="relative rounded-2xl overflow-hidden aspect-square bg-white/5 w-full flex items-center justify-center p-4 cursor-pointer"
                        onClick={() => setSelectedImage(product.image)}
                      >
                        <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/opacity-0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                           <span className="opacity-0 group-hover:opacity-100 text-white font-bold bg-brand-red px-3 py-1 rounded-full text-xs transition-opacity duration-300">확대해서 보기</span>
                        </div>
                      </div>
                      {product.gallery && product.gallery.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 w-full">
                          {product.gallery.slice(0, 2).map((img, i) => (
                            <div 
                              key={i} 
                              className="relative rounded-xl overflow-hidden aspect-square bg-white/5 w-full flex items-center justify-center p-2 cursor-pointer group/sub"
                              onClick={() => setSelectedImage(img)}
                            >
                              <img src={img} alt={`${product.name} detail ${i}`} className="max-w-full max-h-full object-contain group-hover/sub:scale-110 transition-transform duration-500 delay-100" />
                              <div className="absolute inset-0 bg-black/opacity-0 group-hover/sub:bg-black/20 transition-all flex items-center justify-center">
                                 <span className="opacity-0 group-hover/sub:opacity-100 text-white font-bold bg-brand-red px-3 py-1 rounded-full text-xs transition-opacity duration-300">확대해서 보기</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : category === 'Others' ? (
                  <>
                    <div 
                      className="w-full relative rounded-xl overflow-hidden mb-4 aspect-square bg-white/5 flex items-center justify-center p-4 cursor-pointer group/img"
                      onClick={() => setSelectedImage(product.image)}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="max-w-full max-h-full object-contain drop-shadow-xl group-hover/img:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=2071';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/opacity-0 group-hover/img:bg-black/20 transition-all flex items-center justify-center">
                         <span className="opacity-0 group-hover/img:opacity-100 text-white font-bold bg-brand-red px-3 py-1 rounded-full text-xs transition-opacity duration-300">확대해서 보기</span>
                      </div>
                    </div>
                    <div className="shrink-0 w-full px-2">
                       <h4 className="text-xs md:text-base font-bold tracking-tight text-white group-hover:text-brand-red transition-colors line-clamp-2">{product.name}</h4>
                    </div>
                  </>
                ) : category === 'Media' ? (
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
                        {(product.mediaType || product.otherType) && (
                          <div className="absolute top-2 left-2">
                            <span className="px-2 py-0.5 bg-brand-black/80 backdrop-blur-md text-brand-red text-[10px] font-bold tracking-widest rounded-full uppercase">
                              {product.mediaType || product.otherType}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col flex-grow cursor-pointer" onClick={() => navigate(`/products/${product.id}`)}>
                        <h4 className="text-xl md:text-[1.35rem] tracking-tight leading-tight font-bold mb-2 group-hover:text-brand-red transition-colors">{product.name}</h4>
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
                      <h4 className="text-xl md:text-[1.35rem] font-bold mb-4 group-hover:text-brand-red transition-colors tracking-tight leading-tight">{product.name}</h4>
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

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-full object-contain rounded-xl"
              />
              <button 
                className="absolute top-0 right-0 m-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
