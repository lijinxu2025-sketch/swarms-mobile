import { useState } from 'react'
import StatusBar from '../components/StatusBar'

const THEMES = ['Follow System', 'Light Mode', 'Dark Mode']

export default function ThemePage({ onBack }) {
  const [selected, setSelected] = useState('Dark Mode')

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
        <span className="text-white text-[16px] font-semibold">Theme</span>
        <div className="w-[24px]" />
      </div>

      {/* ── Options ── */}
      <div className="flex flex-col gap-[16px] px-[24px] pt-[20px]">
        {THEMES.map(theme => (
          <button
            key={theme}
            onClick={() => setSelected(theme)}
            className="w-full h-[49px] rounded-[8px] bg-[rgba(255,255,255,0.08)] px-[13px] flex items-center justify-between border-0 cursor-pointer"
          >
            <span className="text-white text-[14px] font-medium">{theme}</span>
            {selected === theme && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
