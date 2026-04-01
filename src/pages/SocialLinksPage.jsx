import { useState } from 'react'
import StatusBar from '../components/StatusBar'

// ─── Follow Swarms icons (Figma assets) ──────────────────────────────────────
const ICON_X        = 'https://www.figma.com/api/mcp/asset/e86447b1-2d80-421c-850b-b0945c75a16e'
const ICON_DISCORD  = 'https://www.figma.com/api/mcp/asset/e4588165-7ca8-4293-83d4-90544b39a55d'
const ICON_TELEGRAM = 'https://www.figma.com/api/mcp/asset/bcbf1bea-5524-452e-87a5-f7918e163951'
const ICON_GITHUB   = 'https://www.figma.com/api/mcp/asset/38674899-bf94-4c55-a900-c62b72d0fbc5'
const ICON_YOUTUBE  = 'https://www.figma.com/api/mcp/asset/51281cba-6728-4c86-adc5-b37a5ab34c0d'

const FOLLOW_ICONS = [
  { key: 'x',        src: ICON_X,        alt: 'X / Twitter' },
  { key: 'discord',  src: ICON_DISCORD,  alt: 'Discord'     },
  { key: 'telegram', src: ICON_TELEGRAM, alt: 'Telegram'    },
  { key: 'github',   src: ICON_GITHUB,   alt: 'GitHub'      },
  { key: 'youtube',  src: ICON_YOUTUBE,  alt: 'YouTube'     },
]

const DEFAULTS = {
  twitter:  'https://twitter.com/kevin',
  linkedin: 'https://www.linkedin/kevin/?hl=en',
  reddit:   'https://www.reddit.com/l',
}

const FIELDS = [
  { key: 'twitter',  label: 'Twitter'  },
  { key: 'linkedin', label: 'Linkedin' },
  { key: 'reddit',   label: 'Reddit'   },
]

export default function SocialLinksPage({ onBack }) {
  const [values,  setValues]  = useState({ ...DEFAULTS })
  const [focused, setFocused] = useState(null)

  const isDirty = FIELDS.some(({ key }) => values[key] !== DEFAULTS[key])

  function handleChange(key, val) {
    setValues(prev => ({ ...prev, [key]: val }))
  }

  function inputClass(key) {
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

        <span className="text-white text-[16px] font-semibold">Social Links</span>

        <div className="flex items-center gap-[8px]">
          {/* ··· more icon */}
          <button className="bg-transparent border-0 cursor-pointer p-0 flex items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>
          {/* Save */}
          <button
            className={`bg-transparent border-0 cursor-pointer text-[16px] font-bold text-white transition-opacity ${isDirty ? 'opacity-100' : 'opacity-50'}`}
          >
            Save
          </button>
        </div>
      </div>

      {/* ── Form ── */}
      <div className="flex-1 overflow-y-auto scroll-hide px-[24px] pt-[20px]">
        <div className="flex flex-col gap-[32px]">
          {FIELDS.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-[8px]">
              <span className="text-white text-[14px] font-medium">{label}</span>
              <input
                type="url"
                value={values[key]}
                onChange={e => handleChange(key, e.target.value)}
                onFocus={() => setFocused(key)}
                onBlur={() => setFocused(null)}
                className={inputClass(key)}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
          ))}
        </div>

        {/* ── Follow Swarms ── */}
        <div className="mt-[40px] mb-[32px]">
          <p className="text-white text-[14px] font-medium mb-[16px]">Follow Swarms</p>
          <div className="flex items-center gap-[20px]">
            {FOLLOW_ICONS.map(({ key, src, alt }) => (
              <button
                key={key}
                className="w-[49px] h-[49px] rounded-[8px] bg-[rgba(255,255,255,0.08)] flex items-center justify-center border-0 cursor-pointer p-[12px] shrink-0"
              >
                <img src={src} alt={alt} className="w-6 h-6 object-contain" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
