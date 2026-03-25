import { useState } from 'react'

// ─── Figma Asset URLs ──────────────────────────────────────────────────────────
const ASSETS = {
  logo:        '/image/signin_logo.webp',
  emailIcon:   '/image/signin_emailIcon.webp',
  lockIcon:    '/image/signin_lockIcon.webp',
  eyeSlash:    '/image/signin_eyeSlash.webp',
  dividerL:    '/image/signin_dividerL.webp',
  dividerR:    '/image/signin_dividerR.webp',
  google:      '/image/signin_google.webp',
  twitter:     '/image/signin_twitter.webp',
  github:      '/image/signin_github.webp',
  discord:     '/image/signin_discord.webp',
}

const SOCIAL_BUTTONS = [
  { key: 'google',  src: ASSETS.google,  alt: 'Google'  },
  { key: 'twitter', src: ASSETS.twitter, alt: 'Twitter' },
  { key: 'github',  src: ASSETS.github,  alt: 'GitHub'  },
  { key: 'discord', src: ASSETS.discord, alt: 'Discord' },
]

export default function SignInPage({ onSignIn }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [keepMe, setKeepMe]     = useState(false)

  const canSubmit = email.trim().length > 0 && password.length > 0

  function handleSubmit(e) {
    e.preventDefault()
    if (canSubmit) onSignIn()
  }

  return (
    <div
      className="flex flex-col h-full bg-black overflow-y-auto scroll-hide"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* ── Status Bar ── */}
      <div className="flex items-center justify-between px-6 h-[44px] shrink-0">
        <span className="text-white font-semibold text-[15px] tracking-tight">9:41</span>
        <div className="flex items-center gap-[5px]">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
            <rect x="0"    y="6" width="3" height="6"  rx="1" />
            <rect x="4.5"  y="4" width="3" height="8"  rx="1" />
            <rect x="9"    y="2" width="3" height="10" rx="1" />
            <rect x="13.5" y="0" width="3" height="12" rx="1" />
          </svg>
          <svg width="16" height="12" viewBox="0 0 20 14" fill="white">
            <path d="M10 10.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
            <path d="M10 6.5a6.5 6.5 0 0 1 4.6 1.9l1.5-1.5a8.5 8.5 0 0 0-12.2 0l1.5 1.5A6.5 6.5 0 0 1 10 6.5z" opacity=".6" />
            <path d="M10 2a11.5 11.5 0 0 1 8.1 3.35l1.5-1.5A13.5 13.5 0 0 0 .4 3.85l1.5 1.5A11.5 11.5 0 0 1 10 2z" opacity=".3" />
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="white">
            <rect x="0.5" y="0.5" width="20" height="11" rx="2" stroke="white" strokeWidth="1" fill="none" opacity=".35" />
            <rect x="1.5" y="1.5" width="18" height="9" rx="1.5" fill="white" />
            <path d="M22 4v4a2 2 0 0 0 0-4z" fill="white" opacity=".4" />
          </svg>
        </div>
      </div>

      {/* ── Logo & Title ── */}
      <div className="flex flex-col items-center pt-[35px] pb-[40px]">
        <img src={ASSETS.logo} alt="Swarms" className="w-[67px] h-[67px]" />
        <h1
          className="text-white font-extrabold m-0 mt-3"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '33px', lineHeight: 1.2 }}
        >
          Swarms
        </h1>
      </div>

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-[14px] px-6">

        {/* Email field */}
        <div className="flex flex-col gap-[14px]">
          <label className="text-white text-[14px] font-medium">
            Email or Phone Number
          </label>
          <div className="relative">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-3 pointer-events-none">
              <img src={ASSETS.emailIcon} alt="" className="w-full h-full object-contain" />
            </div>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full h-[50px] bg-[#141414] rounded-[10px] pl-[49px] pr-5 text-white/50 text-[14px] placeholder-white/50 outline-none border-0"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.14px' }}
            />
          </div>
        </div>

        {/* Password field */}
        <div className="flex flex-col gap-[6px]">
          <label className="text-white text-[14px] font-medium">
            Password
          </label>
          <div className="relative">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 w-[13px] h-[17px] pointer-events-none">
              <img src={ASSETS.lockIcon} alt="" className="w-full h-full object-contain" />
            </div>
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full h-[50px] bg-[#141414] rounded-[10px] pl-[49px] pr-12 text-white/50 text-[14px] placeholder-white/50 outline-none border-0"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.14px' }}
            />
            <button
              type="button"
              onClick={() => setShowPass(v => !v)}
              className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center opacity-70"
            >
              <img src={ASSETS.eyeSlash} alt={showPass ? 'Hide' : 'Show'} className="w-full h-full object-contain" />
            </button>
          </div>
        </div>

        {/* Remember me + Forgot password */}
        <div className="flex items-center justify-between mt-1">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => setKeepMe(v => !v)}
              className="w-5 h-5 rounded-[4px] border border-[#5e5e5e] flex items-center justify-center cursor-pointer shrink-0 transition-colors"
              style={{ background: keepMe ? '#ed1717' : 'transparent', borderColor: keepMe ? '#ed1717' : '#5e5e5e' }}
            >
              {keepMe && (
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path d="M1 4l3 3L10 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-white/50 text-[12px] font-normal tracking-[0.24px]">Keep me signed in</span>
          </label>
          <button type="button" className="text-[#ed1717] text-[13px] font-medium bg-transparent border-0 cursor-pointer p-0">
            Forgot password
          </button>
        </div>

        {/* Sign in button */}
        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full h-[58px] rounded-[16px] text-white text-[16px] font-bold border-0 cursor-pointer mt-1 transition-colors"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            background: canSubmit ? '#ed1717' : '#5e5e5e',
          }}
        >
          Sign in
        </button>
      </form>

      {/* ── Social Login ── */}
      <div className="flex flex-col items-center gap-[20px] px-6 mt-[30px] pb-8">
        {/* Divider */}
        <div className="flex items-center w-full gap-3">
          <div className="flex-1 h-px bg-[#5e5e5e]" />
          <span className="text-white text-[12px] font-medium whitespace-nowrap">You can connect with</span>
          <div className="flex-1 h-px bg-[#5e5e5e]" />
        </div>

        {/* Social buttons row */}
        <div className="flex items-center gap-[10px]">
          {SOCIAL_BUTTONS.map(({ key, src, alt }) => (
            <button
              key={key}
              type="button"
              className="w-11 h-11 rounded-full bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center transition-opacity active:opacity-70"
            >
              <img src={src} alt={alt} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>

        {/* Sign up link */}
        <p className="text-white text-[12px] font-medium m-0 text-center">
          Don't have an account?{' '}
          <button type="button" className="text-[#ed1717] font-medium bg-transparent border-0 cursor-pointer p-0">
            Sign Up here
          </button>
        </p>
      </div>
    </div>
  )
}
