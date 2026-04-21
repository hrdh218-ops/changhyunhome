import React, { useEffect } from 'react';
import { useSite } from '../store/SiteContext';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, Download, Settings, Shield, Zap, X } from 'lucide-react';

export default function ProductDetail({ productId }: { productId: string }) {
  const { products } = useSite();
  const product = products.find(p => p.id === productId);
  const [activeImage, setActiveImage] = React.useState<string>('');
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setActiveImage(product.image);
      setIsExpanded(false);
    }
  }, [product]);

  const navigate = (href: string) => {
    window.history.pushState({}, '', href);
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-bold mb-4">제품을 찾을 수 없습니다</h2>
        <p className="text-neutral-400 mb-8">요청하신 제품 정보가 존재하지 않거나 삭제되었습니다.</p>
        <button 
          onClick={() => navigate('/products')}
          className="px-8 py-4 bg-brand-red text-white font-bold rounded-full hover:bg-red-700 transition-colors"
        >
          제품 목록으로 돌아가기
        </button>
      </div>
    );
  }

  const getModelsForMedia = (mediaType?: string) => {
    switch (mediaType) {
      case 'PVC': return ['유광 캘지 (Glossy PVC)', '무광 캘지 (Matte PVC)', '그레이백 (Greyback PVC)', '투명 캘지 (Clear PVC)', '차량용 랩핑 필름'];
      case 'PET': return ['백릿 (Backlit PET)', '투명 PET (Clear PET)', '화이트 PET (White PET)'];
      case 'PP': return ['유광 합성지 (Glossy PP)', '무광 합성지 (Matte PP)', '점착/비점착 합성지'];
      case 'TEXTILE': return ['현수막천 (Banner)', '텐트천 (Tent)', '캔버스 (Canvas)', '메쉬 (Mesh)'];
      case 'FLEX': return ['조명용 플렉스 (Backlit)', '비조명용 플렉스 (Frontlit)', '솔리드 플렉스 (Blockout)'];
      default: return ['판매 중인 모델 문의'];
    }
  };

  const getInksForMedia = (mediaType?: string) => {
    switch (mediaType) {
      case 'PVC': return ['에코 솔벤트 (Eco-Solvent)', 'UV 잉크 (UV Curable)', '라텍스 (Latex)'];
      case 'PET': return ['UV 잉크 (UV Curable)', '에코 솔벤트 (Eco-Solvent)'];
      case 'PP': return ['에코 솔벤트 (Eco-Solvent)', '수성 잉크 (Water-based)'];
      case 'TEXTILE': return ['전사 잉크 (Sublimation)', '다이렉트 텍스타일 잉크'];
      case 'FLEX': return ['솔벤트 (Solvent)', 'UV 잉크 (UV Curable)'];
      default: return ['에코 솔벤트', 'UV 잉크'];
    }
  };

  if (product.category === 'Media') {
    return (
      <div className="pt-24 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold tracking-widest text-sm">BACK TO PRODUCTS</span>
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
              <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{product.name}</h1>
              <p className="text-xl text-neutral-300 leading-relaxed font-light break-keep">
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
                <h3 className="text-2xl md:text-3xl font-bold text-center">예시 시공 이미지</h3>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Models */}
                <div className="glass-morphism rounded-3xl p-8 md:p-10 border-t-4 border-t-brand-red">
                  <h4 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
                    <Settings className="text-brand-red" size={28} />
                    판매 중인 {product.mediaType} 모델
                  </h4>
                  <ul className="space-y-5">
                    {getModelsForMedia(product.mediaType).map((model, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-lg text-neutral-300">
                        <CheckCircle2 size={24} className="text-brand-red flex-shrink-0" />
                        {model}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ink Types */}
                <div className="glass-morphism rounded-3xl p-8 md:p-10 border-t-4 border-t-blue-500">
                  <h4 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
                    <Zap className="text-blue-500" size={28} />
                    호환 잉크 타입
                  </h4>
                  <ul className="space-y-5">
                    {getInksForMedia(product.mediaType).map((ink, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-lg text-neutral-300">
                        <CheckCircle2 size={24} className="text-blue-500 flex-shrink-0" />
                        {ink}
                      </li>
                    ))}
                  </ul>
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
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold tracking-widest text-sm">BACK TO PRODUCTS</span>
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
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">{product.name}</h1>
              <p className="text-xl text-neutral-400 leading-relaxed font-light">
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
              <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-full transition-colors flex items-center justify-center gap-2">
                <Download size={18} />
                브로셔 다운로드
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
            <h2 className="text-brand-red font-bold tracking-widest text-sm mb-4">KEY FEATURES</h2>
            <h3 className="text-3xl md:text-4xl font-black">주요 특장점</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(product.features || [
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
            <h3 className="text-2xl md:text-3xl font-black">제품 사양 (Specifications)</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
            {(product.specs || [
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
        </motion.div>
      </div>
    </div>
  );
}
