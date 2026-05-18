import React, { useState, useEffect } from 'react';
import { useSite } from '../store/SiteContext';
import { Menu, X, ChevronRight, Phone, Mail, MapPin, Instagram, Youtube, ExternalLink, ArrowRight, Newspaper } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ProductDetail from './ProductDetail';
import ProductCategory from './ProductCategory';
import NewsBoard from './NewsBoard';

export default function Website({ path }: { path: string }) {
  const { settings, products, partners, news } = useSite();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'System' | 'Media' | 'Others'>('System');
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const [latestVideoEmbed, setLatestVideoEmbed] = useState<string>('');

  useEffect(() => {
    let active = true;
    const urlOrId = settings.youtubeVideoUrl;
    if (urlOrId && !urlOrId.startsWith('http') && urlOrId.startsWith('UC')) {
      fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${urlOrId}`)
        .then(res => res.json())
        .then(data => {
          if (active && data.status === 'ok' && data.items && data.items.length > 0) {
             const videoId = data.items[0].guid.split(':')[2];
             setLatestVideoEmbed(`https://www.youtube.com/embed/${videoId}`);
          }
        })
        .catch(console.error);
    } else if (urlOrId) {
      let embedUrl = urlOrId;
      try {
        if (urlOrId.includes('watch?v=')) {
          const videoId = new URL(urlOrId).searchParams.get('v');
          if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (urlOrId.includes('youtu.be/')) {
          const videoId = urlOrId.split('youtu.be/')[1].split('?')[0];
          if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
      } catch (e) {
        console.error('Invalid URL:', e);
      }
      setLatestVideoEmbed(embedUrl);
    } else {
      setLatestVideoEmbed('');
    }
    return () => { active = false; };
  }, [settings.youtubeVideoUrl]);

  useEffect(() => {
    const dismissedUntil = localStorage.getItem('popupDismissed_v2');
    const isDismissed = dismissedUntil && new Date().getTime() < parseInt(dismissedUntil, 10);
    
    if (path === '/' && settings.popupBannerEnabled && !isDismissed) {
      const timer = setTimeout(() => setShowPromoPopup(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowPromoPopup(false);
    }
  }, [path, settings.popupBannerEnabled]);

  const handleClosePopup = () => {
    setShowPromoPopup(false);
  };

  const handleClosePopupToday = () => {
    setShowPromoPopup(false);
    const tomorrow = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem('popupDismissed_v2', tomorrow.toString());
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (href: string) => {
    window.history.pushState({}, '', href);
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white py-4 shadow-md' : 'bg-white py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-brand-black">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <img 
                src={settings.logo} 
                alt={settings.companyName} 
                className="h-10 w-auto object-contain" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div className="hidden md:flex items-center gap-3 border-l border-neutral-200 pl-6">
              <SocialLink icon={<Instagram size={18} />} href="#" header />
              <SocialLink icon={<Youtube size={18} />} href="https://www.youtube.com/@changhyun-biz" header />
              <button 
                onClick={() => navigate('/news')}
                className="p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-brand-black rounded-full transition-colors flex items-center justify-center"
                title="사내 뉴스"
              >
                <Newspaper size={18} />
              </button>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink onClick={() => navigate('/about')} header>COMPANY</NavLink>
            <NavLink onClick={() => navigate('/products')} header>PRODUCTS</NavLink>
            <NavLink onClick={() => navigate('/contact')} header>CONTACT</NavLink>
            <button 
              onClick={() => window.location.href = '/admin'}
              className="ml-4 p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-400 hover:text-brand-red"
              title="Admin Dashboard"
            >
              <ExternalLink size={18} />
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-brand-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-brand-black flex flex-col items-center justify-center gap-8"
          >
            <NavLink onClick={() => navigate('/about')} mobile>COMPANY</NavLink>
            <NavLink onClick={() => navigate('/products')} mobile>PRODUCTS</NavLink>
            <NavLink onClick={() => navigate('/contact')} mobile>CONTACT</NavLink>
            <button onClick={() => window.location.href = '/admin'} className="text-neutral-500 mt-8">Admin Dashboard</button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={path !== '/' ? 'pt-24 min-h-screen' : ''}>
      {/* Hero Section */}
      {path === '/' && (
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-image.png" 
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2071";
            }}
            alt="Large Format Printer" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/20 via-brand-black/60 to-brand-black" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-bold tracking-widest rounded-full mb-6">
              INNOVATIVE PRINTING SOLUTIONS
            </span>
            <h1 className="text-3xl md:text-8xl font-black tracking-tighter leading-none mb-6 whitespace-pre-line">
              {settings.heroTitle}
            </h1>
            <p className="text-sm md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 font-light">
              {settings.heroSubtitle}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/products')}
                className="group relative px-8 py-4 bg-brand-red text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  제품 보러가기 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-full transition-all"
              >
                회사 소개
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-500"
        >
          <div className="w-6 h-10 border-2 border-neutral-700 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-neutral-500 rounded-full" />
          </div>
        </motion.div>
      </section>
      )}

      {/* YouTube Video Section */}
      {path === '/' && (
      <section className="py-24 bg-brand-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-brand-red font-bold tracking-widest text-xs md:text-sm mb-4">LATEST VIDEO</h2>
            <h3 className="text-2xl md:text-5xl font-black text-white">CHANGHYUN YOUTUBE</h3>
            <p className="text-neutral-400 text-sm md:text-base mt-4 max-w-2xl mx-auto">
              유튜브 채널에서 가장 최근에 업로드된 영상을 확인해보세요.
            </p>
          </div>
          <div className="aspect-video w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-neutral-900">
            {latestVideoEmbed ? (
              <iframe 
                width="100%" 
                height="100%" 
                src={latestVideoEmbed} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-500">
                영상을 불러오는 중입니다...
              </div>
            )}
          </div>
          <div className="mt-8 text-center flex flex-col items-center gap-2">
            <p className="text-xs md:text-sm text-neutral-500 bg-white/5 inline-block px-6 py-3 rounded-xl">
              💡 <strong>유튜브 영상 반영 안내:</strong> 최신 영상으로 업데이트 되었습니다. (THE FIRST & THE BEST, 창현)
            </p>
          </div>
        </div>
      </section>
      )}

      {/* Company Sub Navigation */}
      {(path === '/about' || path === '/partners') && (
        <div className="bg-neutral-900 border-b border-white/10 pt-8">
          <div className="max-w-7xl mx-auto px-6 flex gap-8">
            <button 
              onClick={() => navigate('/about')} 
              className={`pb-4 font-bold transition-colors ${path === '/about' ? 'text-brand-red border-b-2 border-brand-red' : 'text-neutral-500 hover:text-white'}`}
            >
              회사 소개
            </button>
            <button 
              onClick={() => navigate('/partners')} 
              className={`pb-4 font-bold transition-colors ${path === '/partners' ? 'text-brand-red border-b-2 border-brand-red' : 'text-neutral-500 hover:text-white'}`}
            >
              파트너
            </button>
          </div>
        </div>
      )}

      {/* About Section */}
      {(path === '/about') && (
      <section id="about" className="py-24 md:py-40 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-brand-red font-bold tracking-widest text-xs md:text-sm mb-4">ABOUT US</h2>
            <h3 className="text-2xl md:text-5xl font-black mb-4 leading-tight whitespace-pre-line">
              {settings.aboutTitle}
            </h3>
            {settings.aboutSubtitle && (
              <h4 className="text-lg md:text-3xl font-bold text-neutral-300 mb-8">
                {settings.aboutSubtitle}
              </h4>
            )}
            <p className="text-neutral-400 text-sm md:text-lg leading-relaxed mb-10">
              {settings.aboutVision}
            </p>
            <div className="grid grid-cols-2 gap-8">
              <StatItem number="30+" label="Years Experience" />
              <StatItem number="50+" label="Global Partners" />
              <StatItem number="2000+" label="BUSINESS PARTNER" />
              <StatItem number="99%" label="Customer Satisfaction" />
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-3xl overflow-hidden"
          >
            <img 
              src={settings.aboutImage} 
              alt="About Us" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-brand-red/10 mix-blend-overlay" />
          </motion.div>
        </div>
      </section>
      )}

      {/* Partners Section */}
      {(path === '/partners') && (
      <section id="partners" className="py-24 md:py-40 px-6 bg-white text-brand-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-brand-red font-bold tracking-widest text-xs md:text-sm mb-4">OUR PARTNERS</h2>
            <h3 className="text-2xl md:text-5xl font-black mb-4 md:mb-6 text-brand-black">글로벌 파트너십</h3>
            <p className="text-neutral-600 text-sm md:text-lg max-w-2xl mx-auto">
              창현은 세계 최고의 디지털 프린팅 장비 및 소재 기업들과 협력하여<br />
              고객에게 최상의 솔루션을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((partner, idx) => (
              <motion.div 
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 flex items-center justify-center aspect-video hover:bg-white hover:shadow-xl hover:border-transparent transition-all duration-300 group cursor-pointer"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-w-full max-h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Product Category Route */}
      {path.startsWith('/products/') && ['system', 'media', 'others'].includes(path.split('/')[2]) && (
        <ProductCategory category={
          path.split('/')[2] === 'system' ? 'System' : 
          path.split('/')[2] === 'media' ? 'Media' : 'Others'
        } />
      )}

      {/* Product Detail Route */}
      {path.startsWith('/products/') && !['system', 'media', 'others'].includes(path.split('/')[2]) && (
        <ProductDetail productId={path.split('/')[2]} />
      )}

      {/* News Route */}
      {path.startsWith('/news') && (
        <NewsBoard path={path} navigate={navigate} />
      )}

      {/* Products Section */}
      {(path === '/products') && (
      <section id="products" className="py-24 md:py-32 bg-brand-dark-gray/50 min-h-screen flex flex-col">
        {/* Hero Intro */}
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center min-h-[50vh] mb-16">
          {/* Categories at the top */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-16">
            {(['System', 'Media', 'Others'] as const).map(cat => (
              <button 
                key={cat}
                onMouseEnter={() => setActiveCategory(cat)}
                onClick={() => {
                  window.history.pushState({}, '', `/products/${cat.toLowerCase()}`);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className={`text-base md:text-2xl font-black transition-all duration-300 pb-2 border-b-2 ${
                  activeCategory === cat 
                    ? 'text-brand-red border-brand-red' 
                    : 'text-neutral-600 border-transparent hover:text-neutral-300'
                }`}
              >
                {cat === 'System' ? 'SYSTEM' : cat === 'Media' ? 'MEDIA' : 'OTHERS'}
              </button>
            ))}
          </div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-brand-red font-bold tracking-widest text-xs md:text-sm mb-4 md:mb-6">OUR PRODUCTS</h2>
            <h3 className="text-2xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-8 leading-tight">
              {activeCategory === 'System' ? 'PREMIUM SYSTEMS' : activeCategory === 'Media' ? 'HIGH-QUALITY MEDIA' : 'OTHERS'}
            </h3>
            <p className="text-neutral-400 text-sm md:text-xl leading-relaxed whitespace-pre-line mb-8 md:mb-12">
              {activeCategory === 'System' 
                ? "창현이 제안하는 최고의 디지털 프린팅 장비 라인업입니다.\n고객의 비즈니스 환경에 맞춘 최적의 장비로 압도적인 퀄리티와 생산성을 경험해 보세요." 
                : activeCategory === 'Media' 
                ? "고품질 출력을 위한 프리미엄 미디어 솔루션입니다.\n다양한 애플리케이션에 최적화된 소재로 완벽한 결과물을 완성하세요." 
                : "잉크 및 기타 부자재 라인업입니다.\n장비의 성능을 극대화하고 최상의 출력 품질을 안정적으로 유지하세요."}
            </p>

            <button 
              onClick={() => {
                window.history.pushState({}, '', `/products/${activeCategory.toLowerCase()}`);
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="px-8 py-4 bg-brand-red text-white font-bold rounded-full hover:bg-red-700 transition-colors inline-flex items-center gap-2"
            >
              {activeCategory} 제품 전체보기 <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>
      )}

      {/* Contact Section */}
      {(path === '/' || path === '/contact') && (
      <section id="contact" className="py-24 bg-brand-red">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col h-full justify-center">
            <div className="mb-8 md:mb-12">
              <h2 className="text-white/80 font-bold tracking-widest text-xs md:text-sm mb-2 md:mb-4">GET IN TOUCH</h2>
              <h3 className="text-2xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                귀사의 비즈니스에<br />혁신을 더하세요.
              </h3>
            </div>

            {/* 본사 */}
            <div className="mb-12">
              <h4 className="text-base md:text-lg font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>본사 (HEADQUARTERS)
              </h4>
              <div className="space-y-6">
                <ContactInfo icon={<Phone />} value={settings.contactPhone} />
                <ContactInfo icon={<Mail />} value={settings.contactEmail} />
                <ContactInfo icon={<MapPin />} value={settings.contactAddress} />
              </div>
            </div>

            {/* 지사 */}
            <div className="flex flex-col gap-6 pt-8 border-t border-white/20">
              <div>
                <h4 className="text-base md:text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>강서지사
                </h4>
                <div className="space-y-2">
                  <ContactInfoSmall icon={<MapPin size={16} />} value="경기도 시흥시 안현동 360-11 (수인로3077번길 14-3)" />
                </div>
              </div>
              <div>
                <h4 className="text-base md:text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>강북지사
                </h4>
                <div className="space-y-2">
                  <ContactInfoSmall icon={<MapPin size={16} />} value="경기도 고양시 덕양구 덕은동 60-11 (중앙로46번길 10)" />
                </div>
              </div>
              <div>
                <h4 className="text-base md:text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>영남지사
                </h4>
                <div className="space-y-2">
                  <ContactInfoSmall icon={<MapPin size={16} />} value="부산광역시 서구 대저로221번길 53 (대저1동 628-20)" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl sticky top-32">
            <h4 className="text-brand-black text-xl md:text-2xl font-bold mb-8">문의하기</h4>
            <form className="space-y-4">
              <input type="text" placeholder="성함 / 업체명" className="w-full px-6 py-4 bg-neutral-100 rounded-xl text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-red transition-all" />
              <input type="text" placeholder="지역 (예: 서울, 경기 등)" className="w-full px-6 py-4 bg-neutral-100 rounded-xl text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-red transition-all" />
              <input type="email" placeholder="이메일 주소" className="w-full px-6 py-4 bg-neutral-100 rounded-xl text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-red transition-all" />
              <textarea placeholder="문의 내용" rows={4} className="w-full px-6 py-4 bg-neutral-100 rounded-xl text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-red transition-all resize-none" />
              <button className="w-full py-4 bg-brand-red text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-brand-red/20">
                메시지 보내기
              </button>
            </form>
          </div>
        </div>
      </section>
      )}
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-3">
              <img 
                src={settings.logo} 
                alt={settings.companyName} 
                className="h-8 w-auto object-contain" 
                style={{ filter: settings.invertLogo ? 'invert(1) hue-rotate(180deg) brightness(1.2)' : 'brightness(0) invert(1)' }}
                referrerPolicy="no-referrer" 
              />
            </div>
            <p className="text-neutral-500 text-sm">© 2013 Changhyun Co., Ltd. All rights reserved.</p>
          </div>

          <div className="flex justify-center gap-8 text-sm font-medium text-neutral-400">
            <button className="hover:text-white transition-colors">이용약관</button>
            <button className="hover:text-white transition-colors">개인정보처리방침</button>
          </div>
        </div>
      </footer>

      {/* Promo Popup */}
      <AnimatePresence>
        {showPromoPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleClosePopup}
            />
            {(() => {
              const popupNews = settings.popupNewsId ? news.find(n => n.id === settings.popupNewsId) : null;
              
              if (popupNews) {
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative rounded-2xl shadow-2xl overflow-hidden max-w-sm w-full z-10 bg-brand-black border border-white/10"
                  >
                    <button
                      onClick={handleClosePopup}
                      className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors z-20"
                    >
                      <X size={18} />
                    </button>
                    
                    <div className="flex flex-col max-h-[85vh]">
                      {popupNews.imageUrl && (
                        <div className="w-full shrink-0 relative cursor-pointer" onClick={() => { handleClosePopup(); navigate(`/news/${popupNews.id}`); }}>
                          <img src={popupNews.imageUrl} alt={popupNews.title} className="w-full aspect-[4/3] object-cover" />
                        </div>
                      )}
                      <div className="p-6 md:p-8 overflow-y-auto w-full flex flex-col items-center text-center">
                        <div className="flex items-center justify-center gap-2 text-brand-red mb-3">
                          <Newspaper size={16} />
                          <span className="text-xs font-bold tracking-widest">사내 주요 뉴스</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-white mb-6 leading-tight">{popupNews.title}</h3>
                        
                        <div className="flex justify-center mt-2">
                          <button 
                            onClick={() => { handleClosePopup(); navigate(`/news/${popupNews.id}`); }}
                            className="bg-brand-red text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-red-700 transition-colors"
                          >
                            자세히 보기
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 p-2 flex justify-end border-t border-white/10 shrink-0">
                      <button 
                        onClick={handleClosePopupToday}
                        className="text-neutral-400 hover:text-white text-xs px-4 py-2 transition-colors font-medium rounded-full hover:bg-white/10"
                      >
                        오늘 하루 보지 않기
                      </button>
                    </div>
                  </motion.div>
                );
              }

              if (settings.popupBannerImageUrl) {
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative rounded-2xl shadow-2xl overflow-hidden max-w-sm w-full z-10 bg-transparent"
                  >
                    <button
                      onClick={handleClosePopup}
                      className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors z-10"
                    >
                      <X size={18} />
                    </button>
                    
                    {settings.popupBannerLinkUrl ? (
                      <a href={settings.popupBannerLinkUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full" onClick={() => setShowPromoPopup(false)}>
                        <img src={settings.popupBannerImageUrl} alt="Popup Banner" className="w-full h-auto max-h-[80vh] object-contain rounded-2xl bg-white" />
                      </a>
                    ) : (
                      <img src={settings.popupBannerImageUrl} alt="Popup Banner" className="w-full h-auto max-h-[80vh] object-contain rounded-2xl bg-white" />
                    )}
                    
                    <div className="absolute bottom-0 inset-x-0 bg-black/5 p-2 flex justify-end backdrop-blur-sm rounded-b-2xl">
                      <button 
                        onClick={handleClosePopupToday}
                        className="text-white text-xs px-3 py-1 bg-black/40 hover:bg-black/60 rounded-full transition-colors"
                      >
                        오늘 하루 보지 않기
                      </button>
                    </div>
                  </motion.div>
                );
              }

              return null;
            })()}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavLink({ children, onClick, mobile, header }: { children: React.ReactNode, onClick: () => void, mobile?: boolean, header?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`font-bold tracking-widest transition-all hover:text-brand-red ${
        mobile ? 'text-3xl text-white' : header ? 'text-xs text-neutral-600' : 'text-xs text-neutral-400'
      }`}
    >
      {children}
    </button>
  );
}

function StatItem({ number, label }: { number: string, label: string }) {
  return (
    <div>
      <p className="text-2xl md:text-3xl font-black text-white mb-1">{number}</p>
      <p className="text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-widest">{label}</p>
    </div>
  );
}

function ContactInfo({ icon, value }: { icon: React.ReactNode, value: string }) {
  return (
    <div className="flex items-center gap-4 text-white">
      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-bold">{value}</p>
      </div>
    </div>
  );
}

function ContactInfoSmall({ icon, value }: { icon: React.ReactNode, value: string }) {
  return (
    <div className="flex items-start gap-3 text-white">
      <div className="mt-0.5 text-white/60 shrink-0">
        {icon}
      </div>
      <p className="text-sm font-medium leading-relaxed">{value}</p>
    </div>
  );
}

function SocialLink({ icon, href, header }: { icon: React.ReactNode, href: string, header?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${header ? 'bg-neutral-100 hover:bg-brand-red text-neutral-600 hover:text-white' : 'bg-white/5 hover:bg-brand-red text-neutral-400 hover:text-white'}`}>
      {icon}
    </a>
  );
}
