'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { X, Save, RotateCcw, Smile, User, Shirt, Sparkles } from 'lucide-react';
import { AvatarSVG } from './AvatarSVG';
import type { AvatarConfig } from '@/lib/avatar/types';
import { DEFAULT_AVATAR } from '@/lib/avatar/types';
import {
  SKIN_OPTIONS, HAIR_OPTIONS,
  OUTFIT_OPTIONS, ACC_OPTIONS, EFFECT_OPTIONS,
} from '@/lib/avatar/parts';
import { createClient } from '@/lib/supabase/client';
import { useAppStore } from '@/lib/store';

type Tab = 'skin' | 'hair' | 'outfit' | 'acc' | 'effect';

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'skin',   label: '피부', icon: Smile   },
  { id: 'hair',   label: '헤어', icon: User    },
  { id: 'outfit', label: '의상', icon: Shirt   },
  { id: 'acc',    label: '악세', icon: Sparkles },
  { id: 'effect', label: '효과', icon: Sparkles },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AvatarModal({ isOpen, onClose }: Props) {
  const { avatarConfig, setAvatarConfig } = useAppStore();
  const [cfg, setCfg]   = useState<AvatarConfig>(avatarConfig ?? DEFAULT_AVATAR);
  const [tab, setTab]   = useState<Tab>('skin');
  const [saving, setSaving] = useState(false);

  const update = useCallback((patch: Partial<AvatarConfig>) => {
    setCfg(prev => ({ ...prev, ...patch }));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 로그인 없어도 로컬 스토어에 반영 (데모용)
    setAvatarConfig(cfg);

    if (user) {
      const { error } = await supabase
        .from('nowedding_avatars')
        .upsert({
          user_id:   user.id,
          gender:    cfg.gender,
          skin_id:   cfg.skinId,
          hair_id:   cfg.hairId,
          outfit_id: cfg.outfitId,
          acc_id:    cfg.accId,
          effect_id: cfg.effectId,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

      if (error) toast.error(`저장 실패: ${error.message}`);
      else toast.success('아바타가 저장되었습니다! ✨');
    } else {
      toast.success('아바타가 적용되었습니다! (미로그인 임시 적용)');
    }

    setSaving(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.92,  y: 40 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-3xl bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-2xl border border-rose-100 overflow-hidden">

              {/* 헤더 */}
              <div className="flex items-center justify-between px-8 pt-7 pb-4 border-b border-muted/20">
                <div>
                  <h2 className="text-xl font-bold text-primary">아바타 꾸미기</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">나만의 웨딩 캐릭터를 만들어보세요</p>
                </div>
                <button
                  onClick={onClose}
                  className="h-9 w-9 rounded-full border border-muted/30 flex items-center justify-center text-muted-foreground hover:bg-rose-50 hover:text-rose-500 transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* 바디 */}
              <div className="grid grid-cols-[200px_1fr] gap-0 max-h-[75vh] overflow-hidden">

                {/* 좌측: 미리보기 */}
                <div className="flex flex-col items-center gap-4 px-6 py-6 border-r border-muted/20 bg-gradient-to-b from-rose-50/40 to-purple-50/30">
                  {/* 캐릭터 카드 */}
                  <div className="relative w-[148px] h-[208px] rounded-[28px] bg-white border border-rose-100 shadow-xl flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-rose-50/40 to-purple-50/20 pointer-events-none" />
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={JSON.stringify(cfg)}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1,   opacity: 1 }}
                        exit={{   scale: 0.8,  opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <AvatarSVG config={cfg} size={130} />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* 성별 */}
                  <div className="flex gap-2">
                    {(['female', 'male'] as const).map(g => (
                      <button
                        key={g}
                        onClick={() => update({ gender: g })}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                          cfg.gender === g
                            ? 'bg-rose-400 text-white border-rose-400 shadow-md'
                            : 'bg-white text-muted-foreground border-muted/30 hover:border-rose-300'
                        }`}
                      >
                        {g === 'female' ? '👩 여성' : '👨 남성'}
                      </button>
                    ))}
                  </div>

                  {/* 초기화 */}
                  <button
                    onClick={() => setCfg(DEFAULT_AVATAR)}
                    className="text-[11px] text-muted-foreground flex items-center gap-1 hover:text-rose-400 transition-colors"
                  >
                    <RotateCcw className="h-3 w-3" /> 초기화
                  </button>

                  {/* 저장 */}
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full h-10 bg-gradient-to-r from-rose-400 to-purple-500 text-white rounded-full font-bold text-xs flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-60"
                  >
                    <Save className="h-3.5 w-3.5" />
                    {saving ? '저장 중...' : '저장 & 적용'}
                  </button>
                </div>

                {/* 우측: 파츠 선택 */}
                <div className="flex flex-col overflow-hidden">
                  {/* 탭 */}
                  <div className="flex gap-1.5 px-6 pt-5 pb-3 border-b border-muted/10 flex-wrap">
                    {TABS.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                          tab === t.id
                            ? 'bg-rose-400 text-white border-rose-400 shadow'
                            : 'bg-white text-muted-foreground border-muted/30 hover:border-rose-200'
                        }`}
                      >
                        <t.icon className="h-3 w-3" />
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {/* 파츠 그리드 */}
                  <div className="overflow-y-auto px-6 py-4 flex-1">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={tab}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{   opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="grid grid-cols-3 gap-2.5"
                      >
                        {tab === 'skin' && SKIN_OPTIONS.map(opt => (
                          <PartCard key={opt.id} label={opt.label} emoji={opt.emoji}
                            active={cfg.skinId === opt.id} onClick={() => update({ skinId: opt.id })} color={opt.color} />
                        ))}
                        {tab === 'hair' && HAIR_OPTIONS.map(opt => (
                          <PartCard key={opt.id} label={opt.label} emoji={opt.emoji}
                            active={cfg.hairId === opt.id} onClick={() => update({ hairId: opt.id })} color={opt.color} />
                        ))}
                        {tab === 'outfit' && OUTFIT_OPTIONS.map(opt => (
                          <PartCard key={opt.id} label={opt.label} emoji={opt.emoji}
                            active={cfg.outfitId === opt.id} onClick={() => update({ outfitId: opt.id })} />
                        ))}
                        {tab === 'acc' && ACC_OPTIONS.map(opt => (
                          <PartCard key={opt.id} label={opt.label} emoji={opt.emoji}
                            active={cfg.accId === opt.id} onClick={() => update({ accId: opt.id })} />
                        ))}
                        {tab === 'effect' && EFFECT_OPTIONS.map(opt => (
                          <PartCard key={opt.id} label={opt.label} emoji={opt.emoji}
                            active={cfg.effectId === opt.id} onClick={() => update({ effectId: opt.id })} />
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── 파츠 카드 ─────────────────────────────────── */
function PartCard({
  label, emoji, active, onClick, color,
}: {
  label: string; emoji?: string; active: boolean;
  onClick: () => void; color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-2xl border-2 transition-all text-[11px] font-bold ${
        active
          ? 'border-rose-400 bg-rose-50 shadow-md scale-105 text-rose-500'
          : 'border-muted/30 bg-white text-muted-foreground hover:border-rose-200 hover:scale-[1.02]'
      }`}
    >
      {color ? (
        <div className="h-7 w-7 rounded-full border-2 border-white shadow" style={{ backgroundColor: color }} />
      ) : (
        <span className="text-xl">{emoji}</span>
      )}
      <span className="text-center leading-tight">{label}</span>
    </button>
  );
}
