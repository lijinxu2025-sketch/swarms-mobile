import { useState, useEffect } from 'react'

// ─── Assets ───────────────────────────────────────────────────────────────────
const SOL_IMG   = 'https://www.figma.com/api/mcp/asset/a680ac1c-7945-45aa-991b-4d2409a0225b'
const QUANT_IMG = 'https://www.figma.com/api/mcp/asset/26dd5ad0-7f6e-4767-9bac-3b06fff3c0a6'

// ─── Constants ────────────────────────────────────────────────────────────────
const QUANT_PER_SOL   = 12094248.64
const SOL_USD_PRICE   = 83.66
const QUANT_USD_PRICE = 0.056688
const WALLET_SOL      = 5.32
const WALLET_QUANT    = 12094248.64

const STATS = [
  { label: 'FDV',       value: '$6.7K'   },
  { label: 'Liquidity', value: '$5.3K'   },
  { label: 'Holders',   value: '311'     },
  { label: '24h Vol',   value: '$156.71' },
]

function fmt(n, d = 2) {
  return Number(n).toLocaleString('en-US', { maximumFractionDigits: d })
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="absolute top-[16px] left-[24px] right-[24px] z-10 flex items-center justify-between bg-[#17ed89] rounded-[8px] px-[16px] py-[11px]">
      <div className="flex items-center gap-[16px]">
        {/* check circle */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#000" fillOpacity="0.15" />
          <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-black text-[12px] font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {message}
        </span>
      </div>
      <button onClick={onClose} className="bg-transparent border-0 cursor-pointer p-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </div>
  )
}

// ─── Preset button ────────────────────────────────────────────────────────────
function Preset({ label, onClick }) {
  return (
    <button onClick={onClick} className="bg-[#3b3b3b] px-[8px] py-[4px] rounded-[8px] border-0 cursor-pointer">
      <span className="text-white text-[12px] font-normal">{label}</span>
    </button>
  )
}

// ─── Wallet icon ──────────────────────────────────────────────────────────────
function WalletIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function TradeModal({ onClose }) {
  const [mode, setMode]         = useState('buy')
  const [solInput, setSolInput] = useState('1')
  const [quantInput, setQuantInput] = useState('12094248.64')
  const [toast, setToast]       = useState(null)   // null | string

  const isBuy = mode === 'buy'

  // ── Buy calculations ──
  const solAmt  = parseFloat(solInput)  || 0
  const buyRecv = solAmt * QUANT_PER_SOL
  const buyUSD  = solAmt * SOL_USD_PRICE
  const buyInsufficient = solAmt > WALLET_SOL

  // ── Sell calculations ──
  const quantAmt = parseFloat(String(quantInput).replace(/,/g, '')) || 0
  const sellRecv = (quantAmt / QUANT_PER_SOL) * 0.99
  const sellUSD  = quantAmt * QUANT_USD_PRICE
  const sellInsufficient = quantAmt > WALLET_QUANT

  const insufficient = isBuy ? buyInsufficient : sellInsufficient
  // Sufficient = has balance and amount > 0
  const hasSufficientAndAmount = isBuy
    ? (solAmt > 0 && !buyInsufficient)
    : (quantAmt > 0 && !sellInsufficient)

  function applyBuyPreset(pct) {
    setSolInput(pct === 'MAX' ? String(WALLET_SOL) : (WALLET_SOL * pct / 100).toFixed(4))
  }
  function applySellPreset(pct) {
    setQuantInput(pct === 'MAX' ? String(WALLET_QUANT) : (WALLET_QUANT * pct / 100).toFixed(2))
  }

  function handleAction() {
    if (insufficient || !hasSufficientAndAmount) return
    if (isBuy) {
      setToast('Approve Sol successfully')
    } else {
      setToast('Tokens approved!')
    }
  }

  // ── Button style ──
  function renderButton() {
    if (insufficient) {
      return (
        <button disabled className="w-full h-[58px] rounded-[16px] border border-[#ed1717] bg-[rgba(237,23,23,0.1)] flex items-center justify-center cursor-not-allowed">
          <span className="text-[#ed1717] text-[16px] font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Insufficient Balance
          </span>
        </button>
      )
    }
    if (!hasSufficientAndAmount) {
      // no amount entered yet — show connect wallet (default state)
      return (
        <button disabled className="w-full h-[58px] rounded-[16px] border border-[#24a166] bg-[rgba(36,161,102,0.1)] flex items-center justify-center cursor-not-allowed">
          <span className="text-[#24a066] text-[16px] font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Connect Wallet
          </span>
        </button>
      )
    }
    // sufficient balance
    return (
      <button onClick={handleAction} className="w-full h-[58px] rounded-[16px] bg-[#ed1717] border-0 flex items-center justify-center cursor-pointer">
        <span className="text-white text-[16px] font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {isBuy ? 'Approve Sol' : 'Approve QuantAgent'}
        </span>
      </button>
    )
  }

  // Pay Total box gets green border when balance is sufficient
  const payBorderStyle = hasSufficientAndAmount && !insufficient
    ? { border: '1px solid #23b77a' }
    : {}

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-end"
      style={{ background: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      {/* Toast (outside sheet, at absolute top of modal) */}
      {toast && (
        <Toast message={toast} onClose={() => setToast(null)} />
      )}

      {/* ── Sheet ── */}
      <div
        className="bg-[#111] rounded-t-[20px] flex flex-col pb-[28px]"
        onClick={e => e.stopPropagation()}
      >
        {/* Title row */}
        <div className="flex items-center justify-between px-[24px] pt-[24px] pb-[12px]">
          <span className="text-white text-[20px] font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Trade</span>
          <button onClick={onClose} className="bg-transparent border-0 cursor-pointer p-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-[rgba(255,255,255,0.1)] mx-[24px]" />

        {/* Price + stats */}
        <div className="px-[24px] pt-[14px] pb-[10px] flex flex-col gap-[14px]">
          <div className="flex items-baseline gap-[8px]">
            <span className="text-white text-[20px] font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>$0.056688</span>
            <span className="text-[#ed1717] text-[12px] font-medium">-7.7%</span>
          </div>
          <div className="flex items-start gap-[28px]">
            {STATS.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-[6px]">
                <span className="text-white text-[10px] opacity-50" style={{ fontFamily: "'Montserrat', sans-serif" }}>{label}</span>
                <span className="text-white text-[12px]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buy / Sell toggle */}
        <div className="mx-[24px] mb-[10px] relative h-[40px] bg-[#222] rounded-[6px] flex">
          <div
            className="absolute top-0 bottom-0 w-1/2 rounded-[4px] transition-all duration-200"
            style={{ left: isBuy ? 0 : '50%', background: isBuy ? '#17ed89' : '#ed1717' }}
          />
          <button onClick={() => setMode('buy')} className="relative z-10 flex-1 border-0 bg-transparent cursor-pointer">
            <span className={`text-[16px] font-medium capitalize ${isBuy ? 'text-black' : 'text-white opacity-50'}`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}>Buy</span>
          </button>
          <button onClick={() => setMode('sell')} className="relative z-10 flex-1 border-0 bg-transparent cursor-pointer">
            <span className={`text-[16px] font-medium capitalize ${!isBuy ? 'text-white' : 'text-white opacity-50'}`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}>Sell</span>
          </button>
        </div>

        {/* ── Input boxes ── */}
        <div className="flex flex-col gap-[8px] px-[24px]">

          {/* Pay Total */}
          <div className="bg-[#222] rounded-[8px] px-[16px] py-[18px] flex flex-col gap-[12px]" style={payBorderStyle}>
            <div className="flex items-center justify-between">
              <span className="text-white text-[12px] font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>Pay Total</span>
              <div className="flex items-center gap-[6px]">
                {[25, 50, 75].map(pct => (
                  <Preset key={pct} label={`${pct}%`} onClick={() => isBuy ? applyBuyPreset(pct) : applySellPreset(pct)} />
                ))}
                <Preset label="MAX" onClick={() => isBuy ? applyBuyPreset('MAX') : applySellPreset('MAX')} />
              </div>
            </div>

            {/* Amount */}
            <div className="flex items-center justify-between">
              <input
                type="number"
                value={isBuy ? solInput : quantInput}
                onChange={e => isBuy ? setSolInput(e.target.value) : setQuantInput(e.target.value)}
                className="bg-transparent border-0 outline-none text-white text-[16px] w-[140px]"
                style={{ fontFamily: 'Roboto, sans-serif' }}
                min="0"
              />
              <div className="flex items-center gap-[6px]">
                <span className="text-white text-[14px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {isBuy ? 'SOL' : 'QuantAgent'}
                </span>
                <img src={isBuy ? SOL_IMG : QUANT_IMG} alt="" className="w-6 h-6 rounded-full object-cover" />
              </div>
            </div>

            {/* USD + wallet */}
            <div className="flex items-center justify-between">
              <span className="text-white text-[13px] opacity-40" style={{ fontFamily: 'Roboto, sans-serif' }}>
                ${isBuy ? fmt(buyUSD) : fmt(sellUSD)}
              </span>
              <div className="flex items-center gap-[4px] opacity-40">
                <WalletIcon />
                <span className="text-white text-[13px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {isBuy ? `${WALLET_SOL} SOL` : `${fmt(WALLET_QUANT, 2)} QuantAgent`}
                </span>
              </div>
            </div>
          </div>

          {/* Receive Amount */}
          <div className="bg-[#222] rounded-[8px] px-[16px] py-[18px] flex flex-col gap-[12px]">
            <span className="text-white text-[12px] font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>Receive Amount</span>
            <div className="flex items-center justify-between">
              <span className="text-white text-[16px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {isBuy ? fmt(buyRecv, 2) : sellRecv.toFixed(2)}
              </span>
              <div className="flex items-center gap-[6px]">
                <span className="text-white text-[14px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {isBuy ? 'QuantAgent' : 'SOL'}
                </span>
                <img src={isBuy ? QUANT_IMG : SOL_IMG} alt="" className="w-6 h-6 rounded-full object-cover" />
              </div>
            </div>
            <span className="text-white text-[13px] opacity-40" style={{ fontFamily: 'Roboto, sans-serif' }}>
              ${isBuy ? fmt(buyUSD) : fmt(sellRecv * SOL_USD_PRICE)}
            </span>
          </div>
        </div>

        {/* Action button */}
        <div className="px-[24px] pt-[14px]">
          {renderButton()}
        </div>
      </div>
    </div>
  )
}
