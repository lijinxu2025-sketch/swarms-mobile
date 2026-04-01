const NAV_CHAT            = '/image/home_navChat.webp'
const NAV_PROFILE         = '/image/home_navProfile.webp'
const NAV_PROFILE_LINEAR  = 'https://www.figma.com/api/mcp/asset/28d06da5-0f3f-441b-b8af-415ed173b94e'
const NAV_HOME            = '/image/home_navHome.webp'
const NAV_APPS            = '/image/home_navApps.webp'
const NAV_APPS_ACTIVE     = 'https://www.figma.com/api/mcp/asset/53c48305-f2ab-41f3-9f26-1283d3b1b070'

export default function BottomNav({ onChat, onSettings, onLaunch, activeTab }) {
  return (
    <div className="shrink-0 relative h-[88px]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      <div className="absolute bottom-[10px] left-[24px] right-[24px] h-[66px] rounded-[10px] border border-white/[0.15] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-[#111]/70 backdrop-blur-md" />
        <div className="relative z-10 h-full flex items-center justify-between px-[6px]">
          {/* Chat */}
          <button
            onClick={onChat}
            className="w-[51px] h-[54px] rounded-[10px] bg-white/10 flex items-center justify-center border-0 cursor-pointer"
          >
            <img src={NAV_CHAT} alt="Chat" className="w-[22px] h-[22px]" />
          </button>
          {/* Profile */}
          <button className="w-[51px] h-[54px] rounded-[10px] bg-white/10 flex items-center justify-center border-0 cursor-pointer">
            <img
              src={activeTab === 'settings' ? NAV_PROFILE_LINEAR : NAV_PROFILE}
              alt="Profile"
              className="w-6 h-6"
            />
          </button>
          {/* Home (center, red) — opens Launch Agent */}
          <button onClick={onLaunch} className="w-[52px] h-[52px] rounded-[10px] bg-[#ed1717] flex items-center justify-center border-0 cursor-pointer">
            <img src={NAV_HOME} alt="Home" className="w-5 h-5" />
          </button>
          {/* Grid */}
          <button className="w-[51px] h-[54px] rounded-[10px] bg-white/10 flex items-center justify-center border-0 cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="0" y="0" width="7.8" height="7.8" rx="2" stroke="#aaaaab" strokeWidth="1.5" fill="none" />
              <rect x="0" y="10" width="7.8" height="7.8" rx="2" stroke="#aaaaab" strokeWidth="1.5" fill="none" />
              <rect x="10" y="10" width="7.8" height="7.8" rx="2" stroke="#aaaaab" strokeWidth="1.5" fill="none" />
              <rect x="10" y="0" width="7.8" height="7.8" rx="2" stroke="#aaaaab" strokeWidth="1.5" fill="none" transform="rotate(45 13.9 3.9)" />
            </svg>
          </button>
          {/* Settings — far right, filled icon + brighter bg when active */}
          <button
            onClick={onSettings}
            className={`w-[51px] h-[54px] rounded-[10px] flex items-center justify-center border-0 cursor-pointer ${activeTab === 'settings' ? 'bg-white/20' : 'bg-white/10'}`}
          >
            <img
              src={activeTab === 'settings' ? NAV_APPS_ACTIVE : NAV_APPS}
              alt="Settings"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
