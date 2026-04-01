import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

// ─── Figma icon assets ────────────────────────────────────────────────────────
const ICONS = {
  editProfile: 'https://www.figma.com/api/mcp/asset/cb799c0c-eb37-46ec-8c9d-03713280134e',
  billing:     'https://www.figma.com/api/mcp/asset/cd72bb34-044d-4ebf-ba43-8f1c014be3fd',
  purchases:   'https://www.figma.com/api/mcp/asset/16a2f7c6-a63a-429b-8f36-b2e3cce4687e',
  staking:     'https://www.figma.com/api/mcp/asset/6c19ac2f-e50c-4cdb-a750-8097dd5fda37',
  socialLinks: 'https://www.figma.com/api/mcp/asset/2c249401-bb9c-4538-a6f5-61087c74e73b',
  theme:       'https://www.figma.com/api/mcp/asset/6b02435f-b979-48be-b50c-a3331a94b55b',
  referral:    'https://www.figma.com/api/mcp/asset/302753f9-af07-4f46-9aee-9534d1452573',
  chevron:     'https://www.figma.com/api/mcp/asset/77fe6773-dbeb-496b-9ca5-dd52f6317ae2',
}

const MENU_ITEMS = [
  { key: 'editProfile', label: 'Edit Profile' },
  { key: 'billing',     label: 'Billing'      },
  { key: 'purchases',   label: 'Purchases'    },
  { key: 'staking',     label: 'Staking'      },
  { key: 'socialLinks', label: 'Social Links' },
  { key: 'theme',       label: 'Theme'        },
  { key: 'referral',    label: 'Referral'     },
]

// ─── Logout confirmation modal ────────────────────────────────────────────────
function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-end"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={onCancel}
    >
      <div
        className="flex flex-col items-center gap-[13px] px-[24px] pt-[32px] pb-[40px] rounded-t-[24px]"
        style={{ background: 'linear-gradient(to bottom, #1a1a1a, #111)' }}
        onClick={e => e.stopPropagation()}
      >
        <p className="text-white text-[16px] font-semibold text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Logout confirmation
        </p>
        <p className="text-white text-[14px] font-medium opacity-50 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Are you sure you want to sign out?
        </p>

        <div className="flex flex-col gap-[8px] w-full mt-[4px]">
          <button
            onClick={onConfirm}
            className="w-full h-[46px] bg-[#ed1717] rounded-[16px] border-0 cursor-pointer flex items-center justify-center"
          >
            <span className="text-white text-[16px] font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Logout</span>
          </button>
          <button
            onClick={onCancel}
            className="w-full h-[46px] bg-[#393939] rounded-[16px] border-0 cursor-pointer flex items-center justify-center"
          >
            <span className="text-white text-[16px] font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SettingsPage({ onLogout, onChat, onSettings, onEditProfile, onSocialLinks, onReferral }) {
  const [showLogout, setShowLogout] = useState(false)

  return (
    <div className="flex flex-col h-full bg-black relative overflow-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <StatusBar />

      <div className="flex-1 overflow-y-auto scroll-hide flex flex-col min-h-0">

        {/* ── Avatar + name ── */}
        <div className="flex flex-col items-center gap-[16px] pt-[32px] pb-[32px]">
          <div className="w-[84px] h-[84px] rounded-[42px] bg-[#c1392b] flex items-center justify-center">
            <span className="text-white text-[32px] font-normal">CA</span>
          </div>
          <span className="text-white text-[24px] font-medium">Carson li</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-[rgba(255,255,255,0.1)] mx-[24px]" />

        {/* ── Menu items ── */}
        <div className="flex flex-col gap-[20px] px-[24px] pt-[24px] pb-[32px]">
          {MENU_ITEMS.map(({ key, label }) => (
            <button
              key={key}
              onClick={key === 'editProfile' ? onEditProfile : key === 'socialLinks' ? onSocialLinks : key === 'referral' ? onReferral : undefined}
              className="flex items-center justify-between w-full bg-transparent border-0 cursor-pointer p-0"
            >
              <div className="flex items-center gap-[10px]">
                <img src={ICONS[key]} alt={label} className="w-6 h-6" />
                <span className="text-white text-[14px] font-medium">{label}</span>
              </div>
              <img src={ICONS.chevron} alt="" className="w-6 h-6" />
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-[rgba(255,255,255,0.1)] mx-[24px]" />

        {/* ── Log out button ── */}
        <div className="px-[24px] pt-[24px] pb-[16px]">
          <button
            onClick={() => setShowLogout(true)}
            className="w-full h-[58px] rounded-[16px] border-0 cursor-pointer flex items-center justify-center gap-[8px]"
            style={{ background: '#2e0a0a' }}
          >
            {/* logout arrow icon */}
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
              <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" fill="#ff4242" />
            </svg>
            <span className="text-[#ff4242] text-[16px] font-normal tracking-[-0.32px]">log out</span>
          </button>
        </div>
      </div>

      <BottomNav onChat={onChat} onSettings={onSettings} activeTab="settings" />

      {/* Logout modal */}
      {showLogout && (
        <LogoutModal
          onConfirm={() => { setShowLogout(false); onLogout && onLogout() }}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </div>
  )
}
