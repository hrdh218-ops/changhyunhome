import React, { useEffect } from 'react';
import { useSite } from '../store/SiteContext';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, Download, Settings, Shield, Zap, X, Droplet, Leaf } from 'lucide-react';

export default function ProductDetail({ productId }: { productId: string }) {
  const { products } = useSite();
  const product = products.find(p => p.id === productId);
  const [activeImage, setActiveImage] = React.useState<string>('');
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [activeSubModel, setActiveSubModel] = React.useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setActiveImage(product.image);
      setIsExpanded(false);
      if (product.subModels && product.subModels.length > 0) {
        setActiveSubModel(product.subModels[0]);
      } else {
        setActiveSubModel(null);
      }
    }
  }, [product]);

  const currentDetails = product?.subModelDetails?.find(d => d.name === activeSubModel);

  const navigate = (href: string) => {
    window.history.pushState({}, '', href);
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  const goBack = () => {
    window.history.back();
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-bold mb-4">제품을 찾을 수 없습니다</h2>
        <p className="text-neutral-400 mb-8">요청하신 제품 정보가 존재하지 않거나 삭제되었습니다.</p>
        <button 
          onClick={goBack}
          className="px-8 py-4 bg-brand-red text-white font-bold rounded-full hover:bg-red-700 transition-colors"
        >
          제품 목록으로 돌아가기
        </button>
      </div>
    );
  }

  const getModelsForMedia = (mediaType?: string) => {
    switch (mediaType) {
      case 'PVC': return ['무광 PVC, B/O', '유광 PVC, B/O', '투명 PVC', '랩핑 PVC', 'LAMINATING 무광 / 유광 / 엠보'];
      case 'PET': return ['배너 PET', 'BACKLIT', '투명 PET\n투명 PET 점착'];
      case 'PP': return ['합성지', '합성지 B/O', 'B/O BANNER'];
      case 'TEXTILE': return ['현수막 / 텐트천 / 캔버스', '점착 (캔버스/현수막)', '프리컷 / 깃발천', 'TEXTILE BACKLIT'];
      case 'FLEX': return ['FLEX', 'BANNER, B/O', 'B/O MESH\nSTRIP MESH'];
      default: return ['판매 중인 모델 문의'];
    }
  };

  const getInksForMedia = (mediaType?: string, model?: string) => {
    if (mediaType === 'PVC') {
      if (model?.includes('LAMINATING')) {
        return [];
      }
      if (model?.includes('무광 PVC')) {
        return ['에코 솔벤트', 'UV 잉크', '수성 잉크', '라텍스'];
      }
      return ['에코 솔벤트', 'UV 잉크', '라텍스'];
    }

    if (mediaType === 'PET') {
      if (model === '배너 PET' || model === 'BACKLIT') {
        return ['에코 솔벤트', 'UV 잉크', '수성 잉크', '라텍스'];
      }
      return ['에코 솔벤트', 'UV 잉크', '라텍스'];
    }

    if (mediaType === 'PP') {
      if (model === 'B/O BANNER') {
        return ['수성 잉크'];
      }
      return ['에코 솔벤트', 'UV 잉크', '수성 잉크', '라텍스'];
    }

    if (mediaType === 'TEXTILE') {
      if (model === 'TEXTILE BACKLIT') {
        return ['에코 솔벤트', 'UV 잉크', '라텍스'];
      }
      if (model === '프리컷 / 깃발천') {
        return ['수성 잉크'];
      }
      return ['에코 솔벤트', 'UV 잉크', '수성 잉크', '라텍스'];
    }

    switch (mediaType) {
      case 'FLEX': return ['에코 솔벤트', 'UV 잉크', '라텍스'];
      default: return ['에코 솔벤트', 'UV 잉크'];
    }
  };

  if (product.category === 'Media') {
    return (
      <div className="pt-24 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <button 
            onClick={goBack}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold tracking-widest text-sm">BACK</span>
          </button>

          <div className="flex flex-col gap-24">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-block px-4 py-1.5 bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-bold tracking-widest rounded-full mb-6 uppercase">
                {product.mediaType} MEDIA
              </span>
              <h1 className="text-2xl md:text-6xl font-black mb-6 md:mb-8 leading-tight">{product.name}</h1>
              <p className="text-sm md:text-xl text-neutral-300 leading-relaxed font-light break-keep">
                {product.description}
              </p>
            </motion.div>

            {/* Installation Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="h-[1px] w-12 bg-brand-red"></div>
                <h3 className="text-lg md:text-3xl font-bold text-center">시공 이미지</h3>
                <div className="h-[1px] w-12 bg-brand-red"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[product.image, ...(product.gallery || [])].map((img, idx) => (
                  <div 
                    key={idx} 
                    className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 cursor-pointer"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img 
                      src={img}
                      alt={`${product.name} 시공 예시 ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.parentElement!.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 right-4 z-20 bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      클릭하여 크게 보기
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Models & Ink Types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-5xl mx-auto w-full"
            >
              <div className="glass-morphism rounded-3xl overflow-hidden border-t-4 border-t-brand-red">
                <div className="p-6 md:p-10">
                  <h4 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-white flex items-center gap-3">
                    <Settings className="text-brand-red" size={28} />
                    타입 및 호환잉크
                  </h4>
                  <div className="flex flex-col gap-4">
                    {getModelsForMedia(product.mediaType).map((model, idx) => {
                      const inks = getInksForMedia(product.mediaType, model);
                      return (
                        <div key={idx} className="flex flex-col md:flex-row border border-white/10 bg-white/[0.02] rounded-2xl overflow-hidden hover:bg-white/[0.04] transition-colors">
                          <div className="py-4 px-5 md:py-6 md:px-8 md:w-5/12 lg:w-1/3 bg-black/20 border-b border-white/10 md:border-b-0 md:border-r flex flex-col items-center justify-center text-center">
                            <span className="text-xs text-brand-red font-bold mb-1 md:hidden">타입</span>
                            <span className={`font-bold text-white leading-tight whitespace-pre-line ${model.length > 18 ? 'text-sm md:text-base lg:text-lg' : 'text-lg md:text-xl'}`}>{model}</span>
                          </div>
                          <div className="p-5 md:p-6 md:w-7/12 lg:w-2/3 flex flex-wrap gap-2 md:gap-4 items-center justify-center">
                            {inks.length === 0 && <span className="text-neutral-500 font-medium">-</span>}
                            {inks.map((inkString, iIdx) => {
                              const s = inkString.toLowerCase();
                              
                              if (s.includes('전사') || s.includes('텍스타일') || s.includes('sublimation')) {
                                return null; // The user requested to remove the '전사' (sublimation) icon completely
                              }

                              let icon = <Droplet className="text-neutral-400" size={16} />;
                              let bgColor = 'bg-white/5';
                              let borderColor = 'border-white/10';
                              let label = inkString;
                              
                              if (s.includes('수성')) {
                                icon = <Droplet size={16} className="text-blue-400" />;
                                bgColor = 'bg-blue-500/10';
                                borderColor = 'border-blue-500/30';
                                label = 'WATERBASE';
                              } else if (s.includes('솔벤트') || s.includes('solvent')) {
                                icon = <Droplet size={16} className="text-orange-400" />;
                                bgColor = 'bg-orange-500/10';
                                borderColor = 'border-orange-500/30';
                                label = 'ECO\nSOLVENT';
                              } else if (s.includes('uv')) {
                                icon = <Zap size={16} className="text-purple-400" />;
                                bgColor = 'bg-purple-500/10';
                                borderColor = 'border-purple-500/30';
                                label = 'UV';
                              } else if (s.includes('라텍스') || s.includes('latex')) {
                                icon = <Leaf size={16} className="text-green-400" />;
                                bgColor = 'bg-green-500/10';
                                borderColor = 'border-green-500/30';
                                label = 'LATEX';
                              }

                              return (
                                <div 
                                  key={iIdx} 
                                  className={`w-[60px] h-[60px] md:w-[84px] md:h-[84px] flex flex-col items-center justify-center gap-1 rounded-xl border ${bgColor} ${borderColor} hover:bg-white/10 transition-colors shrink-0`}
                                >
                                  {icon}
                                  <span className="text-[9px] md:text-[11px] leading-tight font-bold text-white whitespace-pre-line text-center">{label}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Image Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
                onClick={() => setSelectedImage(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center z-10"
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 md:-right-12 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors"
                >
                  <X size={24} />
                </button>
                <img 
                  src={selectedImage} 
                  alt="Enlarged view" 
                  className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={goBack}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold tracking-widest text-sm">BACK</span>
        </button>

        {/* Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="flex flex-col gap-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-8 flex items-center justify-center relative group cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src={activeImage || product.image} 
                alt={product.name} 
                className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 relative z-10"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=2071';
                }}
              />
              <div className="absolute bottom-4 right-4 z-20 bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                클릭하여 크게 보기
              </div>
            </motion.div>
            
            {/* Gallery Thumbnails */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
                <button 
                  onClick={() => setActiveImage(product.image)}
                  className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImage === product.image ? 'border-brand-red' : 'border-white/10 hover:border-white/30'} bg-white/5 p-2 snap-start`}
                >
                  <img src={product.image} alt="Main" className="w-full h-full object-contain" />
                </button>
                {product.gallery.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-brand-red' : 'border-white/10 hover:border-white/30'} bg-white/5 p-2 snap-start`}
                  >
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-bold tracking-widest rounded-full mb-6 uppercase">
                {product.category}
              </span>
              <h1 className="text-2xl md:text-6xl font-black mb-4 md:mb-6 leading-tight">{product.name}</h1>
              <p className="text-sm md:text-xl text-neutral-400 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="p-6 glass-morphism rounded-2xl">
                <Zap className="text-brand-red mb-4" size={24} />
                <h4 className="text-white font-bold mb-2">고성능 출력</h4>
                <p className="text-sm text-neutral-400">압도적인 속도와 품질</p>
              </div>
              <div className="p-6 glass-morphism rounded-2xl">
                <Shield className="text-brand-red mb-4" size={24} />
                <h4 className="text-white font-bold mb-2">내구성 보장</h4>
                <p className="text-sm text-neutral-400">오랜 기간 변함없는 품질</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-brand-red text-white font-bold rounded-full hover:bg-red-700 transition-colors text-center"
              >
                도입 문의하기
              </button>
            </div>
          </motion.div>
        </div>

        {/* Expanded Images */}
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex flex-col gap-8 mb-24 max-w-4xl mx-auto"
          >
            {[product.image, ...(product.gallery || [])].map((img, idx) => (
              <img 
                key={idx}
                src={img}
                alt={`${product.name} detail ${idx + 1}`}
                className="w-full rounded-3xl object-contain bg-white/5 border border-white/10"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            {product.subModels && product.subModels.length > 0 && (
              <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
                {product.subModels.map((modelName, idx) => {
                  const modelImg = idx === 0 ? product.image : (product.gallery?.[idx - 1] || product.image);
                  return (
                    <div key={modelName} className="flex flex-col items-center gap-4">
                      <button
                        onClick={() => setActiveSubModel(modelName)}
                        className={`px-6 py-3 rounded-full font-bold transition-colors shadow-lg ${
                          activeSubModel === modelName 
                            ? 'bg-brand-red text-white' 
                            : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/10'
                        }`}
                      >
                        {modelName}
                      </button>
                      <div 
                        className={`w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-white/5 border overflow-hidden flex items-center justify-center p-4 cursor-pointer transition-colors shadow-xl ${
                          activeSubModel === modelName ? 'border-brand-red' : 'border-white/10 hover:border-brand-red/50'
                        }`}
                        onClick={() => {
                          setActiveSubModel(modelName);
                          setActiveImage(modelImg);
                        }}
                      >
                        <img 
                          src={modelImg} 
                          alt={modelName} 
                          className="w-full h-full object-contain hover:scale-110 transition-transform duration-500" 
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=2071';
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <h2 className="text-brand-red font-bold tracking-widest text-sm mb-4">KEY FEATURES</h2>
            <h3 className="text-xl md:text-4xl font-black">주요 특장점</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(currentDetails?.features || product.features || [
              { title: '혁신적인 기술력', desc: '최신 프린트 헤드 기술을 적용하여 미세한 디테일까지 완벽하게 표현합니다.' },
              { title: '뛰어난 생산성', desc: '대량 작업에서도 속도 저하 없이 일관된 고품질 결과물을 제공합니다.' },
              { title: '친환경 솔루션', desc: '에너지 효율을 높이고 유해 물질 배출을 최소화한 친환경 설계가 적용되었습니다.' }
            ]).map((feature, idx) => (
              <div key={idx} className="p-8 glass-morphism rounded-3xl hover:border-brand-red/50 transition-colors">
                <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="text-brand-red" size={24} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{feature.title}</h4>
                <p className="text-neutral-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Specifications */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-morphism rounded-3xl p-8 md:p-12"
        >
          <div className="flex items-center gap-4 mb-12">
            <Settings className="text-brand-red" size={32} />
            <h3 className="text-lg md:text-3xl font-black">제품 사양 (Specifications) {activeSubModel && `- ${activeSubModel}`}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
            {(currentDetails?.specs || product.specs || [
              { label: '모델명', value: product.name },
              { label: '카테고리', value: product.category },
              { label: '최대 해상도', value: '2400 x 1200 dpi' },
              { label: '인쇄 속도', value: '최대 100 ㎡/h' },
              { label: '잉크 타입', value: '친환경 수성 / 에코솔벤트' },
              { label: '인터페이스', value: 'USB 3.0, Gigabit Ethernet' },
              { label: '크기 (W x D x H)', value: '2,800 x 800 x 1,200 mm' },
              { label: '무게', value: '약 150 kg' },
            ]).map((spec, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-white/10">
                <span className="text-neutral-400 font-medium mb-1 sm:mb-0">{spec.label}</span>
                <span className="text-white font-bold text-right">{spec.value}</span>
              </div>
            ))}
          </div>

          {product.notes && product.notes.length > 0 && (
            <div className="mt-8">
              <ul className="text-neutral-400 space-y-1.5">
                {product.notes.map((note, idx) => (
                  <li key={idx} className="text-sm flex items-start">
                    <span className="mr-1.5">-</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
