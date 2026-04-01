import { useState } from 'react'
import StatusBar from '../components/StatusBar'

const MAIL_ICON  = 'https://www.figma.com/api/mcp/asset/9076e29b-2906-48cd-9375-73a826d0ceee'
const GLOBE_ICON = 'https://www.figma.com/api/mcp/asset/98ced754-c644-42ac-ac45-880f453c136b'

const DEFAULTS = {
  name:     'Carson li',
  birthday: '12/27/1995',
  email:    'Helloswarms@gamil.com',
  country:  'United States',
}

export default function EditProfilePage({ onBack }) {
  const [name,     setName]     = useState(DEFAULTS.name)
  const [birthday, setBirthday] = useState(DEFAULTS.birthday)
  const [focused,  setFocused]  = useState(null)

  const isDirty = name !== DEFAULTS.name || birthday !== DEFAULTS.birthday

  function fieldClass(key) {
    const base = 'w-full h-[49px] rounded-[8px] px-[12px] text-white text-[14px] font-medium bg-[rgba(255,255,255,0.08)] border outline-none'
    return focused === key
      ? `${base} border-[#ed1717]`
      : `${base} border-transparent`
  }

  return (
    <div
      className="flex flex-col h-full bg-black"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <StatusBar />

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-[24px] h-[56px]">
        <button onClick={onBack} className="bg-transparent border-0 cursor-pointer p-0 flex items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>

        <span className="text-white text-[16px] font-semibold">Edit Profile</span>

        <button
          className={`bg-transparent border-0 cursor-pointer text-[16px] font-bold text-white transition-opacity ${isDirty ? 'opacity-100' : 'opacity-50'}`}
        >
          Save
        </button>
      </div>

      {/* ── Avatar ── */}
      <div className="flex justify-center pt-[20px] pb-[32px]">
        <div className="relative w-[84px] h-[84px]">
          <div className="w-[84px] h-[84px] rounded-full bg-[#c1392b] flex items-center justify-center">
            <span className="text-white text-[32px] font-normal">CA</span>
          </div>
          {/* Edit button — bottom-right, partially overlapping */}
          <button className="absolute bottom-0 right-[-10px] w-[44px] h-[44px] rounded-full bg-[#262626] flex items-center justify-center border-0 cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Form fields ── */}
      <div className="flex flex-col gap-[32px] px-[24px]">

        {/* Name */}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onFocus={() => setFocused('name')}
          onBlur={() => setFocused(null)}
          className={fieldClass('name')}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        />

        {/* Birthday */}
        <input
          type="text"
          value={birthday}
          onChange={e => setBirthday(e.target.value)}
          onFocus={() => setFocused('birthday')}
          onBlur={() => setFocused(null)}
          className={fieldClass('birthday')}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        />

        {/* Email — display only */}
        <div className="w-full h-[49px] rounded-[8px] px-[12px] bg-[rgba(255,255,255,0.08)] flex items-center justify-between">
          <span className="text-white text-[14px] font-medium">{DEFAULTS.email}</span>
          <img src={MAIL_ICON} alt="" className="w-6 h-6" />
        </div>

        {/* Country — display only */}
        <div className="w-full h-[49px] rounded-[8px] px-[12px] bg-[rgba(255,255,255,0.08)] flex items-center justify-between">
          <span className="text-white text-[14px] font-medium">{DEFAULTS.country}</span>
          <img src={GLOBE_ICON} alt="" className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}
