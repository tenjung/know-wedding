'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Save, RotateCcw, User, Shirt, Sparkles, Smile } from 'lucide-react';
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
  { id: 'skin',   label: '피부',   icon: Smile   },
  { id: 'hair',   label: '헤어',   icon: User    },
  { id: 'outfit', label: '의상',   icon: Shirt   },
  { id: 'acc',    label: '악세',   icon: Sparkles },
  { id: 'effect', label: '효과',   icon: Sparkles },
];

export default function AvatarPage() {
  const { avatarConfig, setAvatarConfig } = useAppStore();
  const [cfg, setCfg] = useState<AvatarConfig>(avatarConfig ?? DEFAULT_AVATAR);
  const [tab, setTab]     = useState<Tab>('skin');
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const update = useCallback((patch: Partial<AvatarConfig>) => {
    setCfg(prev => ({ ...prev, ...patch }));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { toast.error('로그인이 필요합니다.'); setSaving(false); return; }

    const { error } = await supabase
      .from('nowedding_avatars')          // public view → nowedding.avatars
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

    if (error) {
      toast.error(`저장 실패: ${error.message}`);
    } else {
      setAvatarConfig(cfg);
      toast.success('아바타가 저장되었습니다! ✨');
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6f9] via-[#f9f0ff] to-[#fdf6f9] flex flex-col items-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">
          아바타 꾸미기
        </h1>
        <p className="text-sm text-muted-foreground mt-1">나만의 웨딩 캐릭터를 만들어보세요</p>
      </motion.div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">

        {/* ── 좌측: 미리보기 ───────────────────────── */}
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* 캐릭터 미리보기 */}
          <div className="relative w-[220px] h-[308px] rounded-[40px] bg-white/60 backdrop-blur-xl border border-rose-100 shadow-2xl flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-rose-50/30 to-purple-50/30 pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.div
                key={JSON.stringify(cfg)}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.25, type: 'spring', stiffness: 300 }}
              >
                <AvatarSVG config={cfg} size={180} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 성별 선택 */}
          <div className="flex gap-3">
            {(['female', 'male'] as const).map(g => (
              <button
                key={g}
                onClick={() => update({ gender: g })}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all border-2 ${
                  cfg.gender === g
                    ? 'bg-rose-400 text-white border-rose-400 shadow-lg scale-105'
                    : 'bg-white/60 text-muted-foreground border-muted/30 hover:border-rose-300'
                }`}
              >
                {g === 'female' ? '👩 여성' : '👨 남성'}
              </button>
            ))}
          </div>

          {/* 저장 버튼 */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full max-w-[220px] h-12 bg-gradient-to-r from-rose-400 to-purple-500 text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? '저장 중...' : '아바타 저장'}
          </button>

          {/* 초기화 */}
          <button
            onClick={() => setCfg(DEFAULT_AVATAR)}
            className="text-xs text-muted-foreground flex items-center gap-1 hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="h-3 w-3" /> 초기화
          </button>
        </motion.div>

        {/* ── 우측: 파츠 선택 ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-4"
        >
          {/* 탭 */}
          <div className="flex gap-2 flex-wrap">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  tab === t.id
                    ? 'bg-rose-400 text-white border-rose-400 shadow-md'
                    : 'bg-white/60 text-muted-foreground border-muted/30 hover:border-rose-200'
                }`}
              >
                <t.icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            ))}
          </div>

          {/* 파츠 그리드 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-3 sm:grid-cols-4 gap-3"
            >
              {tab === 'skin' && SKIN_OPTIONS.map(opt => (
                <PartCard
                  key={opt.id}
                  label={opt.label}
                  emoji={opt.emoji}
                  active={cfg.skinId === opt.id}
                  onClick={() => update({ skinId: opt.id })}
                  color={opt.color}
                />
              ))}

              {tab === 'hair' && HAIR_OPTIONS.map(opt => (
                <PartCard
                  key={opt.id}
                  label={opt.label}
                  emoji={opt.emoji}
                  active={cfg.hairId === opt.id}
                  onClick={() => update({ hairId: opt.id })}
                  color={opt.color}
                />
              ))}

              {tab === 'outfit' && OUTFIT_OPTIONS.map(opt => (
                <PartCard
                  key={opt.id}
                  label={opt.label}
                  emoji={opt.emoji}
                  active={cfg.outfitId === opt.id}
                  onClick={() => update({ outfitId: opt.id })}
                />
              ))}

              {tab === 'acc' && ACC_OPTIONS.map(opt => (
                <PartCard
                  key={opt.id}
                  label={opt.label}
                  emoji={opt.emoji}
                  active={cfg.accId === opt.id}
                  onClick={() => update({ accId: opt.id })}
                />
              ))}

              {tab === 'effect' && EFFECT_OPTIONS.map(opt => (
                <PartCard
                  key={opt.id}
                  label={opt.label}
                  emoji={opt.emoji}
                  active={cfg.effectId === opt.id}
                  onClick={() => update({ effectId: opt.id })}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

/* ── 파츠 카드 ──────────────────────────────────── */
function PartCard({
  label, emoji, active, onClick, color,
}: {
  label: string; emoji?: string; active: boolean;
  onClick: () => void; color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border-2 transition-all text-xs font-bold ${
        active
          ? 'border-rose-400 bg-rose-50 shadow-lg scale-105 text-rose-600'
          : 'border-muted/30 bg-white/60 text-muted-foreground hover:border-rose-200 hover:scale-102'
      }`}
    >
      {color && (
        <div
          className="h-8 w-8 rounded-full border-2 border-white shadow"
          style={{ backgroundColor: color }}
        />
      )}
      {!color && (
        <span className="text-2xl">{emoji}</span>
      )}
      <span className="text-center leading-tight">{label}</span>
    </button>
  );
}
