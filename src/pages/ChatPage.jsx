import { useState, useRef, useEffect } from 'react'
import StatusBar from '../components/StatusBar'

// ─── Figma Asset URLs ─────────────────────────────────────────────────────────
const ASSETS = {
  logo:          '/image/chat_logo.webp',
  editIcon:      '/image/chat_editIcon.webp',
  menuIcon:      '/image/chat_menuIcon.webp',
  attachIcon:    '/image/chat_attachIcon.webp',
  micIcon:       '/image/chat_micIcon.webp',
  arrowUp:       '/image/chat_arrowUp.webp',
  // Drawer icons
  searchIcon:    '/image/chat_searchIcon.webp',
  newChatIcon:   '/image/chat_newChatIcon.webp',
  squareIcon:    '/image/chat_squareIcon.webp',
  settingsIcon:  '/image/chat_settingsIcon.webp',
  // Bottom nav
  navChatFilled: '/image/chat_navChatFilled.webp',
  navProfile:    '/image/chat_navProfile.webp',
  navHomeIcon:   '/image/chat_navHomeIcon.webp',
  navApps:       '/image/chat_navApps.webp',
  // Assistant message icons
  swarmsAvatar:  '/image/chat_swarmsAvatar.webp',
  soundIcon:     '/image/chat_soundIcon.webp',
  copyIcon:      '/image/chat_copyIcon.webp',
  syncIcon:      '/image/chat_syncIcon.webp',
  thumbDownIcon: '/image/chat_thumbDownIcon.webp',
  deleteIcon:    '/image/chat_deleteIcon.webp',
}

const ASSISTANT_REPLY = `Swarms is the enterprise-grade, production-ready multi-agent orchestration framework created by kyegomez. Build, deploy....`

const CONVERSATIONS = [
  { label: 'Current conversation', active: true },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
  { label: 'Previous conversation' },
]

// ─── Drawer ───────────────────────────────────────────────────────────────────
function Drawer({ open, onClose, onConfig }) {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="absolute inset-0 z-20"
          onClick={onClose}
        />
      )}

      {/* Slide-in panel */}
      <div
        className="absolute top-0 left-0 h-full z-30 bg-black overflow-hidden flex flex-col transition-all duration-300 ease-in-out"
        style={{ width: open ? '281px' : '0px' }}
      >
        <div className="w-[281px] flex flex-col h-full">
          {/* Header */}
          <div className="bg-white/10 px-[16px] pt-[61px] pb-[14px] shrink-0 flex flex-col gap-[15px]">
            {/* Search */}
            <div className="flex items-center gap-[8px] bg-white/[0.06] rounded-[80px] px-[12px] py-[12px]">
              <img src={ASSETS.searchIcon} alt="" className="w-5 h-5 shrink-0" />
              <span className="text-white/30 text-[14px] font-medium flex-1">Search for chats</span>
            </div>

            {/* New Chat + square icon */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[6px]">
                <img src={ASSETS.newChatIcon} alt="" className="w-4 h-4 shrink-0" />
                <span className="text-white/90 text-[14px] font-semibold">New Chat</span>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <img src={ASSETS.squareIcon} alt="" className="w-4 h-4" />
              </div>
            </div>

            {/* Config */}
            <button onClick={onConfig} className="flex items-center gap-[6px] bg-transparent border-0 cursor-pointer p-0">
              <img src={ASSETS.settingsIcon} alt="" className="w-4 h-4 shrink-0" />
              <span className="text-white/90 text-[14px] font-semibold">Config</span>
            </button>
          </div>

          {/* Chat list */}
          <div className="bg-white/10 flex-1 overflow-y-auto px-[16px] py-[10px] flex flex-col gap-[10px] scroll-hide">
            <span className="text-white/90 text-[14px] font-semibold">Chats</span>
            <div className="flex flex-col gap-[2px]">
              {CONVERSATIONS.map((item, i) => (
                <button
                  key={i}
                  className={`w-full text-left px-[12px] py-[8px] h-[40px] rounded-[80px] border-0 cursor-pointer text-[12px] font-semibold text-white/90 ${
                    item.active ? 'bg-white/10' : 'bg-transparent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Message bubbles ──────────────────────────────────────────────────────────
function UserBubble({ text }) {
  return (
    <div className="flex justify-end">
      <div
        className="max-w-[75%] px-[16px] py-[12px] text-[14px] font-normal leading-[1.5]"
        style={{
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '8px 8px 8px 2px',
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        {text}
      </div>
    </div>
  )
}

function AssistantBubble({ text }) {
  return (
    <div className="flex flex-col gap-[10px]">
      {/* Avatar + label */}
      <div className="flex items-center gap-[8px]">
        <div className="w-[32px] h-[32px] rounded-full border border-[#424242] bg-[#212121] flex items-center justify-center shrink-0">
          <img src={ASSETS.swarmsAvatar} alt="" className="w-[18px] h-[18px]" />
        </div>
        <span className="text-white text-[12px] font-bold">swarms assistant</span>
      </div>
      {/* Reply text */}
      <p className="text-[#ececec] text-[14px] font-normal leading-[1.5] m-0 pl-[40px]">{text}</p>
      {/* Action icons */}
      <div className="flex items-center gap-[12px] pl-[40px]">
        {[ASSETS.soundIcon, ASSETS.copyIcon, ASSETS.syncIcon, ASSETS.thumbDownIcon, ASSETS.deleteIcon].map((icon, i) => (
          <button key={i} className="w-4 h-4 bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center">
            <img src={icon} alt="" className="w-4 h-4 opacity-60" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ChatPage({ onGoHome, onConfig }) {
  const [message, setMessage] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const bottomRef = useRef(null)

  const hasText = message.trim().length > 0

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function sendMessage() {
    const text = message.trim()
    if (!text) return
    const userMsg = { role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setMessage('')
    if (text.toLowerCase().includes('what is swarms')) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', text: ASSISTANT_REPLY }])
      }, 1000)
    }
  }

  return (
    <div className="relative flex flex-col h-full bg-black overflow-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <StatusBar />

      {/* Nav header */}
      <div className="relative flex items-center justify-between px-[24px] h-[56px] shrink-0">
        <button
          onClick={() => setDrawerOpen(true)}
          className="w-6 h-6 bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center"
        >
          <img src={ASSETS.menuIcon} alt="Menu" className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-[4px]">
          <span className="text-white text-[16px] font-normal">swarms chat</span>
          <span className="text-white text-[16px] font-normal">V1</span>
        </div>
        <button className="w-6 h-6 bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center">
          <img src={ASSETS.editIcon} alt="Edit" className="w-6 h-6" />
        </button>
      </div>

      {/* Content: empty state or messages */}
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-[32px]">
          <img src={ASSETS.logo} alt="Swarms" className="w-[46px] h-[46px]" />
          <p className="text-white text-[20px] font-bold">How can i help you today</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto scroll-hide px-[24px] py-[16px] flex flex-col gap-[24px]">
          {messages.map((msg, i) =>
            msg.role === 'user'
              ? <UserBubble key={i} text={msg.text} />
              : <AssistantBubble key={i} text={msg.text} />
          )}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Input bar */}
      <div className="px-[24px] pb-[16px] shrink-0">
        <div className="flex items-center gap-[16px] h-[58px] border border-[#424242] rounded-[16px] pl-[20px] pr-[12px]">
          <button className="w-6 h-6 bg-transparent border-0 cursor-pointer p-0 shrink-0 flex items-center justify-center">
            <img src={ASSETS.attachIcon} alt="Attach" className="w-6 h-6" />
          </button>
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Enter your message..."
            className="flex-1 bg-transparent border-0 outline-none text-white text-[14px] font-normal placeholder-white/50 min-w-0"
          />
          <div className="flex items-center gap-[4px] shrink-0">
            <button className="border border-white/10 rounded-[8px] p-[7.5px] bg-transparent cursor-pointer flex items-center justify-center">
              <img src={ASSETS.micIcon} alt="Mic" className="w-[18px] h-[18px]" />
            </button>
            <button
              onClick={sendMessage}
              className={`rounded-[8px] p-[8px] border-0 cursor-pointer flex items-center justify-center transition-colors duration-150 ${
                hasText ? 'bg-white' : 'bg-[#383838]'
              }`}
            >
              <img src={ASSETS.arrowUp} alt="Send" className="w-[17px] h-[17px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="shrink-0 relative h-[88px]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none" />
        <div className="absolute bottom-[10px] left-[24px] right-[24px] h-[66px] rounded-[10px] border border-white/[0.15] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-[#111]/70 backdrop-blur-md" />
          <div className="relative z-10 h-full flex items-center justify-between px-[6px]">
            <button className="w-[51px] h-[54px] rounded-[10px] bg-white/10 flex items-center justify-center border-0 cursor-pointer">
              <img src={ASSETS.navChatFilled} alt="Chat" className="w-[22px] h-[22px]" />
            </button>
            <button onClick={onGoHome} className="w-[51px] h-[54px] rounded-[10px] bg-white/10 flex items-center justify-center border-0 cursor-pointer">
              <img src={ASSETS.navProfile} alt="Profile" className="w-6 h-6" />
            </button>
            <button onClick={onGoHome} className="w-[52px] h-[52px] rounded-[10px] bg-[#ed1717] flex items-center justify-center border-0 cursor-pointer">
              <img src={ASSETS.navHomeIcon} alt="Home" className="w-5 h-5" />
            </button>
            <button className="w-[51px] h-[54px] rounded-[10px] bg-white/10 flex items-center justify-center border-0 cursor-pointer">
              <img src={ASSETS.navApps} alt="Apps" className="w-6 h-6" />
            </button>
            <button className="w-[51px] h-[54px] rounded-[10px] bg-white/10 flex items-center justify-center border-0 cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="0" y="0" width="7.8" height="7.8" rx="2" stroke="#aaaaab" strokeWidth="1.5" fill="none" />
                <rect x="0" y="10" width="7.8" height="7.8" rx="2" stroke="#aaaaab" strokeWidth="1.5" fill="none" />
                <rect x="10" y="10" width="7.8" height="7.8" rx="2" stroke="#aaaaab" strokeWidth="1.5" fill="none" />
                <rect x="10" y="0" width="7.8" height="7.8" rx="2" stroke="#aaaaab" strokeWidth="1.5" fill="none" transform="rotate(45 13.9 3.9)" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Hamburger drawer — rendered on top */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onConfig={onConfig} />
    </div>
  )
}
