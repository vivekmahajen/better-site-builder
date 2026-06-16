// Devi avatar — traditional Indian woman in saffron saree (inline SVG)
export default function DeviAvatar({ size = "default" }) {
  const dimensions = {
    trigger: { container: 52, face: 48 },
    header: { container: 44, face: 40 },
    default: { container: 38, face: 34 },
    message: { container: 32, face: 28 },
  }[size];

  return (
    <div className="devi-avatar" style={{ width: dimensions.container, height: dimensions.container }} aria-hidden="true">
      <svg width={dimensions.face} height={dimensions.face} viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Devi — Aastha Sacred Guide avatar">
        <circle cx="60" cy="60" r="58" fill="#FFF3E0" stroke="#E8710A" strokeWidth="2" />
        <ellipse cx="60" cy="115" rx="42" ry="28" fill="#E8710A" />
        <path d="M18 115 Q60 95 102 115" stroke="#D4A017" strokeWidth="3" fill="none" />
        <path d="M20 110 Q60 90 100 110" stroke="#F5C842" strokeWidth="2" fill="none" strokeDasharray="4,2" />
        <ellipse cx="60" cy="93" rx="24" ry="16" fill="#8B1A1A" />
        <rect x="53" y="72" width="14" height="20" rx="7" fill="#D4956A" />
        <ellipse cx="60" cy="55" rx="26" ry="30" fill="#D4956A" />
        <path d="M34 35 Q60 15 86 35 Q80 28 60 25 Q40 28 34 35Z" fill="#1a0a00" />
        <path d="M60 22 L60 38" stroke="#CC2B0E" strokeWidth="3" strokeLinecap="round" />
        <circle cx="60" cy="42" r="4" fill="#CC2B0E" />
        <circle cx="60" cy="42" r="2.5" fill="#FF4444" />
        <ellipse cx="48" cy="52" rx="7" ry="5" fill="white" />
        <ellipse cx="72" cy="52" rx="7" ry="5" fill="white" />
        <circle cx="49" cy="52" r="4" fill="#2d1000" />
        <circle cx="73" cy="52" r="4" fill="#2d1000" />
        <circle cx="51" cy="50" r="1.5" fill="white" />
        <circle cx="75" cy="50" r="1.5" fill="white" />
        <path d="M41 52 Q48 49 55 52" stroke="#1a0a00" strokeWidth="1" fill="none" />
        <path d="M65 52 Q72 49 79 52" stroke="#1a0a00" strokeWidth="1" fill="none" />
        <path d="M41 46 Q48 42 55 45" stroke="#2d1000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M65 45 Q72 42 79 46" stroke="#2d1000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="60" cy="61" rx="3" ry="4" fill="#C4845A" />
        <circle cx="57" cy="62" r="1.5" fill="#B07050" />
        <path d="M49 70 Q60 78 71 70" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="34" cy="55" rx="5" ry="7" fill="#D4956A" />
        <ellipse cx="86" cy="55" rx="5" ry="7" fill="#D4956A" />
        <circle cx="34" cy="56" r="5" fill="#D4A017" />
        <circle cx="86" cy="56" r="5" fill="#D4A017" />
        <ellipse cx="34" cy="64" rx="4" ry="7" fill="#D4A017" opacity="0.9" />
        <ellipse cx="86" cy="64" rx="4" ry="7" fill="#D4A017" opacity="0.9" />
        <circle cx="34" cy="71" r="2.5" fill="#F5C842" />
        <circle cx="86" cy="71" r="2.5" fill="#F5C842" />
        <circle cx="35" cy="32" r="4" fill="white" opacity="0.95" />
        <circle cx="44" cy="27" r="3.5" fill="white" opacity="0.9" />
        <circle cx="54" cy="24" r="4" fill="white" opacity="0.95" />
        <circle cx="64" cy="23" r="3.5" fill="white" opacity="0.9" />
        <circle cx="74" cy="25" r="4" fill="white" opacity="0.95" />
        <circle cx="83" cy="30" r="3.5" fill="white" opacity="0.9" />
        <circle cx="35" cy="32" r="1.5" fill="#FFD700" />
        <circle cx="54" cy="24" r="1.5" fill="#FFD700" />
        <circle cx="74" cy="25" r="1.5" fill="#FFD700" />
        <path d="M42 80 Q60 90 78 80" stroke="#D4A017" strokeWidth="2.5" fill="none" />
        <circle cx="60" cy="89" r="4" fill="#D4A017" />
        <circle cx="51" cy="85" r="2.5" fill="#D4A017" />
        <circle cx="69" cy="85" r="2.5" fill="#D4A017" />
        <circle cx="25" cy="108" r="6" fill="none" stroke="#D4A017" strokeWidth="2.5" />
        <circle cx="95" cy="108" r="6" fill="none" stroke="#D4A017" strokeWidth="2.5" />
        <path d="M32 100 Q25 108 28 116" stroke="#D4956A" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M88 100 Q95 108 92 116" stroke="#D4956A" strokeWidth="6" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}
