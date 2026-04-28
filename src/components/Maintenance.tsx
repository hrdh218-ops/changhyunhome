import React from 'react';
import { Wrench } from 'lucide-react';

export default function Maintenance() {
  return (
    <div className="min-h-screen bg-brand-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <div className="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center mb-8 border border-brand-red/20">
          <Wrench className="w-10 h-10 text-brand-red" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          홈페이지 <span className="text-brand-red">리뉴얼</span> 중입니다
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-400 mb-12">
          더 나은 서비스와 향상된 경험을 제공하기 위해 시스템 점검 및 업데이트를 진행하고 있습니다. <br className="hidden md:block" />
          빠른 시일 내에 새로운 모습으로 찾아뵙겠습니다.
        </p>
        
        <div className="bg-neutral-900 border border-white/10 rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">고객센터(문의)</h2>
          <div className="space-y-4 text-neutral-300">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <span className="text-neutral-500">전화번호</span>
              <span className="font-mono">(02) 2263 - 3781</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <span className="text-neutral-500">이메일</span>
              <span className="font-mono">hrdh218@naver.com</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500">운영시간</span>
              <span className="text-right">평일 09:00 - 18:00<br/><span className="text-sm text-neutral-500">(주말 및 공휴일 휴무)</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
