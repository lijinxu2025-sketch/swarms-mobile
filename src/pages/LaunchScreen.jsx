const BG     = 'https://www.figma.com/api/mcp/asset/4d3b558a-be66-42ce-a59a-28bebb419053'
const LOGO   = 'https://www.figma.com/api/mcp/asset/50dd0832-5032-496a-b0a1-fe1284450cfb'

export default function LaunchScreen({ onGetStarted }) {
  return (
    <div className="relative w-full h-full overflow-hidden">

      {/* Full-bleed background */}
      <img
        src={BG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Logo */}
      <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '173.89px' }}>
        <img src={LOGO} alt="Swarms logo" className="w-[67px] h-[67px]" />
      </div>

      {/* Title */}
      <p
        className="absolute left-1/2 -translate-x-1/2 text-white text-center m-0 w-[373px]"
        style={{
          top: '277.89px',
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '64px',
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        Swarms
      </p>

      {/* Get Started button */}
      <button
        onClick={onGetStarted}
        className="absolute left-1/2 -translate-x-1/2 w-[327px] h-[58px] bg-[#ed1717] rounded-[16px] text-white text-[16px] font-bold border-0 cursor-pointer transition-opacity active:opacity-80"
        style={{ top: '721.89px', fontFamily: "'Montserrat', sans-serif" }}
      >
        Get Started
      </button>
    </div>
  )
}
