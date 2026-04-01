import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import TradeModal from '../components/TradeModal'

// ─── Assets ───────────────────────────────────────────────────────────────────
const ASSETS = {
  heroBg:       '/image/agent_heroBg.webp',
  authorAvatar: '/image/agent_authorAvatar.webp',
  copyIcon:     '/image/agent_copyIcon.webp',
  downloadIcon: '/image/agent_downloadIcon.webp',
  aiIcon:       '/image/agent_aiIcon.webp',
  genImgIcon:   '/image/agent_genImgIcon.webp',
  generatedImg: '/image/agent_generatedImg.webp',
  recCard1:     '/image/agent_recCard1.webp',
  recCard2:     '/image/agent_recCard2.webp',
  shareIcon:    '/image/agent_shareIcon.webp',
  cartIcon:     '/image/agent_cartIcon.webp',
  starIcon:     '/image/agent_starIcon.webp',
}

const DESCRIPTION = `Quant Trader Agent is an elite quantitative analyst specializing in comprehensive financial analysis across all asset classes and market conditions. It synthesizes technical indicators, fundamental valuations, market sentiment, and macroeconomic trends into actionable intelligence with precise price targets and risk parameters.

Primary Use Cases: Evaluating individual stocks and securities with multi-dimensional analysis, identifying intermediate price targets grounded in technical and fundamental analysis...`

const PROMPT_TEXT = `Quant Trader Agent is an elite quantitative analyst specializing in comprehensive financial analysis across all asset classes and market conditions. It synthesizes technical indicators, fundamental valuations, market sentiment, and macroeconomic trends into actionable intelligence with precise price targets and risk parameters.

Primary Use Cases: Evaluating individual stocks and securities with multi-dimensional analysis, identifying intermediate price targets grounded in technical and fundamental analysis...`

const API_CODE = `import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("SWARMS_API_KEY")
BASE_URL = "https://api.swarms.world"

headers = {
    "x-api-key": API_KEY,
    "Content-Type": "application/json"
}

def run_quant_agent(task: str):
    payload = {
        "agent_config": {
            "agent_name": "Quant-Trader-Agent",
            "system_prompt": QUANT_AGENT_SYS_PROMPT,
            "model_name": "gpt-4o",
            "temperature": 0.1,
        },
        "task": task
    }
    response = requests.post(
        f"{BASE_URL}/v1/agent/completions",
        headers=headers,
        json=payload
    )
    return response.json()`

const METADATA_ROWS = [
  { label: 'Author',             value: 'QuantAgentDev' },
  { label: 'Name',               value: 'Quant Trader Agent' },
  { label: 'Prompt Length',      value: '8,561 characters' },
  { label: 'Description Length', value: '816 characters' },
  { label: 'Tags',               value: '2 tags' },
  { label: 'Links',              value: '1 link' },
]

const TOKEN_ROWS = [
  { label: 'Total Supply',    value: '1,000,000,00' },
  { label: '24h Volume (USD)', value: 'US$588' },
  { label: 'LP Liquidity (USD)', value: 'US$12,227' },
  { label: 'Ticker Symbol',   value: 'QUANTAGENT' },
]

// ─── Icon helpers ─────────────────────────────────────────────────────────────
function ChevronRight({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="white">
      <path d="M10 6L16 12L10 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function ChevronDown({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronUp({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M6 15L12 9L18 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Section header row ───────────────────────────────────────────────────────
function SectionHeader({ title, chevron = 'right' }) {
  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-white text-[14px] font-bold leading-[1.2]">{title}</span>
      {chevron === 'right' && <ChevronRight />}
      {chevron === 'down'  && <ChevronDown />}
      {chevron === 'up'    && <ChevronUp />}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AgentDetailPage({ onBack, onReviews }) {
  const [promptTab, setPromptTab] = useState('Preview')
  const [showTrade,    setShowTrade]    = useState(false)
  const [chatOpen,     setChatOpen]     = useState(false)
  const [imagesOpen,   setImagesOpen]   = useState(true)
  const [metadataOpen, setMetadataOpen] = useState(true)
  const [tokenOpen,    setTokenOpen]    = useState(true)

  const TABS = ['Preview', 'Markdown', 'Text', 'Framework', 'Api']

  return (
    <div className="flex flex-col h-full bg-black overflow-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <StatusBar />

      {/* ── Nav bar ── */}
      <div className="flex items-center justify-between px-[24px] h-[56px] shrink-0">
        <button onClick={onBack} className="w-6 h-6 bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
        <span className="text-white text-[16px] font-medium">Detail product</span>
        <div className="flex items-center gap-[8px]">
          {promptTab === 'Api' && (
            <button className="w-6 h-6 bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center">
              <img src={ASSETS.cartIcon} alt="Cart" className="w-6 h-6" />
            </button>
          )}
          <button className="w-6 h-6 bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center">
            <img src={ASSETS.shareIcon} alt="Share" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto scroll-hide">

        {/* Hero image */}
        <div className="w-full h-[258px] shrink-0">
          <img src={ASSETS.heroBg} alt="" className="w-full h-full object-cover" />
        </div>

        {/* ── Product info ── */}
        <div className="bg-[rgba(255,255,255,0.08)] px-[24px] py-[16px] flex flex-col gap-[20px]">
          {/* Name + price */}
          <div className="flex flex-col gap-[8px] w-[259px]">
            <span className="text-white text-[24px] font-bold leading-[1.2]">Quant Trader Agent</span>
            <div className="flex items-center gap-[6px]">
              <div className="bg-[#2b2b2b] px-[8px] py-[6px] rounded-[6px]">
                <span className="text-white text-[10px] font-bold">US$15.00</span>
              </div>
              <span className="text-white text-[12px] font-normal">(200 people used this)</span>
            </div>
          </div>
          {/* Author row */}
          <div className="border-t border-b border-[rgba(255,255,255,0.1)] py-[7px] flex items-center justify-between">
            <div className="flex items-center gap-[17px]">
              {/* Avatar */}
              <div className="relative w-[46px] h-[46px] shrink-0">
                <img src={ASSETS.authorAvatar} alt="" className="absolute inset-0 w-full h-full" />
                <span className="absolute inset-0 flex items-center justify-center text-white text-[18px] font-bold">Q</span>
              </div>
              <span className="text-white text-[13px] font-semibold">QuantAgentDev</span>
            </div>
            <div className="w-[100px] h-[35px] border border-[rgba(255,255,255,0.1)] rounded-[8px] flex items-center justify-center">
              <span className="text-white text-[14px]">Follow</span>
            </div>
          </div>
        </div>

        {/* ── Gap ── */}
        <div className="h-[8px] bg-black" />

        {/* ── Description of product ── */}
        <div className="bg-[rgba(255,255,255,0.08)] px-[24px] py-[16px] flex flex-col gap-[16px]">
          <span className="text-white text-[14px] font-bold leading-[1.2]">Description of product</span>
          <p className="text-white text-[12px] font-normal leading-[1.4] m-0">{DESCRIPTION}</p>
        </div>

        <div className="h-[8px] bg-black" />

        {/* ── Main Prompt ── */}
        <div className="bg-[rgba(255,255,255,0.08)] px-[24px] py-[16px] flex flex-col gap-[1px]">
          <div className="flex flex-col gap-[20px]">
            {/* Title row */}
            <SectionHeader title="Main Prompt" chevron="right" />

            {/* Tabs */}
            <div className="flex items-center gap-[20px]">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setPromptTab(tab)}
                  className="bg-transparent border-0 cursor-pointer p-0 flex flex-col items-center gap-[4px]"
                >
                  <span className={`text-[12px] leading-[1.2] whitespace-nowrap ${promptTab === tab ? 'text-white font-bold' : 'text-white font-normal'}`}>
                    {tab}
                  </span>
                  {promptTab === tab && (
                    <div className="h-[2px] w-full bg-white rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            {promptTab === 'Api' ? (
              <pre className="text-white text-[12px] font-normal leading-[1.4] m-0 whitespace-pre-wrap overflow-x-auto" style={{ fontFamily: 'monospace' }}>{API_CODE}</pre>
            ) : (
              <p className="text-white text-[12px] font-normal leading-[1.4] m-0 whitespace-pre-line">{PROMPT_TEXT}</p>
            )}
          </div>

          {/* Copy + Download icons */}
          <div className="flex items-center gap-[4px] justify-end pt-[1px]">
            <div className="bg-[#393939] rounded-[4px] w-6 h-6 flex items-center justify-center">
              <img src={ASSETS.copyIcon} alt="Copy" className="w-[14px] h-[14px]" />
            </div>
            <div className="bg-[#393939] rounded-[4px] w-6 h-6 flex items-center justify-center">
              <img src={ASSETS.downloadIcon} alt="Download" className="w-[14px] h-[14px]" />
            </div>
          </div>
        </div>

        <div className="h-[8px] bg-black" />

        {/* ── Chat ── */}
        <button
          onClick={() => setChatOpen(o => !o)}
          className="bg-[rgba(255,255,255,0.08)] px-[24px] py-[16px] w-full border-0 cursor-pointer text-left"
        >
          <SectionHeader title="Chat" chevron={chatOpen ? 'up' : 'down'} />
        </button>
        {chatOpen && (
          <div className="bg-[rgba(255,255,255,0.08)] px-[24px] py-[16px]">
            <p className="text-white text-[12px] font-normal opacity-50 m-0">Chat functionality coming soon.</p>
          </div>
        )}

        <div className="h-[8px] bg-black" />

        {/* ── Images ── */}
        <button
          onClick={() => setImagesOpen(o => !o)}
          className="bg-[rgba(255,255,255,0.08)] px-[24px] py-[16px] w-full border-0 cursor-pointer text-left"
        >
          <SectionHeader title="Images" chevron={imagesOpen ? 'up' : 'down'} />
        </button>

        {imagesOpen && (
          <>
        <div className="h-[8px] bg-black" />

        {/* ── AI Generated Images ── */}
        <div className="bg-[rgba(255,255,255,0.08)] py-[8px] flex flex-col gap-[16px]">
          {/* Header row */}
          <div className="flex items-center gap-[12px] px-[24px]">
            <div className="w-[36px] h-[36px] rounded-[8px] bg-[rgba(88,28,135,0.3)] flex items-center justify-center shrink-0">
              <img src={ASSETS.aiIcon} alt="" className="w-[20px] h-[20px]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[#f4f4f5] text-[14px] font-bold leading-[1.4]">AI Generated Images</span>
              <span className="text-white text-[10px] opacity-50 leading-[1.4]">Generate and manage product images using AI</span>
            </div>
          </div>

          {/* Generate button + note */}
          <div className="flex flex-col gap-[16px] items-end px-[24px]">
            <button className="bg-[#9333ea] px-[16px] py-[8px] rounded-[6px] flex items-center gap-[8px] border-0 cursor-pointer">
              <img src={ASSETS.genImgIcon} alt="" className="w-4 h-4" />
              <span className="text-white text-[12px] font-normal">Generate Images</span>
            </button>
          </div>

          {/* Note */}
          <div className="px-[10px]">
            <div className="border border-[rgba(237,0,0,0.5)] rounded-[8px] p-[10px]">
              <p className="text-white text-[10px] font-normal leading-[20px] m-0 w-full">
                Note: Each generation creates 2 unique images. All generated images are public and visible to everyone.
              </p>
            </div>
          </div>

          {/* Generated image cards */}
          <div className="flex gap-[17px] items-center px-[24px]">
            {[0, 1].map(i => (
              <div key={i} className="flex flex-col w-[155px] shrink-0">
                <img src={ASSETS.generatedImg} alt="" className="w-full h-[100px] object-cover" />
                <div className="bg-[#0d0d0d] px-[11px] py-[12px] flex flex-col gap-[6px] rounded-bl-[10px] rounded-br-[10px]">
                  <span className="text-[#a1a1aa] text-[8px] capitalize leading-[16px]">Generated 2026/1/3</span>
                  <p className="text-[#f5f8fa] text-[8px] font-medium leading-[1.2] m-0 line-clamp-3">
                    Create a dynamic and vibrant promotional banner for the Quant Trader Agent, featuring a futuristic city…
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
          </>
        )}

        <div className="h-[8px] bg-black" />

        {/* ── Metadata ── */}
        <div className="bg-[rgba(255,255,255,0.08)] px-[24px] py-[16px] flex flex-col gap-[10px]">
          <button
            onClick={() => setMetadataOpen(o => !o)}
            className="bg-transparent border-0 cursor-pointer p-0 w-full text-left"
          >
            <SectionHeader title="Metadata" chevron={metadataOpen ? 'up' : 'down'} />
          </button>
          {metadataOpen && (
            <>
              {/* Prompt ID */}
              <div className="flex flex-col gap-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-white text-[12px] font-normal">Prompt ID</span>
                  <div className="bg-[#393939] rounded-[4px] w-6 h-6 flex items-center justify-center">
                    <img src={ASSETS.copyIcon} alt="" className="w-[14px] h-[14px]" />
                  </div>
                </div>
                <span className="text-white text-[12px] font-normal break-all">6d165e47-1827-4abe-9a84-b25005d8e3b4</span>
              </div>
              {/* Rows */}
              {METADATA_ROWS.map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-white text-[12px] font-normal">{label}</span>
                  <span className="text-white text-[12px] font-normal">{value}</span>
                </div>
              ))}
              {/* Business Model - green */}
              <div className="flex items-center justify-between">
                <span className="text-white text-[12px] font-normal">Business Model</span>
                <span className="text-[#52df81] text-[12px] font-normal">Tokenized</span>
              </div>
            </>
          )}
        </div>

        <div className="h-[8px] bg-black" />

        {/* ── Tokenization Details ── */}
        <div className="bg-[rgba(255,255,255,0.08)] px-[24px] py-[16px] flex flex-col gap-[10px]">
          <button
            onClick={() => setTokenOpen(o => !o)}
            className="bg-transparent border-0 cursor-pointer p-0 w-full text-left"
          >
            <SectionHeader title="Tokenization Details" chevron={tokenOpen ? 'up' : 'down'} />
          </button>
          {tokenOpen && (
            <>
              {/* Contract Address */}
              <div className="flex flex-col gap-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-white text-[12px] font-normal">Contract Address</span>
                  <div className="bg-[#393939] rounded-[4px] w-6 h-6 flex items-center justify-center">
                    <img src={ASSETS.copyIcon} alt="" className="w-[14px] h-[14px]" />
                  </div>
                </div>
                <span className="text-white text-[12px] font-normal break-all">GovbZFQxSk8rGy5S5L54uSWmrGaUJngEypSUDfwswrm</span>
              </div>
              {TOKEN_ROWS.map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-white text-[12px] font-normal">{label}</span>
                  <span className="text-white text-[12px] font-normal">{value}</span>
                </div>
              ))}
              {/* Pool Address */}
              <div className="flex flex-col gap-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-white text-[12px] font-normal">Pool Address</span>
                  <div className="bg-[#393939] rounded-[4px] w-6 h-6 flex items-center justify-center">
                    <img src={ASSETS.copyIcon} alt="" className="w-[14px] h-[14px]" />
                  </div>
                </div>
                <span className="text-white text-[12px] font-normal break-all">3TKV9xXhigwbDUDG4dL4S8L9PHiDFMf3yBXvWrG</span>
              </div>
            </>
          )}
        </div>

        <div className="h-[8px] bg-black" />

        {/* ── Reviews ── */}
        <button
          onClick={onReviews}
          className="bg-[rgba(255,255,255,0.08)] px-[24px] py-[16px] w-full border-0 cursor-pointer text-left"
        >
          <SectionHeader title="Reviews" chevron="right" />
        </button>

        <div className="h-[8px] bg-black" />

        {/* ── Items You'd Like ── */}
        <div className="bg-[rgba(255,255,255,0.08)] flex flex-col gap-[16px] pb-[16px]">
          <div className="px-[24px] py-[16px]">
            <SectionHeader title="Items You'd Like" chevron="right" />
          </div>
          <div className="flex gap-[17px] items-center px-[24px]">
            {/* Card 1 - Pineapple Agent */}
            <div className="flex flex-col w-[155px] shrink-0">
              <div className="relative">
                <img src={ASSETS.recCard1} alt="" className="w-full h-[100px] object-cover" />
                {/* Star badge */}
                <div className="absolute top-[8px] right-[8px] flex items-center gap-[2px] bg-black/40 backdrop-blur-sm rounded-[10px] px-[5px] py-[1px]">
                  <img src={ASSETS.starIcon} alt="" className="w-[9px] h-[9px]" />
                  <span className="text-[#fed900] text-[8px] font-bold">5</span>
                </div>
              </div>
              <div className="bg-[#0d0d0d] px-[11px] py-[12px] flex flex-col gap-[6px] rounded-bl-[10px] rounded-br-[10px]">
                <div className="bg-[rgba(0,0,0,0.35)] backdrop-blur-sm border-[0.5px] border-[rgba(255,255,255,0.16)] rounded-full px-[6px] py-[2px] self-start">
                  <span className="text-white text-[8px] font-bold capitalize">prompt</span>
                </div>
                <span className="text-[#f5f8fa] text-[12px] font-medium leading-[1.2] truncate">Pineapple Agent</span>
                <span className="text-white text-[14px] font-semibold">Free</span>
              </div>
            </div>
            {/* Card 2 - Quant Trader Agent */}
            <div className="flex flex-col w-[155px] shrink-0">
              <div className="relative">
                <img src={ASSETS.recCard2} alt="" className="w-full h-[100px] object-cover" />
                <div className="absolute top-[8px] right-[8px] flex items-center gap-[2px] bg-black/40 backdrop-blur-sm rounded-[10px] px-[5px] py-[1px]">
                  <img src={ASSETS.starIcon} alt="" className="w-[9px] h-[9px]" />
                  <span className="text-[#fed900] text-[8px] font-bold">5</span>
                </div>
              </div>
              <div className="bg-[#0d0d0d] px-[11px] py-[12px] flex flex-col gap-[6px] rounded-bl-[10px] rounded-br-[10px]">
                <div className="bg-[rgba(0,0,0,0.35)] backdrop-blur-sm border-[0.5px] border-[rgba(255,255,255,0.16)] rounded-full px-[6px] py-[2px] self-start">
                  <span className="text-white text-[8px] font-bold capitalize">prompt</span>
                </div>
                <span className="text-[#f5f8fa] text-[12px] font-medium leading-[1.2] truncate">Quant Trader Agent</span>
                <span className="text-white text-[14px] font-semibold">Free</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom padding for fixed button */}
        <div className="h-[83px]" />
      </div>

      {/* ── Fixed bottom: Trade now ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[83px] border-t border-[rgba(64,64,64,0.4)] shrink-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-[#111]/70" />
      </div>
      <div className="absolute bottom-[12px] left-[24px] right-[24px]">
        <button
          onClick={() => setShowTrade(true)}
          className="w-full h-[58px] bg-[#ed1717] rounded-[16px] border-0 cursor-pointer flex items-center justify-center"
        >
          <span className="text-white text-[16px] font-bold">Trade now</span>
        </button>
      </div>

      {/* Trade modal */}
      {showTrade && <TradeModal onClose={() => setShowTrade(false)} />}
    </div>
  )
}
