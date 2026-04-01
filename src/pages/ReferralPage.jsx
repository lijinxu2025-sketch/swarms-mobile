import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import ShareLinkModal from '../components/ShareLinkModal'

const ICON_SUPERVISOR = 'https://www.figma.com/api/mcp/asset/f82126f6-2fba-4509-95a6-62ec4cc7b55d'
const ICON_CONTRACT   = 'https://www.figma.com/api/mcp/asset/d174a16e-8140-4eaa-a4df-881a9357cc49'
const ICON_COPY       = 'https://www.figma.com/api/mcp/asset/61b4c803-d999-45c3-9a7b-d3e05945f645'

const REFERRAL_LINK = 'https://swarms.world/signin....'

const STATS = [
  { label: 'Total Signups',   value: '128' },
  { label: 'Credits Earned',  value: '380' },
  { label: 'Active Referrals', value: '46' },
]

const ACTIVITY = [
  {
    id: '#P-01055', date: 'Oct11,2026',
    name: 'Carson li', email: 'Helloswarms@gmail.com',
    status: 'Pending',
    statusStyle: { bg: 'bg-white/20', border: 'border border-white/50', text: 'text-white' },
  },
  {
    id: '#P-01044', date: 'Oct11,2026',
    name: 'Leo', email: 'Helloswarms@gmail.com',
    status: 'Processing',
    statusStyle: { bg: 'bg-[rgba(192,132,252,0.2)]', border: 'border border-[#c084fc]', text: 'text-[#c084fc]' },
  },
  {
    id: '#P-01033', date: 'Oct11,2026',
    name: 'Max', email: 'Helloswarms@gmail.com',
    status: 'Completed',
    statusStyle: { bg: 'bg-[rgba(35,183,122,0.2)]', border: 'border border-[#23b77a]', text: 'text-[#23b77a]' },
  },
]

function LayeredIcon({ icon }) {
  return (
    <div className="relative w-[44px] h-[44px] shrink-0">
      <div className="absolute inset-0 bg-white/8 rounded-[8px]" />
      <div className="absolute inset-[2.5px] bg-white/8 rounded-[8px]" />
      <img src={icon} alt="" className="absolute left-[10px] top-[10px] w-6 h-6" />
    </div>
  )
}

export default function ReferralPage({ onBack }) {
  const [copied,    setCopied]    = useState(false)
  const [showShare, setShowShare] = useState(false)

  function handleCopy() {
    navigator.clipboard?.writeText(REFERRAL_LINK).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="flex flex-col h-full bg-black overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <StatusBar />

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-[24px] h-[56px] shrink-0">
        <button onClick={onBack} className="bg-transparent border-0 cursor-pointer p-0 flex items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
        <span className="text-white text-[16px] font-semibold">Referral</span>
        <div className="w-[24px]" />
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto scroll-hide px-[24px] pb-[32px]">

        {/* ── Refer Customers card ── */}
        <div className="bg-white/[0.08] rounded-[8px] px-[8px] py-[16px] mb-[24px]">
          <div className="flex flex-col gap-[20px]">
            {/* Icon */}
            <LayeredIcon icon={ICON_SUPERVISOR} />

            {/* Text */}
            <div className="flex flex-col gap-[14px]">
              <p className="text-white text-[18px] font-bold leading-snug">Refer Customers</p>
              <p className="text-white text-[14px] font-medium tracking-[-0.28px] leading-snug">
                Share this link with friends and earn rewards when they sign up
              </p>
            </div>

            {/* Link row */}
            <div className="bg-white/10 rounded-[4px] px-[8px] py-[7px] flex items-center justify-between h-[51px]">
              <p className="text-white text-[12px] font-medium truncate flex-1 mr-[8px]">{REFERRAL_LINK}</p>
              <button
                onClick={handleCopy}
                className="bg-[#3e3e3e] rounded-[8px] h-[37px] px-[14px] flex items-center gap-[6px] border-0 cursor-pointer shrink-0"
              >
                <img src={ICON_COPY} alt="" className="w-[14px] h-[14px]" />
                <span className="text-white text-[12px] font-medium">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Share button */}
            <button
              onClick={() => setShowShare(true)}
              className="w-full h-[46px] bg-[#ed1717] rounded-[16px] border-0 cursor-pointer flex items-center justify-center"
            >
              <span className="text-white text-[16px] font-bold">Share link</span>
            </button>
          </div>
        </div>

        {/* ── Revenue overview ── */}
        <p className="text-white text-[14px] font-medium mb-[8px]">Revenue overview</p>
        <div className="flex flex-col gap-[16px] mb-[32px]">
          {STATS.map(({ label, value }) => (
            <div key={label} className="bg-white/[0.08] rounded-[8px] px-[8px] py-[16px] h-[106px] flex flex-col justify-between">
              <p className="text-white text-[14px] font-medium">{label}</p>
              <p className="text-white text-[32px] font-medium">{value}</p>
            </div>
          ))}
        </div>

        {/* ── Referral Activity ── */}
        <p className="text-white text-[14px] font-medium mb-[8px]">Referral Activity</p>
        <div className="flex flex-col gap-[16px]">
          {ACTIVITY.map(({ id, date, name, email, status, statusStyle }) => (
            <div key={id} className="bg-white/[0.08] rounded-[8px] p-[8px]">
              {/* Top row: icon + id/date + status badge */}
              <div className="flex items-start justify-between mb-[16px]">
                <div className="flex items-center gap-[13px]">
                  <LayeredIcon icon={ICON_CONTRACT} />
                  <div className="flex flex-col gap-[7px]">
                    <p className="text-white text-[14px] font-normal">{id}</p>
                    <p className="text-white text-[14px] font-normal">{date}</p>
                  </div>
                </div>
                <div className={`h-[29px] rounded-[5px] px-[10px] flex items-center ${statusStyle.bg} ${statusStyle.border}`}>
                  <span className={`text-[10px] font-medium ${statusStyle.text}`}>{status}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/10 mb-[12px]" />

              {/* Name / Email rows */}
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center justify-between">
                  <p className="text-white text-[14px] font-medium">Name</p>
                  <p className="text-white text-[14px] font-medium">{name}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-white text-[14px] font-medium">Email</p>
                  <p className="text-white text-[14px] font-medium">{email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share link modal */}
      {showShare && (
        <ShareLinkModal
          onClose={() => setShowShare(false)}
          onCopyLink={() => {
            navigator.clipboard?.writeText(REFERRAL_LINK).catch(() => {})
            setCopied(true)
            setShowShare(false)
            setTimeout(() => setCopied(false), 2000)
          }}
        />
      )}
    </div>
  )
}
