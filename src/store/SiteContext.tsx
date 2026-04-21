import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  category: 'System' | 'Media' | 'Others';
  inkType?: 'Solvent' | 'UV' | 'Waterbase';
  uvType?: 'Roll' | 'Flatbed';
  mediaType?: 'PVC' | 'PET' | 'PP' | 'TEXTILE' | 'FLEX';
  name: string;
  description: string;
  image: string;
  gallery?: string[];
  features?: { title: string; desc: string }[];
  specs?: { label: string; value: string }[];
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  url?: string;
}

export interface SiteSettings {
  companyName: string;
  logo: string;
  invertLogo: boolean;
  heroTitle: string;
  heroSubtitle: string;
  pointColor: string;
  aboutTitle: string;
  aboutVision: string;
  aboutImage: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  popupBannerEnabled: boolean;
  popupBannerImageUrl: string;
  popupBannerLinkUrl: string;
}

interface SiteContextType {
  products: Product[];
  partners: Partner[];
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  moveProductUp: (id: string) => void;
  moveProductDown: (id: string) => void;
  addPartner: (partner: Omit<Partner, 'id'>) => void;
  updatePartner: (id: string, partner: Partial<Partner>) => void;
  deletePartner: (id: string) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '17',
      category: 'System',
      inkType: 'Solvent',
      name: 'Epson SureColor SC-S8140',
      description: 'PrecisionCore TFP 프린트 헤드와 UltraChrome GS3 에코 솔벤트 잉크를 풀 가동하여 뛰어난 출력 품질과 신뢰성을 제공하는 사이니지용 대형 롤 프린터입니다.',
      image: '/products/s8140.png',
      features: [
        { title: '고해상도 정밀 프린트 헤드', desc: 'PrecisionCore TFP 프린트 헤드를 탑재하여 최대 1200x1200 dpi, 최소 4.4pl의 잉크 분사로 세밀한 색 표현이 가능합니다.' },
        { title: 'UltraChrome GS3 에코 솔벤트 잉크', desc: '1,500ml 대용량 잉크 시스템(C, M, Y, K, Lc, Lm)으로 선명한 화질과 생산성을 겸비했습니다.' },
        { title: '강력한 하드웨어 설계', desc: '최대 1,625.6mm(64인치) 폭, 45kg 롤 타겟팅과 4.3인치 컬러 터치스크린 등 탁월한 작업 편의성을 제공합니다.' }
      ],
      specs: [
        { label: '인쇄 방식', value: 'PrecisionCore TFP 프린트 헤드' },
        { label: '최대 해상도', value: '1,200 x 1,200 dpi' },
        { label: '노즐 구성', value: '총 9,600개 (컬러 당 1,600개 노즐)' },
        { label: '최소 잉크 분사 크기', value: '4.4pl' },
        { label: '잉크 유형', value: '엡손 UltraChrome GS3 에코 솔벤트 잉크' },
        { label: '색상 구성', value: 'C, M, Y, K, Lc, Lm (파우치 당 1,500ml)' },
        { label: '인쇄 영역', value: '300 mm ~ 1,625.6 mm' },
        { label: '미디어 처리 / 롤 사양', value: '두께 1mm 이하 / 외경 250mm / 최대 45kg' },
        { label: '디스플레이 탑재', value: '4.3인치 컬러 LCD 터치스크린' },
        { label: '인터페이스', value: 'Hi-Speed USB, 이더넷 1000BASE-T' },
        { label: '기본 메모리', value: '내장 메모리 4GB' },
        { label: '시스템 크기 (WxDxH)', value: '2,620 x 1,130 x 1,260 mm' },
        { label: '시스템 무게', value: '약 358 kg' },
        { label: '소비 전력', value: '사용 중 약 1,190 W' }
      ]
    },
    {
      id: '1',
      category: 'System',
      inkType: 'Solvent',
      name: 'Epson SureColor SC-S9140',
      description: '사용자 교체형 프린트 헤드와 11색 잉크 시스템을 탑재하여 압도적인 색 표현력과 유지보수 편의성을 제공하는 최신 64인치 에코솔벤트 프린터입니다.',
      image: '/products/s9140.png',
      features: [
        { title: '사용자 교체형 프린트 헤드', desc: '엔지니어 방문 없이 사용자가 직접 PrecisionCore MicroTFP 헤드를 교체할 수 있어 장비 다운타임을 획기적으로 줄여줍니다.' },
        { title: '11색 UltraChrome GS3 잉크', desc: '레드, 오렌지, 화이트를 포함한 11색 잉크 구성으로 기존 대비 더욱 넓은 색 영역과 생생한 색감을 구현합니다.' },
        { title: '컴팩트 & 로우 프로파일 디자인', desc: '기존 모델 대비 장비 높이를 낮추고 컴팩트하게 설계되어 작업자의 시야 확보 및 공간 활용도가 뛰어납니다.' }
      ],
      specs: [
        { label: '모델명', value: 'Epson SureColor SC-S9140' },
        { label: '최대 인쇄 폭', value: '64인치 (1,626mm)' },
        { label: '프린트 헤드', value: 'PrecisionCore MicroTFP (사용자 교체형)' },
        { label: '최대 해상도', value: '1,200 x 1,200 dpi' },
        { label: '잉크 타입', value: 'Epson UltraChrome GS3 에코솔벤트 잉크 (11색)' },
        { label: '인쇄 속도', value: '최대 100 ㎡/h (Draft 모드)' },
        { label: '크기 (W x D x H)', value: '2,620 x 1,004 x 1260 mm' },
        { label: '무게', value: '약 358 kg' }
      ]
    },
    {
      id: '8',
      category: 'System',
      inkType: 'Waterbase',
      name: 'Epson SureColor SC-P20540',
      description: '압도적인 인쇄 품질과 생산성을 자랑하는 64인치 대형 수성 포토 프린터입니다.',
      image: '/products/p20540.png',
    },
    {
      id: '14',
      category: 'System',
      inkType: 'UV',
      uvType: 'Flatbed',
      name: 'Epson SureColor SC-V4000',
      description: '생산성과 혁신이 결합된 10색 UV 평판 프린터로, 다양한 애플리케이션에 고품질 인쇄를 제공합니다.',
      image: '/products/v4000.png',
      features: [
        { title: '10색 UV 잉크 시스템', desc: 'Red, Gray, White, Varnish를 포함한 10색 잉크로 뛰어난 색 재현력과 특수 효과를 구현합니다.' },
        { title: '뛰어난 생산성', desc: '고성능 PrecisionCore 프린트 헤드를 탑재하여 빠른 속도로 고품질 출력이 가능합니다.' },
        { title: '다목적 활용', desc: '사이니지, 판촉물, 패키징 등 다양한 두께와 재질의 평판 소재에 직접 인쇄할 수 있습니다.' }
      ],
      specs: [
        { label: '모델명', value: 'Epson SureColor SC-V4000' },
        { label: '프린트 헤드', value: 'PrecisionCore 프린트 헤드' },
        { label: '잉크 타입', value: '10색 UV 잉크 (CMYK, Lc, Lm, Gray, Red, Wh, Varnish)' },
        { label: '최대 소재 두께', value: '약 80mm (3.14인치)' },
        { label: '특징', value: '이오나이저 내장, 멀티 존 진공 시스템' }
      ]
    },
    {
      id: '15',
      category: 'System',
      inkType: 'UV',
      uvType: 'Flatbed',
      name: 'Epson SureColor SC-V7000',
      description: '10색 UltraChrome UV 잉크와 8개의 PrecisionCore MicroTFP 프린트 헤드를 탑재하여 포토 수준의 압도적인 화질을 구현하는 엡손의 고성능 대형 평판(Flatbed) 프린터입니다.',
      image: '/products/v7000.png',
      features: [
        { title: '압도적인 10색 UV 잉크 시스템', desc: 'Bk, C, M, Y, Lc, Lm, Gy, R, Wh, Vr의 10색 잉크로 생생한 색감과 질감(Varnish) 표현을 지원합니다.' },
        { title: '대형 평판(Flatbed) 소재 지원', desc: '최대 2,500 x 1,250mm 크기, 80mm 두께, 50kg/㎡ 무게의 다양한 무점착, 평판 미디어를 안정적으로 처리합니다.' },
        { title: '정밀한 출력 시스템', desc: 'PrecisionCore MicroTFP 헤드를 8개 탑재하여 최대 720 x 1440 dpi의 고해상도 품질을 보장합니다.' }
      ],
      specs: [
        { label: '인쇄 방식', value: 'PrecisionCore MicroTFP x 8' },
        { label: '최대 해상도', value: '720 x 1440 dpi' },
        { label: '노즐 구성', value: '1,440 노즐 (360/컬러) *헤드 개당' },
        { label: '최소 잉크 분사 크기', value: '3.5 pl' },
        { label: '잉크 유형', value: 'Epson UltraChrome UV ink' },
        { label: '색상 구성', value: 'Bk, C, M, Y, Lc, Lm, Gy, R, Wh, Vr (색당 1,000ml)' },
        { label: '출력폭 (인쇄 가능 영역)', value: '최대 2,500 x 1,250 mm' },
        { label: '미디어 처리', value: '두께 최대 80mm / 무게 50kg/㎡' },
        { label: '시스템 크기 (WxDxH)', value: '4,635 x 2,768 x 1,730 mm' },
        { label: '시스템 무게', value: '약 1,370 kg' },
        { label: '동작 온도', value: '15 - 30℃ (20 - 32℃ 권장)' },
        { label: '소비 전력', value: '5.7 kVA' },
        { label: '정격 전압', value: 'AC 200, 208, 220, 230, 240V (50/60Hz, 29A)' }
      ]
    },
    {
      id: 'm1',
      category: 'Media',
      mediaType: 'PVC',
      name: 'PVC',
      description: '다양한 실내외 광고물에 널리 사용되는 범용적이고 내구성이 뛰어난 PVC 미디어입니다.',
      image: '/products/media/pvc/main.png',
      gallery: [
        '/products/media/pvc/1.png',
        '/products/media/pvc/2.png',
        '/products/media/pvc/3.png',
        '/products/media/pvc/4.png',
        '/products/media/pvc/5.png',
        '/products/media/pvc/6.png',
        '/products/media/pvc/7.png',
        '/products/media/pvc/8.png',
        '/products/media/pvc/9.png',
        '/products/media/pvc/10.png',
      ]
    },
    {
      id: 'm2',
      category: 'Media',
      mediaType: 'PET',
      name: 'PET',
      description: '투명도와 형태 안정성이 우수하여 백릿(Backlit) 및 디스플레이용으로 적합한 PET 미디어입니다.',
      image: '/products/media/pet/main.png',
      gallery: [
        '/products/media/pet/1.png',
        '/products/media/pet/2.png',
        '/products/media/pet/3.png',
        '/products/media/pet/4.png',
        '/products/media/pet/5.png',
        '/products/media/pet/6.png',
        '/products/media/pet/7.png',
        '/products/media/pet/8.png',
        '/products/media/pet/9.png',
        '/products/media/pet/10.png',
      ]
    },
    {
      id: '2',
      category: 'Media',
      mediaType: 'PP',
      name: 'PP (프리미엄 합성지)',
      description: '우수한 발색력과 내구성을 갖춘 고품질 합성지로, 실내외 다양한 배너 및 광고물에 적합합니다.',
      image: '/products/media/pp/main.png',
      gallery: [
        '/products/media/pp/1.png',
        '/products/media/pp/2.png',
        '/products/media/pp/3.png',
        '/products/media/pp/4.png',
        '/products/media/pp/5.png',
        '/products/media/pp/6.png',
        '/products/media/pp/7.png',
        '/products/media/pp/8.png',
        '/products/media/pp/9.png',
        '/products/media/pp/10.png',
      ]
    },
    {
      id: 'm4',
      category: 'Media',
      mediaType: 'TEXTILE',
      name: 'TEXTILE',
      description: '가볍고 부드러운 질감으로 현수막, 깃발, 인테리어 장식 등에 활용되는 텍스타일 미디어입니다.',
      image: '/products/media/textile/main.png',
      gallery: [
        '/products/media/textile/1.png',
        '/products/media/textile/2.png',
        '/products/media/textile/3.png',
        '/products/media/textile/4.png',
        '/products/media/textile/5.png',
        '/products/media/textile/6.png',
        '/products/media/textile/7.png',
        '/products/media/textile/8.png',
        '/products/media/textile/9.png',
        '/products/media/textile/10.png',
      ]
    },
    {
      id: 'm5',
      category: 'Media',
      mediaType: 'FLEX',
      name: 'FLEX',
      description: '뛰어난 인장 강도와 유연성을 자랑하며 대형 간판 및 야외 조명용으로 최적화된 플렉스 미디어입니다.',
      image: '/products/media/flex/main.png',
      gallery: [
        '/products/media/flex/1.png',
        '/products/media/flex/2.png',
        '/products/media/flex/3.png',
        '/products/media/flex/4.png',
        '/products/media/flex/5.png',
        '/products/media/flex/6.png',
        '/products/media/flex/7.png',
        '/products/media/flex/8.png',
        '/products/media/flex/9.png',
        '/products/media/flex/10.png',
      ]
    },
    {
      id: '3',
      category: 'Others',
      name: 'Epson UltraChrome GS3 Ink',
      description: '빠른 건조 시간과 탁월한 내광성을 제공하는 친환경 에코솔벤트 잉크입니다.',
      image: 'https://picsum.photos/seed/ink1/800/600',
    },
    {
      id: '4',
      category: 'System',
      inkType: 'Solvent',
      name: 'Roland DGXPRESS ER-642',
      description: '뛰어난 생산성, 높은 인쇄 품질 및 경쟁력 있는 가격을 제공하는 고성능 64인치 에코솔벤트 프린터입니다.',
      image: '/products/er642.png',
      features: [
        { title: '고속 및 고품질 인쇄', desc: '듀얼 스태거드 프린트 헤드와 향상된 Roland Intelligent Pass Control을 통해 고속 출력 시에도 밴딩을 최소화하고 매끄러운 품질을 유지합니다.' },
        { title: '새로운 D-EA2 잉크', desc: '고성능 에코솔벤트 잉크로 선명한 색상과 뛰어난 내구성을 제공하며 경제적인 인쇄가 가능합니다.' },
        { title: '최신 소프트웨어 지원', desc: '다기능 RIP Suite인 VersaWorks 7과 기기 상태를 모니터링하는 Roland DG Connect 앱을 지원하여 작업 효율성을 극대화합니다.' }
      ],
      specs: [
        { label: '모델명', value: 'Roland DGXPRESS ER-642' },
        { label: '최대 인쇄 폭', value: '64인치 (1,625mm)' },
        { label: '프린트 헤드', value: '듀얼 스태거드 피에조 잉크젯 헤드' },
        { label: '최대 해상도', value: '1,200 dpi' },
        { label: '잉크 타입', value: 'D-EA2 에코솔벤트 잉크' },
        { label: '소프트웨어', value: 'VersaWorks 7 RIP' },
        { label: '크기 (W x D x H)', value: '2,819 x 736 x 1,316 mm' },
        { label: '무게', value: '약 190 kg' }
      ]
    },
    {
      id: '5',
      category: 'System',
      inkType: 'UV',
      uvType: 'Roll',
      name: 'Roland TrueVIS LG-642',
      description: '새로운 차원의 시각적 효과를 제공하는 고생산성 64인치 UV-LED 프린터 및 커터입니다. 백색, 광택(Clear) 잉크를 활용한 특수 인쇄가 가능합니다.',
      image: '/products/lg642.png',
      features: [
        { title: '고해상도 UV-LED 인쇄', desc: '열에 민감한 소재에도 출력 가능한 저발열 UV-LED 램프와 고밀도 잉크로 선명한 품질을 제공합니다.' },
        { title: '통합 프린트 & 컷 기능', desc: '인쇄 후 윤곽선 커팅까지 한 번의 공정으로 처리하여 작업 시간을 단축하고 효율성을 극대화합니다.' },
        { title: '특수 효과 인쇄', desc: '클리어(광택) 잉크와 화이트 잉크를 사용하여 엠보싱, 바니시 등 다양한 질감과 텍스처를 표현할 수 있습니다.' }
      ],
      specs: [
        { label: '모델명', value: 'Roland TrueVIS LG-642' },
        { label: '최대 인쇄 폭', value: '64인치 (1,625mm)' },
        { label: '프린트 헤드', value: '스태거드 배열 피에조 잉크젯 헤드' },
        { label: '최대 해상도', value: '1,200 dpi' },
        { label: '잉크 타입', value: 'EUV5 UV-LED 잉크 (CMYK, Wh, Gl, Re, Or)' },
        { label: '커팅 속도', value: '최대 300 mm/s' },
        { label: '크기 (W x D x H)', value: '2,819 x 748 x 1,316 mm' },
        { label: '무게', value: '약 205 kg' }
      ]
    },
    {
      id: '6',
      category: 'System',
      inkType: 'UV',
      uvType: 'Roll',
      name: 'Roland DGXPRESS UG-642',
      description: '전 세계적으로 신뢰받는 브랜드가 구축한 믿을 수 있는 UV 프린트 & 커터 솔루션을 사용하여 다양한 인쇄 제품을 빠른 속도와 저렴한 비용으로 생산하세요.',
      image: '/products/ug642.png',
      features: [
        { title: '최고의 생산성', desc: '고성능 프린트 헤드와 최적화된 인쇄 기술로 다양한 인쇄물을 빠르고 효율적으로 생산할 수 있습니다.' },
        { title: '특수 효과를 통한 뛰어난 인쇄 효과', desc: '클리어(광택) 및 화이트 잉크를 활용하여 엠보싱, 바니시 등 독특한 질감과 프리미엄 특수 효과를 구현합니다.' },
        { title: '최신 소프트웨어 지원', desc: '다기능 RIP Suite인 VersaWorks 7과 기기 상태를 모니터링하는 Roland DG Connect 앱을 지원하여 작업 효율성을 극대화합니다.' }
      ],
      specs: [
        { label: '모델명', value: 'Roland DGXPRESS UG-642' },
        { label: '최대 인쇄 폭', value: '64인치 (1,625mm)' },
        { label: '프린트 헤드', value: '듀얼 스태거드 피에조 잉크젯 헤드' },
        { label: '최대 해상도', value: '1,200 dpi' },
        { label: '잉크 타입', value: '고성능 UV 잉크 (CMYK, Wh, Gl)' },
        { label: '소프트웨어', value: 'VersaWorks 7 RIP' },
        { label: '커팅 속도', value: '최대 300 mm/s' },
        { label: '크기 (W x D x H)', value: '2,819 x 736 x 1,316 mm' },
        { label: '무게', value: '약 195 kg' }
      ]
    },
    {
      id: '7',
      category: 'System',
      inkType: 'Waterbase',
      name: 'Roland DGXPRESS ER-642 (Waterbase)',
      description: '뛰어난 생산성, 높은 인쇄 품질 및 경쟁력 있는 가격을 제공하는 고성능 64인치 수성 프린터입니다.',
      image: '/products/er642.png',
      features: [
        { title: '고속 및 고품질 인쇄', desc: '듀얼 스태거드 프린트 헤드와 향상된 Roland Intelligent Pass Control을 통해 고속 출력 시에도 밴딩을 최소화하고 매끄러운 품질을 유지합니다.' },
        { title: '수성 잉크 시스템', desc: '친환경 수성 잉크를 적용하여 실내용 출력물에 적합하며 뛰어난 발색을 자랑합니다.' },
        { title: '최신 소프트웨어 지원', desc: '다기능 RIP Suite인 VersaWorks 7과 기기 상태를 모니터링하는 Roland DG Connect 앱을 지원하여 작업 효율성을 극대화합니다.' }
      ],
      specs: [
        { label: '모델명', value: 'Roland DGXPRESS ER-642 (Waterbase)' },
        { label: '최대 인쇄 폭', value: '64인치 (1,625mm)' },
        { label: '프린트 헤드', value: '듀얼 스태거드 피에조 잉크젯 헤드' },
        { label: '최대 해상도', value: '1,200 dpi' },
        { label: '잉크 타입', value: '수성 잉크' },
        { label: '소프트웨어', value: 'VersaWorks 7 RIP' },
        { label: '크기 (W x D x H)', value: '2,819 x 736 x 1,316 mm' },
        { label: '무게', value: '약 190 kg' }
      ]
    },
    {
      id: '11',
      category: 'System',
      inkType: 'UV',
      uvType: 'Roll',
      name: 'JAEHYUN XTRA R32 ECO',
      description: '뛰어난 내구성과 고품질 출력을 지원하는 3.2m 대형 UV 롤투롤 프린터입니다.',
      image: '/products/xtra-r32.png',
    },
    {
      id: '12',
      category: 'System',
      inkType: 'UV',
      uvType: 'Roll',
      name: 'JAEHYUN XTRA 3300S',
      description: '신개념 산업용 UV LED 롤투롤 프린터. 산업용 프린트 헤드를 탑재하여 압도적인 생산성을 제공하는 하이엔드 UV 롤투롤 장비입니다.',
      image: '/products/xtra-3300s.png',
      features: [
        { title: '리니어 모터 채용', desc: 'X축에 리니어 모터를 채용하여 빠르고 안정적으로 동작하며, 초정밀 메탈 엔코더와 스트립은 정확한 잉크 드롭 포지션을 지정해 줍니다.' },
        { title: '자동 높이 측정', desc: '두께가 다른 다양한 소재의 출력 높이를 자동으로 측정하여 최적화된 출력이 가능하도록 하며, 완벽한 출력 품질을 얻을 수 있습니다.' },
        { title: '멀티 포인트 플로팅 텐션', desc: '멀티 포인트 플로팅 텐션 시스템은 소재의 공급을 부드럽고 안정적으로 유지합니다.' },
        { title: '듀얼 AC 서보 모터', desc: '피딩 시스템에 적용된 듀얼 AC 서보 모터 및 이중 무브먼트 모드는 다양한 소재의 공급을 정확하고 원활하게 구현합니다.' },
        { title: '적외선 세이프 가드', desc: '적외선 세이프 가드는 테이크업 및 피딩 시스템의 장애물을 감지하여 위험으로부터 작업자를 보호합니다.' },
        { title: '대용량 소재 로딩', desc: '최대 360kg의 소재 로딩이 가능하며, 수직으로 구동되는 텐션 롤러는 소재의 장착과 교환이 쉽게 이루어집니다.' }
      ]
    },
    {
      id: '18',
      category: 'System',
      inkType: 'UV',
      uvType: 'Roll',
      name: 'JAEHYUN XTRA 3300H',
      description: '하이브리드 타입의 UV 프린터로 간단히 롤 출력 또는 평판 출력 모드를 바꿀 수 있는 최적의 제품입니다.',
      image: '/products/xtra-3300h.png',
      features: [
        { title: '하이브리드 시스템', desc: '하이브리드 타입의 UV 프린터로 간단히 롤 출력 또는 평판 출력 모드를 바꿀 수 있습니다. 하나의 장비로 두가지 역할을 원하시는 분들에게 최적입니다.' },
        { title: '리니어 모터 채용', desc: '마찰력과 에너지 손실이 적은 리니어 모터를 채용하여 소음이 적고 고속 정밀 출력이 가능합니다.' },
        { title: '충돌 방지 센서', desc: 'UV 램프 양 측면에 충돌 방지 센서를 장착하여 캐리지 이동 중 충격 감지 시 일시 정지하여 헤드를 보호합니다.' },
        { title: '자동 높이 측정', desc: '최대 5.1cm의 다양한 두께의 소재에 출력이 가능하며, 소재 높이를 자동 측정하는 시스템이 장착되어 있습니다.' },
        { title: '벨트 틀어짐 자동 조절', desc: '벨트 틀어짐 자동 조절 시스템은 소재의 틀어짐을 방지하며 출력 품질을 보장합니다.' },
        { title: '산업용 테이크업/피딩', desc: '산업용 테이크업 및 피딩시스템은 소재 로딩을 자유롭게 조절하며, 원단의 구겨짐을 방지합니다.' }
      ]
    },
    {
      id: '16',
      category: 'System',
      inkType: 'UV',
      uvType: 'Flatbed',
      name: 'JAEHYUN JU 시리즈',
      description: '산업용 환경에 최적화된 견고한 설계와 고속 출력을 지원하는 UV 평판 프린터 라인업입니다.',
      image: '/products/ju-series-1.png',
      gallery: ['/products/ju-series-2.png', '/products/ju-series-3.png'],
    },
    {
      id: '19',
      category: 'System',
      name: 'JAEHYUN MULTI CUT SG',
      description: '고속 정밀 커팅과 강력한 내구성을 자랑하는 차세대 플래그십 디지털 멀티 평판 커팅기입니다. 다양한 산업용 소재와 대량 생산에 특화된 최고급형 모델입니다.',
      image: '/products/multi-cut-sg.png',
      features: [
        { title: '압도적인 작업 속도', desc: '디지털 서보 모터와 직선 레일, 헬리컬 기어를 조합하여 최대 2,000mm/s의 이동 속도와 커팅 속도를 지원해 작업 시간을 획기적으로 단축합니다.' },
        { title: '첨단 센서 및 자동화 시스템', desc: 'CCD 카메라 마크 리딩, 원터치 커플러 툴 교체, 자동 툴 높이 측정을 비롯해 롤 공급 및 보드 자동 공급 장치(옵션)로 무인화 공정이 가능합니다.' },
        { title: '다양한 사이즈 라인업 및 컨베이어 결합', desc: '최소 1.6m부터 3.2m 폭까지 무한대 길이(컨베이어 시스템 탑재 시)를 커버하는 폭넓은 사이즈 라인업을 보장합니다.' }
      ],
      specs: [
        { label: '기준 모델명', value: 'SG-2516' },
        { label: '구동 시스템', value: '디지털 서보 모터, 헬리컬 기어, 직선 레일, 가이드 스크류' },
        { label: '이동 및 커팅 속도', value: '이동 및 커팅 최대 2,000mm/s' },
        { label: '최대 커팅 두께', value: '최대 50mm' },
        { label: '반복 정밀도', value: '±0.05 mm' },
        { label: '시스템 크기 및 무게', value: '2,570 x 3,380 x 1,415mm / 1,100kg (2516 기준)' },
        { label: '전기 사양 및 소비 전력', value: '380V 또는 220V±10% (50/60Hz) / 13kW' },
        { label: '통신 인터페이스', value: '이더넷 (Ethernet)' }
      ]
    },
    {
      id: '20',
      category: 'System',
      name: 'JAEHYUN MULTI CUT JP',
      description: '합리적인 가격과 고스펙을 동시에 만족시키는 다목적 전문가용 평판 커팅기입니다. 탁월한 공간 활용과 다양한 툴 지원으로 소규모부터 대형 장비까지 맞춤 세팅이 가능합니다.',
      image: '/products/multi-cut-jp.png',
      features: [
        { title: '폭넓은 다용도 툴 호환성', desc: '라우터, 진동, 반 커팅, 오시(크리싱 휠) 등 다양한 툴 슬롯을 제공해 폼, 보드, 원단, 아크릴 등 거의 모든 산업 소재를 제약 없이 가공합니다.' },
        { title: '안정적인 정밀 커팅', desc: '±0.05mm의 높은 반복 정밀도와 최대 1,200mm/s 커팅 속도, 컨베이어 및 분할 배큠 시스템(소재 강제 흡착)으로 흔들림 없는 칼날 품질을 완성합니다.' },
        { title: '스마트 제어', desc: '립(RIP) 소프트웨어 완벽 호환, 바코드/QR 리딩 시스템, 터치 스크린 LCD 조작, 커팅 경로 최적화 등으로 사용 편의성을 극대화했습니다.' }
      ],
      specs: [
        { label: '기준 모델명', value: 'JP-2516' },
        { label: '구동 시스템', value: '디지털 서보 모터, 직선 레일, 동기화 벨트, 가이드 스크류' },
        { label: '최대 커팅 영역', value: '1,600 x 2,500 mm (컨베이어 방식으로 길이 무한대)' },
        { label: '최대 커팅 두께', value: '최대 50 mm' },
        { label: '이동 및 커팅 속도', value: '이동 최대 1,500mm/s / 커팅 최대 1,200mm/s' },
        { label: '반복 정밀도', value: '±0.05 mm' },
        { label: '시스템 크기 (WxDxH)', value: '2,620 x 3,650 x 1,280 mm' },
        { label: '사용 인터페이스', value: '한글화 LCD 터치 스크린' },
        { label: '전기 사양 및 소비 전력', value: '380V 또는 220V±10% (50/60Hz) / 9.5 kW' }
      ]
    },
    {
      id: '21',
      category: 'System',
      name: 'JAEHYUN MULTI CUT JC',
      description: '일관된 절단 품질, 원활한 재료 처리 및 손쉬운 작동을 제공하도록 설계된 엔트리급 컨베이어 평판 커팅 솔루션입니다. 광고, 포장, 의류 등 다양한 산업 분야에 최적화되어 있습니다.',
      image: '/products/multi-cut-jc.png',
      features: [
        { title: '듀얼 툴 헤드 및 다목적 툴 지원', desc: '진동 툴, 로터리 툴, V컷, 반 커팅 등 다양한 툴을 교체·장착하여 연질/반경질 및 특수 원단 등 폭넓은 소재를 동시 작업할 수 있습니다.' },
        { title: '무한대 길이의 컨베이어 시스템', desc: '기계 후방 롤 공급 장치와 함께 컨베이어 벨트가 연동되어 길이가 긴 소재의 커팅 자동화를 안정적으로 구현합니다.' },
        { title: '스마트 & 안전 작업 환경', desc: 'CCD 카메라 마크 리딩, 자동 툴 높이 측정, 진공판 보정 시스템, QR/바코드 리딩 기능과 측면 안전 센서로 효율성과 안전을 모두 갖췄습니다.' }
      ],
      specs: [
        { label: '기준 모델명', value: 'JC-1625' },
        { label: '구동 시스템', value: '디지털 서보 모터, 직선 레일, 동기화 벨트, 가이드 스크류' },
        { label: '최대 커팅 영역', value: '1,600 x 2,500 mm (컨베이어 방식으로 길이 무한대)' },
        { label: '최대 소재 두께', value: '최대 50 mm (장착 툴에 따라 다름)' },
        { label: '이동 및 커팅 속도', value: '이동 최대 1,800mm/s / 커팅 최대 1,500mm/s' },
        { label: '반복 정밀도', value: '±0.1 mm' },
        { label: '시스템 크기 (WxDxH)', value: '2,650 x 3,800 x 1,280 mm' },
        { label: '사용 인터페이스', value: 'PC 및 한글화 LCD 터치 스크린' },
        { label: '전기 사양 및 소비 전력', value: '380V 또는 220V±10% (50/60Hz) / 9.5 kW' }
      ]
    },
  ]);

  const [partners, setPartners] = useState<Partner[]>([
    { id: '1', name: 'HP', logo: '/partner1.png' },
    { id: '2', name: 'Epson', logo: '/partner2.png' },
    { id: '3', name: 'Mimaki', logo: '/partner3.png' },
    { id: '4', name: 'Roland', logo: '/partner4.png' },
    { id: '5', name: 'Mutoh', logo: '/partner5.png' },
    { id: '6', name: 'DGI', logo: '/partner6.png' },
    { id: '7', name: 'Partner 7', logo: '/partner7.png' },
    { id: '8', name: 'Partner 8', logo: '/partner8.png' },
  ]);

  const [settings, setSettings] = useState<SiteSettings>({
    companyName: '(주)창현',
    logo: '/logo.png',
    invertLogo: false,
    heroTitle: 'DIGITAL PRINTING\nREVOLUTION',
    heroSubtitle: '최고의 기술력과 신뢰로 디지털 프린팅의 미래를 선도합니다.',
    pointColor: '#E11D48',
    aboutTitle: '창현, 디지털 프린팅의\n새로운 기준을 제시하다.',
    aboutVision: '(주)창현은 30년 이상의 업력을 바탕으로 실사출력 및 디지털 미디어 프린팅 시장에 최적화된 기계와 소재를 공급하고 있습니다. 우리는 단순한 판매를 넘어 고객의 비즈니스 성공을 위한 파트너로서 최선을 다합니다.',
    aboutImage: '/about.jpg',
    contactEmail: 'info@changhyun.com',
    contactPhone: '(02) 2263 - 3781',
    contactAddress: '경기도 구리시 교문동 669 (한다리길 10) (주)창현',
    popupBannerEnabled: false,
    popupBannerImageUrl: '',
    popupBannerLinkUrl: '',
  });

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    setProducts(prev => [...prev, { ...product, id: Date.now().toString() }]);
  };

  const updateProduct = (id: string, product: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...product } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const moveProductUp = (id: string) => {
    setProducts(prev => {
      const index = prev.findIndex(p => p.id === id);
      if (index <= 0) return prev;
      const newProducts = [...prev];
      const temp = newProducts[index - 1];
      newProducts[index - 1] = newProducts[index];
      newProducts[index] = temp;
      return newProducts;
    });
  };

  const moveProductDown = (id: string) => {
    setProducts(prev => {
      const index = prev.findIndex(p => p.id === id);
      if (index === -1 || index >= prev.length - 1) return prev;
      const newProducts = [...prev];
      const temp = newProducts[index + 1];
      newProducts[index + 1] = newProducts[index];
      newProducts[index] = temp;
      return newProducts;
    });
  };

  const addPartner = (partner: Omit<Partner, 'id'>) => {
    setPartners(prev => [...prev, { ...partner, id: Date.now().toString() }]);
  };

  const updatePartner = (id: string, partner: Partial<Partner>) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, ...partner } : p));
  };

  const deletePartner = (id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
  };

  return (
    <SiteContext.Provider value={{
      products, partners, settings, updateSettings,
      addProduct, updateProduct, deleteProduct, moveProductUp, moveProductDown,
      addPartner, updatePartner, deletePartner
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within a SiteProvider');
  return context;
};
