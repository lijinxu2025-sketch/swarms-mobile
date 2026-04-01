import { useState } from 'react'

export default function WriteReviewModal({ onClose }) {
  const [rating, setRating]   = useState(4)
  const [hovered, setHovered] = useState(null)
  const [text, setText]       = useState('')

  function handleSend() {
    // TODO: submit review
    onClose()
  }

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-end"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      {/* Sheet */}
      <div
        className="bg-[#111] rounded-t-[24px] flex flex-col items-center pt-[16px] pb-[34px] px-[24px] gap-[20px]"
        onClick={e => e.stopPropagation()}
      >
        {/* Pill */}
        <div className="w-[60px] h-[6px] bg-white rounded-[3px]" />

        {/* Title */}
        <span className="text-white text-[18px] font-medium text-center">What is your rate?</span>

        {/* Stars */}
        <div className="flex items-center gap-[16px]">
          {[1, 2, 3, 4, 5].map(i => (
            <button
              key={i}
              className="bg-transparent border-0 cursor-pointer p-0"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setRating(i)}
            >
              <svg width="36" height="36" viewBox="0 0 24 24"
                fill={(hovered ?? rating) >= i ? '#FFA500' : 'none'}
                stroke={(hovered ?? rating) >= i ? '#FFA500' : '#666'}
                strokeWidth="1.5"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
              </svg>
            </button>
          ))}
        </div>

        {/* Subtitle */}
        <p className="text-white text-[18px] font-medium text-center leading-[1.4] m-0">
          Please share your opinion<br />about the product
        </p>

        {/* Text area */}
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Your review"
          className="w-full h-[153px] bg-transparent border border-[rgba(255,255,255,0.1)] rounded-[8px] p-[12px] text-white text-[14px] font-medium placeholder:text-[rgba(255,255,255,0.5)] resize-none outline-none"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          className="w-full h-[58px] bg-[#ed1717] rounded-[16px] border-0 cursor-pointer flex items-center justify-center"
        >
          <span className="text-white text-[16px] font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Send Review
          </span>
        </button>
      </div>
    </div>
  )
}
