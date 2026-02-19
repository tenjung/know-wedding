'use client';
import type { AvatarConfig } from '@/lib/avatar/types';
import { SKIN_OPTIONS, HAIR_OPTIONS } from '@/lib/avatar/parts';

const getSkin = (id: string) => SKIN_OPTIONS.find(s => s.id === id)?.color ?? '#FDDBB4';
const getHair = (id: string) => HAIR_OPTIONS.find(h => h.id === id);

function HairBack({ style, color }: { style: string; color: string }) {
  if (style === 'long' || style === 'wavy') return (
    <g>
      <path d="M 58,52 Q 22,95 24,195 Q 38,225 56,218 Q 42,172 46,122 Q 50,82 62,68" fill={color} />
      <path d="M 142,52 Q 178,95 176,195 Q 162,225 144,218 Q 158,172 154,122 Q 150,82 138,68" fill={color} />
    </g>
  );
  if (style === 'ponytail') return (
    <path d="M 122,50 Q 148,42 156,82 Q 164,132 152,188 Q 142,210 132,200 Q 148,165 145,115 Q 142,78 128,70" fill={color} />
  );
  if (style === 'bun') return (
    <g>
      <circle cx={100} cy={16} r={18} fill={color} />
      <ellipse cx={100} cy={32} rx={8} ry={5} fill={color} opacity={0.85} />
    </g>
  );
  return null;
}

/** 성별에 따라 팔 두께·몸통 형태 차이 */
function BodyBase({ gender, skin }: { gender: string; skin: string }) {
  const f = gender === 'female';
  return (
    <g>
      <path d="M 88,118 L 112,118 L 114,136 L 86,136 Z" fill={skin} />
      {f ? (
        <>
          {/* 여성: 가는 팔 */}
          <path d="M 72,138 Q 50,158 44,188 Q 40,200 50,206 L 58,196 Q 62,184 68,164 Z" fill={skin} />
          <path d="M 128,138 Q 150,158 156,188 Q 160,200 150,206 L 142,196 Q 138,184 132,164 Z" fill={skin} />
          {/* 여성: 곡선 허리 */}
          <path d="M 70,136 L 130,136 Q 140,160 136,188 Q 118,196 100,196 Q 82,196 64,188 Q 60,160 70,136 Z" fill={skin} />
        </>
      ) : (
        <>
          {/* 남성: 굵은 팔 */}
          <path d="M 66,136 Q 36,154 30,186 Q 26,200 38,207 L 50,195 Q 54,180 62,158 Z" fill={skin} />
          <path d="M 134,136 Q 164,154 170,186 Q 174,200 162,207 L 150,195 Q 146,180 138,158 Z" fill={skin} />
          {/* 남성: 박스형 몸통 + 다리 */}
          <path d="M 58,136 L 142,136 L 140,200 L 60,200 Z" fill={skin} />
          <rect x={66} y={198} width={28} height={75} rx={3} fill={skin} />
          <rect x={106} y={198} width={28} height={75} rx={3} fill={skin} />
        </>
      )}
    </g>
  );
}

/** 여성 수트 → 펜슬스커트+힐, 남성 수트 → 바지+구두 */
function OutfitLayer({ id, gender }: { id: string; gender: string }) {
  const f = gender === 'female';

  if (id === 'OUTFIT_DRESS_WHITE') return (
    <g>
      <path d="M 68,136 Q 100,146 132,136 L 138,185 L 62,185 Z" fill="white" stroke="#f0e0e8" strokeWidth="1" />
      <path d="M 85,136 Q 100,148 115,136" fill="none" stroke="#f9d0d8" strokeWidth="2" />
      <path d="M 52,183 L 148,183 L 170,276 L 30,276 Z" fill="white" stroke="#f0e0e8" strokeWidth="1" />
      <path d="M 30,260 Q 60,252 100,260 Q 140,268 170,260" fill="none" stroke="#f0c8d0" strokeWidth="2.5" opacity={0.7} />
      <rect x={80} y={183} width={40} height={7} rx={3.5} fill="#f9b8c8" />
    </g>
  );

  if (id === 'OUTFIT_DRESS_PINK') return (
    <g>
      <path d="M 70,136 Q 100,145 130,136 L 135,182 L 65,182 Z" fill="#F48FB1" />
      <path d="M 82,136 Q 100,144 118,136" fill="none" stroke="#EC407A" strokeWidth="2" />
      <path d="M 58,180 L 142,180 L 158,272 L 42,272 Z" fill="#F8BBD9" />
      <path d="M 42,266 Q 100,258 158,266" fill="none" stroke="#F48FB1" strokeWidth="3" />
      <rect x={78} y={179} width={44} height={7} rx={3.5} fill="#EC407A" />
    </g>
  );

  if (id === 'OUTFIT_SUIT_BLACK') {
    const jacket = (
      <>
        <path d={f ? "M 66,136 L 134,136 L 136,190 L 64,190 Z" : "M 60,136 L 140,136 L 142,200 L 58,200 Z"} fill="#1a1a2e" />
        <path d="M 100,136 L 79,165 L 91,165 L 100,148" fill="#2d2d4e" />
        <path d="M 100,136 L 121,165 L 109,165 L 100,148" fill="#2d2d4e" />
        <rect x={95} y={136} width={10} height={30} fill="white" />
        <path d="M 97,140 L 103,140 L 104,168 L 100,173 L 96,168 Z" fill="#8B0000" />
      </>
    );
    if (f) return (
      <g>
        {jacket}
        <path d="M 62,188 L 138,188 L 135,258 L 65,258 Z" fill="#1a1a2e" />
        <ellipse cx={82} cy={262} rx={13} ry={5} fill="#0a0a0a" />
        <ellipse cx={118} cy={262} rx={13} ry={5} fill="#0a0a0a" />
      </g>
    );
    return (
      <g>
        {jacket}
        <rect x={66} y={198} width={28} height={75} rx={3} fill="#1a1a2e" />
        <rect x={106} y={198} width={28} height={75} rx={3} fill="#1a1a2e" />
        <ellipse cx={80} cy={276} rx={18} ry={7} fill="#0a0a0a" />
        <ellipse cx={120} cy={276} rx={18} ry={7} fill="#0a0a0a" />
      </g>
    );
  }

  if (id === 'OUTFIT_SUIT_BEIGE') {
    const jacket = (
      <>
        <path d={f ? "M 64,136 L 136,136 L 138,190 L 62,190 Z" : "M 62,136 L 138,136 L 140,196 L 60,196 Z"} fill="#C8A97E" />
        <path d="M 100,136 L 81,162 L 91,162 L 100,148" fill="#A68050" />
        <path d="M 100,136 L 119,162 L 109,162 L 100,148" fill="#A68050" />
        <rect x={94} y={136} width={12} height={28} fill="white" />
        <circle cx={100} cy={152} r={2} fill="#A68050" />
        <circle cx={100} cy={162} r={2} fill="#A68050" />
      </>
    );
    if (f) return (
      <g>
        {jacket}
        <path d="M 60,188 L 140,188 L 137,258 L 63,258 Z" fill="#8B6A3A" />
        <ellipse cx={82} cy={262} rx={13} ry={5} fill="#5C4033" />
        <ellipse cx={118} cy={262} rx={13} ry={5} fill="#5C4033" />
      </g>
    );
    return (
      <g>
        {jacket}
        <rect x={65} y={194} width={28} height={76} rx={2} fill="#8B6A3A" />
        <rect x={107} y={194} width={28} height={76} rx={2} fill="#8B6A3A" />
        <ellipse cx={79} cy={273} rx={17} ry={7} fill="#5C4033" />
        <ellipse cx={121} cy={273} rx={17} ry={7} fill="#5C4033" />
      </g>
    );
  }
  return null;
}

function HeadLayer({ skin }: { skin: string }) {
  return (
    <g>
      <ellipse cx={50} cy={76} rx={13} ry={15} fill={skin} />
      <ellipse cx={150} cy={76} rx={13} ry={15} fill={skin} />
      <ellipse cx={50} cy={76} rx={8} ry={10} fill="#f0c0a0" opacity={0.45} />
      <ellipse cx={150} cy={76} rx={8} ry={10} fill="#f0c0a0" opacity={0.45} />
      <ellipse cx={100} cy={70} rx={52} ry={50} fill={skin} />
    </g>
  );
}

/** 성별에 따라 눈썹 모양·속눈썹·볼터치·입술색 차이 */
function FaceLayer({ gender }: { gender: string }) {
  const f = gender === 'female';
  return (
    <g>
      {f ? (
        <>
          <path d="M 74,52 Q 83,46 92,52" fill="none" stroke="#5C3A1E" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 108,52 Q 117,46 126,52" fill="none" stroke="#5C3A1E" strokeWidth="2.2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M 73,54 L 93,54" fill="none" stroke="#4A3520" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 107,54 L 127,54" fill="none" stroke="#4A3520" strokeWidth="3.2" strokeLinecap="round" />
        </>
      )}
      <ellipse cx={83} cy={68} rx={10} ry={11} fill="white" />
      <ellipse cx={117} cy={68} rx={10} ry={11} fill="white" />
      {f && (
        <g stroke="#2d1010" strokeLinecap="round" fill="none">
          <path d="M 73,60 Q 83,55 93,60" strokeWidth="2" />
          <path d="M 107,60 Q 117,55 127,60" strokeWidth="2" />
          {[75,81,87,92].map((x,i)=><path key={i} d={`M ${x},${61-i*0.3} L ${x-1},${56-i*0.3}`} strokeWidth="1.4"/>)}
          {[108,114,120,125].map((x,i)=><path key={i} d={`M ${x},${61-i*0.3} L ${x+1},${56-i*0.3}`} strokeWidth="1.4"/>)}
        </g>
      )}
      <circle cx={83} cy={69} r={7} fill="#4A3520" />
      <circle cx={117} cy={69} r={7} fill="#4A3520" />
      <circle cx={84} cy={70} r={4} fill="#1A1A2E" />
      <circle cx={118} cy={70} r={4} fill="#1A1A2E" />
      <circle cx={80} cy={65} r={2.5} fill="white" />
      <circle cx={114} cy={65} r={2.5} fill="white" />
      <ellipse cx={67} cy={84} rx={14} ry={9} fill="#FF8FAB" opacity={f ? 0.35 : 0.12} />
      <ellipse cx={133} cy={84} rx={14} ry={9} fill="#FF8FAB" opacity={f ? 0.35 : 0.12} />
      <path d="M 97,87 Q 100,91 103,87" fill="none" stroke="#d4a080" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 89,100 Q 100,111 111,100" fill="none" stroke={f ? '#c06070' : '#8B5E3C'} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
}

function HairFront({ style, color }: { style: string; color: string }) {
  const s = style;
  if (s === 'bob') return (
    <g>
      <path d="M 50,62 Q 52,20 100,16 Q 148,20 150,62 Q 148,52 100,50 Q 52,52 50,62 Z" fill={color} />
      <path d="M 52,58 Q 44,78 46,115 Q 50,122 55,118 Q 54,105 56,80 Q 56,68 58,60 Z" fill={color} />
      <path d="M 148,58 Q 156,78 154,115 Q 150,122 145,118 Q 146,105 144,80 Q 144,68 142,60 Z" fill={color} />
      <path d="M 76,14 Q 74,32 78,50 Q 90,40 100,38 Q 110,40 122,50 Q 126,32 124,14" fill={color} />
    </g>
  );
  if (s === 'long' || s === 'wavy') return (
    <g>
      <path d="M 50,62 Q 52,18 100,14 Q 148,18 150,62 Q 145,52 100,50 Q 55,52 50,62 Z" fill={color} />
      <path d="M 52,58 Q 46,80 50,108 L 58,90 Q 57,74 58,60 Z" fill={color} />
      <path d="M 148,58 Q 154,80 150,108 L 142,90 Q 143,74 142,60 Z" fill={color} />
      <path d="M 78,14 Q 76,32 80,52 Q 90,42 100,40 Q 110,42 120,52 Q 124,32 122,14" fill={color} />
    </g>
  );
  if (s === 'bun') return (
    <g>
      <path d="M 52,62 Q 54,30 100,28 Q 146,30 148,62 Q 145,55 100,53 Q 55,55 52,62 Z" fill={color} />
      <path d="M 52,60 Q 46,78 50,98 L 58,88 Q 58,76 58,60 Z" fill={color} />
      <path d="M 148,60 Q 154,78 150,98 L 142,88 Q 142,76 142,60 Z" fill={color} />
      <path d="M 100,14 Q 114,10 120,20 L 110,30" fill={color} opacity={0.8} />
      <path d="M 100,14 Q 86,10 80,20 L 90,30" fill={color} opacity={0.8} />
    </g>
  );
  if (s === 'ponytail') return (
    <g>
      <path d="M 52,62 Q 54,22 100,18 Q 146,22 148,62 Q 145,54 100,52 Q 55,54 52,62 Z" fill={color} />
      <path d="M 52,60 Q 46,78 50,105 L 58,90 Q 57,72 58,60 Z" fill={color} />
      <path d="M 125,50 Q 134,54 136,60 L 124,56 Z" fill={color} />
      <circle cx={128} cy={56} r={6} fill="#FF8FAB" />
      <path d="M 78,18 Q 76,36 82,52 Q 91,42 100,40 Q 109,42 118,52 Q 124,36 122,18" fill={color} />
    </g>
  );
  if (s === 'short') return (
    <g>
      <path d="M 52,68 Q 52,22 100,18 Q 148,22 148,68 Q 145,62 100,60 Q 55,62 52,68 Z" fill={color} />
      <path d="M 52,65 Q 46,80 50,98 L 58,90 Q 58,76 58,65 Z" fill={color} />
      <path d="M 148,65 Q 154,80 150,98 L 142,90 Q 142,76 142,65 Z" fill={color} />
    </g>
  );
  return null;
}

function AccessoryLayer({ id }: { id: string }) {
  if (id === 'ACC_VEIL') return (
    <g>
      <path d="M 86,20 Q 46,54 32,100 Q 18,155 24,205 Q 44,198 52,178 Q 46,142 56,105 Q 65,72 100,58 Q 135,72 144,105 Q 154,142 148,178 Q 156,198 176,205 Q 182,155 168,100 Q 154,54 114,20 Z"
        fill="white" opacity={0.38} stroke="white" strokeWidth="0.5" />
      <path d="M 80,20 L 120,20" stroke="#f5f5f5" strokeWidth="3" fill="none" />
      {[84,93,100,107,116].map((x,i)=>(
        <g key={i}>
          <path d={`M ${x},20 L ${x},${i===2?8:i%2===0?13:10}`} stroke="white" strokeWidth="1.8" fill="none"/>
          <circle cx={x} cy={i===2?7:i%2===0?12:9} r={2.5} fill="white"/>
        </g>
      ))}
    </g>
  );
  if (id === 'ACC_FLOWER_CROWN') return (
    <g>
      <path d="M 52,48 Q 100,30 148,48" fill="none" stroke="#C5A028" strokeWidth="2.5" strokeLinecap="round" />
      {[{cx:60,cy:44,f:'#FF8FAB'},{cx:76,cy:35,f:'#FFD700'},{cx:92,cy:30,f:'#FF69B4'},
        {cx:108,cy:30,f:'#87CEEB'},{cx:124,cy:35,f:'#98FB98'},{cx:140,cy:44,f:'#FFA07A'}].map((p,i)=>(
        <g key={i}>
          <circle cx={p.cx} cy={p.cy} r={7} fill={p.f}/>
          <circle cx={p.cx} cy={p.cy} r={3} fill="white"/>
          <circle cx={p.cx} cy={p.cy} r={1.5} fill="#FFD700"/>
        </g>
      ))}
    </g>
  );
  if (id === 'ACC_GLASSES') return (
    <g>
      <circle cx={83} cy={68} r={12} fill="none" stroke="#5C4033" strokeWidth="2.5" />
      <circle cx={117} cy={68} r={12} fill="none" stroke="#5C4033" strokeWidth="2.5" />
      <path d="M 95,68 L 105,68" stroke="#5C4033" strokeWidth="2" />
      <path d="M 48,62 L 71,66" stroke="#5C4033" strokeWidth="2" strokeLinecap="round" />
      <path d="M 152,62 L 129,66" stroke="#5C4033" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
  if (id === 'ACC_BOW_TIE') return (
    <g>
      <path d="M 84,130 L 98,137 L 84,144 Z" fill="#E87C9B" />
      <path d="M 116,130 L 102,137 L 116,144 Z" fill="#E87C9B" />
      <circle cx={100} cy={137} r={5} fill="#c05070" />
    </g>
  );
  return null;
}

function EffectLayer({ id }: { id: string }) {
  if (id === 'FX_HEARTS') return (
    <g opacity={0.85}>
      {[{x:22,y:60,s:0.9},{x:168,y:55,s:0.7},{x:18,y:110,s:0.6},{x:172,y:105,s:0.8},{x:30,y:165,s:0.5}]
        .map((p,i)=><text key={i} x={p.x} y={p.y} fontSize={16*p.s} textAnchor="middle" fill="#FF8FAB">♥</text>)}
    </g>
  );
  if (id === 'FX_SPARKLES') return (
    <g>
      {[{x:24,y:50},{x:170,y:45},{x:20,y:115},{x:175,y:110},{x:28,y:175},{x:168,y:170}]
        .map((p,i)=><text key={i} x={p.x} y={p.y} fontSize={14} textAnchor="middle" fill="#FFD700">✦</text>)}
    </g>
  );
  return null;
}

function FeetLayer({ outfitId }: { outfitId: string }) {
  if (outfitId === 'OUTFIT_DRESS_WHITE' || outfitId === 'OUTFIT_DRESS_PINK') return (
    <g>
      <ellipse cx={88}  cy={274} rx={10} ry={6} fill="#fff0f0" />
      <ellipse cx={112} cy={274} rx={10} ry={6} fill="#fff0f0" />
    </g>
  );
  return null;
}

interface Props { config: AvatarConfig; size?: number; }

export function AvatarSVG({ config, size = 200 }: Props) {
  const skin      = getSkin(config.skinId);
  const hairInfo  = getHair(config.hairId);
  const hairStyle = hairInfo?.style ?? 'bob';
  const hairColor = hairInfo?.color ?? '#6B3F1E';
  const { gender } = config;

  return (
    <svg viewBox="0 0 200 280" width={size} height={size * 1.4} xmlns="http://www.w3.org/2000/svg">
      <HairBack style={hairStyle} color={hairColor} />
      <BodyBase gender={gender} skin={skin} />
      <OutfitLayer id={config.outfitId} gender={gender} />
      <FeetLayer outfitId={config.outfitId} />
      <HeadLayer skin={skin} />
      <FaceLayer gender={gender} />
      <HairFront style={hairStyle} color={hairColor} />
      <AccessoryLayer id={config.accId} />
      <EffectLayer id={config.effectId} />
    </svg>
  );
}
