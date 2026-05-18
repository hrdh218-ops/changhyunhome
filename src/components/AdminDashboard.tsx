import React, { useState } from 'react';
import { useSite } from '../store/SiteContext';
import { Settings, Package, Palette, Save, Plus, Trash2, Edit2, X, Users, ArrowUp, ArrowDown, Image as ImageIcon, Newspaper } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminDashboard() {
  const { settings, updateSettings, products, addProduct, updateProduct, deleteProduct, moveProductUp, moveProductDown, partners, addPartner, updatePartner, deletePartner, news, addNews, updateNews, deleteNews } = useSite();
  const [activeTab, setActiveTab] = useState<'general' | 'products' | 'popup' | 'partners' | 'design' | 'news'>('general');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  React.useEffect(() => {
    if (sessionStorage.getItem('adminAuth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validUsername = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
    const validPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin';
    
    if (username === validUsername && password === validPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updates = Object.fromEntries(formData.entries());
    
    // Handle checkboxes (FormData only includes them if checked)
    if (formData.has('invertLogo')) updates.invertLogo = formData.get('invertLogo') === 'on' ? true : false as any;
    if (formData.has('popupBannerEnabled') || activeTab === 'popup') {
      updates.popupBannerEnabled = formData.get('popupBannerEnabled') === 'on' ? true : false as any;
    }
    
    updateSettings(updates as any);
    showToast('설정이 성공적으로 저장되었습니다.');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-neutral-900 border border-white/10 p-8 rounded-2xl">
          <h1 className="text-2xl font-bold text-white mb-6 text-center tracking-tight">관리자 로그인</h1>
          {loginError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-4 text-center">
              아이디 또는 비밀번호가 올바르지 않습니다.
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">아이디</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
                placeholder="아이디를 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors mt-2"
            >
              로그인
            </button>
          </form>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full mt-4 text-neutral-400 hover:text-white transition-colors text-sm underline"
          >
            사이트로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 md:p-8 relative">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg font-medium"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">관리자 대시보드</h1>
            <p className="text-neutral-400">웹사이트 콘텐츠 및 디자인을 실시간으로 관리하세요.</p>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors text-sm"
          >
            사이트로 돌아가기
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <nav className="flex flex-col gap-2">
            <TabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={<Settings size={18} />} label="일반 설정" />
            <TabButton active={activeTab === 'products'} onClick={() => setActiveTab('products')} icon={<Package size={18} />} label="제품 관리" />
            <TabButton active={activeTab === 'news'} onClick={() => setActiveTab('news')} icon={<Newspaper size={18} />} label="사내 뉴스 관리" />
            <TabButton active={activeTab === 'popup'} onClick={() => setActiveTab('popup')} icon={<ImageIcon size={18} />} label="팝업 배너 관리" />
            <TabButton active={activeTab === 'partners'} onClick={() => setActiveTab('partners')} icon={<Users size={18} />} label="파트너 관리" />
            <TabButton active={activeTab === 'design'} onClick={() => setActiveTab('design')} icon={<Palette size={18} />} label="디자인 커스터마이징" />
          </nav>

          {/* Main Content Area */}
          <main className="lg:col-span-3 glass-morphism rounded-2xl p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'general' && (
                <motion.div key="general" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Settings className="text-brand-red" /> 기본 정보 설정
                  </h2>
                  <form onSubmit={handleSaveSettings} className="space-y-4">
                    <InputField label="회사명" name="companyName" defaultValue={settings.companyName} />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                      <div className="md:col-span-3">
                        <InputField label="로고 이미지 URL" name="logo" defaultValue={settings.logo} />
                      </div>
                      <div className="flex items-center h-[52px] px-4 bg-neutral-800 border border-white/10 rounded-xl">
                        <label className="flex items-center gap-2 cursor-pointer w-full">
                          <input 
                            type="checkbox" 
                            name="invertLogo" 
                            defaultChecked={settings.invertLogo}
                            className="w-4 h-4 accent-brand-red cursor-pointer"
                          />
                          <span className="text-sm text-neutral-300">다크모드 로고 반전</span>
                        </label>
                      </div>
                    </div>
                    <InputField label="메인 타이틀" name="heroTitle" defaultValue={settings.heroTitle} isTextArea />
                    <InputField label="메인 서브타이틀" name="heroSubtitle" defaultValue={settings.heroSubtitle} isTextArea />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="연락처 이메일" name="contactEmail" defaultValue={settings.contactEmail} />
                      <InputField label="연락처 전화번호" name="contactPhone" defaultValue={settings.contactPhone} />
                    </div>
                    <InputField label="회사 주소" name="contactAddress" defaultValue={settings.contactAddress} />
                    
                    <div className="pt-6 mt-6 border-t border-white/10">
                      <h3 className="text-lg font-semibold mb-4 text-neutral-300">회사 소개 (About Us) 설정</h3>
                      <div className="space-y-4">
                        <InputField label="소개 타이틀" name="aboutTitle" defaultValue={settings.aboutTitle} isTextArea />
                        <InputField label="소개 내용 (Vision)" name="aboutVision" defaultValue={settings.aboutVision} isTextArea />
                        <InputField label="소개 이미지 URL" name="aboutImage" defaultValue={settings.aboutImage} />
                      </div>
                    </div>

                    <button type="submit" className="flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all ml-auto mt-6">
                      <Save size={18} /> 설정 저장하기
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'products' && (
                <motion.div key="products" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <Package className="text-brand-red" /> 제품 리스트 관리
                    </h2>
                    <button 
                      onClick={() => setEditingItem({ type: 'product', mode: 'add' })}
                      className="flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-all"
                    >
                      <Plus size={16} /> 새 제품 추가
                    </button>
                  </div>
                  <div className="space-y-3">
                    {products.map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between p-4 bg-neutral-900 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <img src={product.image} alt="" className="w-12 h-12 rounded object-cover" />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-xs text-neutral-500">{product.category}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex flex-col gap-1 mr-2 border-r border-white/10 pr-2">
                            <button 
                              onClick={() => moveProductUp(product.id)} 
                              disabled={index === 0}
                              className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                              title="위로 이동"
                            >
                              <ArrowUp size={14} />
                            </button>
                            <button 
                              onClick={() => moveProductDown(product.id)} 
                              disabled={index === products.length - 1}
                              className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                              title="아래로 이동"
                            >
                              <ArrowDown size={14} />
                            </button>
                          </div>
                          <button onClick={() => setEditingItem({ ...product, type: 'product', mode: 'edit' })} className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => deleteProduct(product.id)} className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-brand-red transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'popup' && (
                <motion.div key="popup" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <ImageIcon className="text-brand-red" /> 초기 접속 팝업 배너 관리
                  </h2>
                  <form onSubmit={handleSaveSettings} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium text-white/80">팝업 배너 사용</label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="popupBannerEnabled" defaultChecked={settings.popupBannerEnabled} className="sr-only peer" />
                        <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-red"></div>
                      </label>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">사내 뉴스글 연결 (선택)</label>
                        <select 
                          name="popupNewsId" 
                          defaultValue={settings.popupNewsId || ""}
                          className="w-full bg-neutral-900 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all appearance-none"
                        >
                          <option value="">직접 이미지 등록하기 (글 선택 안함)</option>
                          {news.map(n => (
                            <option key={n.id} value={n.id}>{n.title}</option>
                          ))}
                        </select>
                        <p className="text-xs text-neutral-400 mt-2">뉴스글을 선택하면 해당 뉴스글이 팝업으로 표시됩니다. 아래 URL 설정은 무시됩니다.</p>
                      </div>

                      <hr className="border-white/10 my-6" />

                      <InputField label="팝업 이미지 URL" name="popupBannerImageUrl" defaultValue={settings.popupBannerImageUrl} placeholder="/popup-banner.png 또는 https://..." />
                      <div className="text-xs text-neutral-400 -mt-2 mb-4">권장 이미지 비율은 1:1 또는 4:5이며, 고화질 이미지를 권장합니다.</div>
                      
                      <InputField label="배너 클릭 시 이동할 링크 URL" name="popupBannerLinkUrl" defaultValue={settings.popupBannerLinkUrl} placeholder="https://..." />
                    </div>

                    {!settings.popupNewsId && settings.popupBannerImageUrl && (
                      <div className="mt-4 p-4 border border-white/10 rounded-xl bg-neutral-900/50">
                        <p className="text-sm text-neutral-400 mb-2">현재 팝업 배너 미리보기</p>
                         <img src={settings.popupBannerImageUrl} alt="Popup Preview" className="max-w-[300px] max-h-[400px] object-cover rounded-lg shadow-xl" />
                      </div>
                    )}

                    <div className="pt-4 flex justify-end">
                      <button type="submit" className="bg-brand-red hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2">
                        <Save size={20} /> 설정 저장
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {activeTab === 'news' && (
                <motion.div key="news" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Newspaper className="text-brand-red" /> 사내 뉴스 관리
                  </h2>
                  <div className="flex justify-end mb-6">
                    <button 
                      onClick={() => setEditingItem({ type: 'news', id: 'new', title: '', date: new Date().toISOString().split('T')[0], content: '', imageUrl: '' })}
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2"
                    >
                      <Plus size={20} /> 새 뉴스글 추가
                    </button>
                  </div>
                  <div className="space-y-4">
                    {news.map((item) => (
                      <div key={item.id} className="bg-neutral-900 border border-white/5 p-6 rounded-xl flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          {item.imageUrl && (
                            <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded shadow-lg bg-white/10" />
                          )}
                          <div>
                            <h3 className="font-bold text-white text-lg">{item.title}</h3>
                            <p className="text-sm text-neutral-400 mt-1 mb-2 font-mono">{item.date}</p>
                            <p className="text-sm text-neutral-500 line-clamp-2">{item.content}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button 
                            onClick={() => setEditingItem({ type: 'news', ...item })}
                            className="p-2 text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => deleteNews(item.id)}
                            className="p-2 text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'partners' && (
                <motion.div key="partners" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <Users className="text-brand-red" /> 파트너 리스트 관리
                    </h2>
                    <button 
                      onClick={() => setEditingItem({ type: 'partner', mode: 'add' })}
                      className="flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-all"
                    >
                      <Plus size={16} /> 새 파트너 추가
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {partners.map(partner => (
                      <div key={partner.id} className="bg-neutral-900 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center relative group">
                        <div className="h-16 flex items-center justify-center mb-4">
                          <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <h3 className="font-medium text-center text-sm">{partner.name}</h3>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <button onClick={() => setEditingItem({ type: 'partner', mode: 'edit', data: partner })} className="p-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-md text-neutral-300">
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => deletePartner(partner.id)} className="p-1.5 bg-neutral-800 hover:bg-red-900/50 rounded-md text-brand-red">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'design' && (
                <motion.div key="design" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Palette className="text-brand-red" /> 테마 및 스타일 설정
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-neutral-400 mb-2">포인트 컬러 (Brand Red)</label>
                      <div className="flex items-center gap-4">
                        <input 
                          type="color" 
                          value={settings.pointColor} 
                          onChange={(e) => updateSettings({ pointColor: e.target.value })}
                          className="w-12 h-12 rounded cursor-pointer bg-transparent border-none"
                        />
                        <code className="bg-neutral-900 px-3 py-1 rounded text-sm">{settings.pointColor}</code>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-400 mb-2">폰트 스타일</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="p-4 bg-neutral-900 rounded-xl border-2 border-brand-red text-left">
                          <p className="font-bold">Inter + Noto Sans</p>
                          <p className="text-xs text-neutral-500">현대적이고 깔끔한 스타일 (기본)</p>
                        </button>
                        <button className="p-4 bg-neutral-900 rounded-xl border border-white/5 text-left opacity-50 cursor-not-allowed">
                          <p className="font-serif font-bold">Playfair Display</p>
                          <p className="text-xs text-neutral-500">우아하고 클래식한 스타일 (준비중)</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setEditingItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-neutral-900 rounded-2xl p-8 border border-white/10 shadow-2xl"
            >
              <button onClick={() => setEditingItem(null)} className="absolute top-4 right-4 text-neutral-500 hover:text-white">
                <X size={24} />
              </button>
              <h3 className="text-2xl font-bold mb-6">
                {editingItem.mode === 'add' ? '새 항목 추가' : '항목 수정'}
              </h3>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const data = Object.fromEntries(formData.entries());
                  
                  if (editingItem.type === 'product') {
                    const productData = { ...data } as any;
                    if (data.gallery) {
                      productData.gallery = (data.gallery as string).split(',').map(s => s.trim()).filter(Boolean);
                    } else {
                      productData.gallery = [];
                    }
                    
                    if (editingItem.mode === 'add') addProduct(productData);
                    else updateProduct(editingItem.id || editingItem.data?.id, productData);
                    showToast(editingItem.mode === 'add' ? '제품이 추가되었습니다.' : '제품이 수정되었습니다.');
                  } else if (editingItem.type === 'partner') {
                    if (editingItem.mode === 'add' || editingItem.id === 'new') addPartner(data as any);
                    else updatePartner(editingItem.id || editingItem.data?.id, data as any);
                    showToast(editingItem.mode === 'add' || editingItem.id === 'new' ? '파트너가 추가되었습니다.' : '파트너가 수정되었습니다.');
                  } else if (editingItem.type === 'news') {
                    if (editingItem.id === 'new') addNews(data as any);
                    else updateNews(editingItem.id, data as any);
                    showToast(editingItem.id === 'new' ? '사내 뉴스가 추가되었습니다.' : '사내 뉴스가 수정되었습니다.');
                  }
                  setEditingItem(null);
                }}
                className="space-y-4"
              >
                {editingItem.type === 'product' ? (
                  <>
                    <InputField label="제품명" name="name" defaultValue={editingItem.name || editingItem.data?.name} />
                    <div>
                      <label className="block text-sm text-neutral-400 mb-1">카테고리</label>
                      <select name="category" defaultValue={editingItem.category || editingItem.data?.category} className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red">
                        <option value="System">System (시스템)</option>
                        <option value="Media">Media (미디어)</option>
                        <option value="Ink">Ink (잉크)</option>
                      </select>
                    </div>
                    <InputField label="설명" name="description" defaultValue={editingItem.description || editingItem.data?.description} isTextArea />
                    <InputField label="메인 이미지 URL" name="image" defaultValue={editingItem.image || editingItem.data?.image} />
                    <InputField 
                      label="추가 이미지 (쉼표로 구분)" 
                      name="gallery" 
                      defaultValue={(editingItem.gallery || editingItem.data?.gallery || []).join(', ')} 
                      isTextArea 
                    />
                  </>
                ) : editingItem.type === 'news' ? (
                  <>
                    <InputField label="제목" name="title" defaultValue={editingItem.title} />
                    <InputField label="작성일 (YYYY.MM.DD 형식 권장, 현재날짜 기본값)" name="date" defaultValue={editingItem.date} />
                    <InputField label="내용" name="content" defaultValue={editingItem.content} isTextArea />
                    <ImageUploadField label="첨부 이미지 (선택)" name="imageUrl" defaultValue={editingItem.imageUrl} />
                  </>
                ) : (
                  <>
                    <InputField label="파트너명" name="name" defaultValue={editingItem.name || editingItem.data?.name} />
                    <InputField label="로고 이미지 URL" name="logo" defaultValue={editingItem.logo || editingItem.data?.logo} />
                    <InputField label="웹사이트 URL (선택)" name="url" defaultValue={editingItem.url || editingItem.data?.url} />
                  </>
                )}
                <button type="submit" className="w-full bg-brand-red hover:bg-red-700 text-white py-4 rounded-xl font-bold transition-all mt-4">
                  {editingItem.mode === 'add' ? '추가하기' : '저장하기'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
        active ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function ImageUploadField({ label, name, defaultValue }: { label: string, name: string, defaultValue?: string }) {
  const [preview, setPreview] = useState<string | null>(defaultValue || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block text-sm text-neutral-400 mb-1">{label}</label>
      <div className="flex flex-col gap-3">
        {preview && (
          <img src={preview} alt="Preview" className="w-full max-h-48 object-cover rounded-xl border border-white/10" />
        )}
        <input type="hidden" name={name} value={preview || ''} />
        <input 
          type="file" 
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer"
        />
        {preview && (
          <button type="button" onClick={() => setPreview(null)} className="text-sm text-red-400 text-left hover:text-red-300">
            이미지 삭제
          </button>
        )}
      </div>
    </div>
  );
}

function InputField({ label, name, defaultValue, isTextArea, type = 'text', placeholder }: { label: string, name: string, defaultValue?: string, isTextArea?: boolean, type?: string, placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm text-neutral-400 mb-1">{label}</label>
      {isTextArea ? (
        <textarea 
          name={name} 
          defaultValue={defaultValue}
          placeholder={placeholder}
          rows={3}
          className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red transition-all resize-none"
        />
      ) : (
        <input 
          type={type}
          name={name} 
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="w-full bg-neutral-800 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red transition-all"
        />
      )}
    </div>
  );
}
