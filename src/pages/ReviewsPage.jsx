import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import WriteReviewModal from '../components/WriteReviewModal'

// ─── Static data ──────────────────────────────────────────────────────────────
const RATING_BARS = [
  { stars: 5, count: 12, width: '100%' },
  { stars: 4, count: 5,  width: '35%'  },
  { stars: 3, count: 4,  width: '25%'  },
  { stars: 2, count: 2,  width: '13%'  },
  { stars: 1, count: 0,  width: '7%'   },
]

const REVIEWS = [
  { id: 1, name: 'Jay',  initials: 'J', rating: 4, date: 'September 20, 2025', text: "Best market analysis tool I've used. Period.", helpful: 20 },
  { id: 2, name: 'Leo',  initials: 'L', rating: 4, date: 'September 20, 2025', text: "Best market analysis tool I've used. Period.", helpful: 15 },
  { id: 3, name: 'Hank', initials: 'H', rating: 4, date: 'September 20, 2025', text: "Best market analysis tool I've used. Period.", helpful: 8  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────
function Stars({ count, size = 14 }) {
  return (
    <div className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= count ? '#ed1717' : 'none'} stroke={i <= count ? '#ed1717' : '#666'} strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function Avatar({ initials }) {
  return (
    <div className="w-[28px] h-[28px] rounded-full bg-[#333] flex items-center justify-center shrink-0">
      <span className="text-white text-[11px] font-bold">{initials}</span>
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] rounded-[16px] p-[16px] flex flex-col gap-[8px]">
      {/* User row */}
      <div className="flex flex-col gap-[4px]">
        <div className="flex items-center gap-[8px]">
          <Avatar initials={review.initials} />
          <span className="text-white text-[13px] font-semibold">{review.name}</span>
        </div>
        <Stars count={review.rating} size={16} />
      </div>
      {/* Date */}
      <span className="text-white text-[12px] font-normal">{review.date}</span>
      {/* Text */}
      <p className="text-white text-[13px] font-normal leading-[1.5] m-0">{review.text}</p>
      {/* Helpful */}
      <div className="flex items-center justify-between">
        <span className="text-[rgba(255,255,255,0.5)] text-[13px]">Was the review helpful?</span>
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[4px]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
            </svg>
            <span className="text-white text-[13px] font-medium">({review.helpful})</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M23 3H5c-.83 0-1.54.5-1.84 1.22l-3.02 7.05C.05 11.5 0 11.74 0 12v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L8.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ReviewsPage({ onBack }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="flex flex-col h-full bg-black overflow-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <StatusBar />

      {/* Nav */}
      <div className="flex items-center px-[24px] h-[56px] shrink-0">
        <button onClick={onBack} className="w-6 h-6 bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scroll-hide px-[24px] pb-[100px] flex flex-col gap-[34px]">

        {/* ── Rating block ── */}
        <div className="flex flex-col gap-[16px]">
          <span className="text-[#f5f8fa] text-[24px] font-bold leading-[1.2]">Rating&amp;Reviews</span>
          <div className="flex items-start gap-[24px]">
            {/* Score */}
            <div className="flex flex-col gap-[4px]">
              <span className="text-white text-[40px] font-semibold leading-[1.1] tracking-[-0.4px]">4.3</span>
              <span className="text-white text-[14px] font-normal">23 ratings</span>
            </div>
            {/* Bars */}
            <div className="flex flex-col gap-[10px] flex-1 pt-[6px]">
              {RATING_BARS.map(({ stars, count, width }) => (
                <div key={stars} className="flex items-center gap-[8px]">
                  <Stars count={stars} size={12} />
                  <div className="flex-1 h-[8px] bg-[rgba(255,255,255,0.1)] rounded-[4px] overflow-hidden">
                    <div className="h-full bg-[#ed1717] rounded-[4px]" style={{ width }} />
                  </div>
                  <span className="text-white text-[13px] w-[16px] text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Reviews list ── */}
        <div className="flex flex-col gap-[8px]">
          <span className="text-white text-[24px] font-bold leading-[1.2]">Reviews</span>
          {REVIEWS.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      {/* ── Fixed bottom: Write a review ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 121, background: 'linear-gradient(to bottom, rgba(0,0,0,0.22), #000)' }} />
      <div className="absolute bottom-[20px] right-[24px]">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-[8px] bg-[#ed1717] rounded-[25px] px-[16px] py-[12px] border-0 cursor-pointer shadow-[0px_4px_8px_rgba(211,38,38,0.25)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
          <span className="text-white text-[13px] font-medium">Write a review</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && <WriteReviewModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
