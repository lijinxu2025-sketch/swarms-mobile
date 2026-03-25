import { useState } from 'react'
import StatusBar from '../components/StatusBar'

// ─── Figma Asset URLs ─────────────────────────────────────────────────────────
const ASSETS = {
  heroBg:         'https://www.figma.com/api/mcp/asset/cba07ebc-ca5a-4ed4-9e19-572b0ed0f07b',
  authorAvatar:   'https://www.figma.com/api/mcp/asset/274c6f28-b821-473d-b753-40027dd66c40',
  copyIcon:       'https://www.figma.com/api/mcp/asset/b111a3c1-4085-48aa-8a4e-95f00fa8c6ca',
  downloadIcon:   'https://www.figma.com/api/mcp/asset/dd45c07f-73f7-4220-958b-037622285664',
  aiIcon:         'https://www.figma.com/api/mcp/asset/f926fea7-35e0-4176-99ea-24458573c1d6',
  genImgIcon:     'https://www.figma.com/api/mcp/asset/e39b1a97-1bd1-4845-8210-8705395b48a6',
  generatedImg:   'https://www.figma.com/api/mcp/asset/63d05d3a-ae64-43ee-89d9-573d89a2c771',
  recCard1:       'https://www.figma.com/api/mcp/asset/c009a576-060b-45a4-8e52-948c6ff77c46',
  recCard2:       'https://www.figma.com/api/mcp/asset/543cd4ff-d19a-4307-9e71-49a2b76fa172',
  shareIcon:      'https://www.figma.com/api/mcp/asset/4e3f1908-a548-4674-90ba-3bb7e772a599',
  cartIcon:       'https://www.figma.com/api/mcp/asset/8d45e8b3-ee6c-4fb8-86e5-576c26259b44',
  starIcon:       'https://www.figma.com/api/mcp/asset/e1b391ae-97fa-45a7-b0ad-4d77656beb84',
}

const DESCRIPTION = `Quant Trader Agent is an elite quantitative analyst specializing in comprehensive financial analysis across all asset classes and market conditions. It synthesizes technical indicators, fundamental valuations, market sentiment, and macroeconomic trends into actionable intelligence with precise price targets and risk parameters.

Primary Use Cases: Evaluating individual stocks and securities with multi-dimensional analysis, identifying intermediate price targets grounded in technical and fundamental analysis...`

const PROMPT_TEXT = `Quant Trader Agent is an elite quantitative analyst specializing in comprehensive financial analysis across all asset classes and market conditions. It synthesizes technical indicators, fundamental valuations, market sentiment, and macroeconomic trends into actionable intelligence with precise price targets and risk parameters.

Primary Use Cases: Evaluating individual stocks and securities with multi-dimensional analysis, identifying intermediate price targets grounded in technical and fundamental analysis...`

const API_CODE = `import os
import requests
from dotenv import load_dotenv

# Load API key from environment
load_dotenv()
API_KEY = os.getenv("SWARMS_API_KEY")
BASE_URL = "https://api.swarms.world"

# Configure headers with your API key
headers = {
    "x-api-key": API_KEY,
    "Content-Type": "application/json"
}

def run_single_agent(agent_config, task):
    """
    Run a single agent with the AgentCompletion format.
    """
    payload = {
        "agent_config": agent_config,
        "task": task
    }

    try:
        response = requests.post(
            f"{BASE_URL}/v1/agent/completions",
            headers=headers,
            json=payload
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error making request: {e}")
        return None`

const METADATA = [
  { label: 'Author',             value: 'QuantAgentDev' },
  { label: 'Name',               value: 'Quant Trader Agent' },
  { label: 'Prompt Length',      value: '8,561 characters' },
  { label: 'Description Length', value: '816 characters' },
  { label: 'Tags',               value: '2 tags' },
  { label: 'Links',              value: '1 link' },
  { label: 'Business Model',     value: 'Tokenized', valueClass: 'text-[#52df81]' },
]

const TOKEN_DETAILS = [
  { label: 'Total Supply',    value: '1,000,000,00' },
  { label: '24h Volume (USD)',value: 'US$588' },
  { label: 'LP Liquidity (USD)', value: 'US$12,227' },
  { label: 'Ticker Symbol',   value: 'QUANTAGENT' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionRow({ title, chevronDown = false }) {
  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-white text-[14px] font-bold leading-[1.2]">{title}</span>
      <svg
        width="24" height="24" viewBox="0 0 24 24" fill="white"
        style={{ transform: chevronDown ? 'rotate(90deg)' : 'none' }}
      >
        <path d="M10 6L16 12L10 18" />
      </svg>
    </div>
  )
}

function Section({ children, className = '' }) {
  return (
    <div className={`bg-white/[0.08] px-[24px] py-[16px] w-full ${className}`}>
      {children}
    </div>
  )
}

function CopyButton() {
  return (
    <button className="w-6 h-6 bg-[#393939] rounded-[4px] flex items-center justify-center border-0 cursor-pointer shrink-0">
      <img src={ASSETS.copyIcon} alt="Copy" className="w-[14px] h-[14px]" />
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AgentDetailPage({ onBack }) {
  const [promptTab, setPromptTab] = useState('Preview')
  const promptTabs = ['Preview', 'Markdown', 'Text', 'Framework', 'Api']

  return (
    <div className="flex flex-col h-full bg-black" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <StatusBar />

      {/* Nav bar */}
      <div className="relative flex items-center justify-between px-[24px] h-[56px] shrink-0">
        <button onClick={onBack} className="w-6 h-6 bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
        <span className="text-white text-[16px] font-medium">Detail product</span>
        <div className="flex items-center gap-[8px]">
          <button className="w-6 h-6 bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center">
            <img src={ASSETS.shareIcon} alt="Share" className="w-6 h-6" />
          </button>
          {promptTab === 'Api' && (
            <button className="w-6 h-6 bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center">
              <img src={ASSETS.cartIcon} alt="Cart" className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scroll-hide">

        {/* Hero image */}
        <div className="w-full h-[258px] shrink-0">
          <img src={ASSETS.heroBg} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Product info */}
        <div className="bg-white/[0.08] px-[24px] py-[16px] w-full">
          <div className="flex flex-col gap-[20px]">
            {/* Name + price */}
            <div className="flex flex-col gap-[8px]">
              <span className="text-white text-[24px] font-bold leading-[1.2]">Quant Trader Agent</span>
              <div className="flex items-center gap-[6px]">
                <div className="bg-[#2b2b2b] px-[8px] py-[6px] rounded-[6px]">
                  <span className="text-white text-[10px] font-bold">US$15.00</span>
                </div>
                <span className="text-white text-[12px] font-normal">(200 people used this)</span>
              </div>
            </div>
            {/* Author row */}
            <div className="border-t border-b border-white/10 py-[7px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[17px]">
                  <div className="relative w-[46px] h-[46px] shrink-0">
                    <img src={ASSETS.authorAvatar} alt="" className="w-full h-full object-cover rounded-full" />
                    <span className="absolute inset-0 flex items-center justify-center text-white text-[18px] font-bold">Q</span>
                  </div>
                  <span className="text-white text-[13px] font-semibold">QuantAgentDev</span>
                </div>
                <button className="w-[100px] h-[35px] rounded-[8px] border border-white/10 bg-transparent text-white text-[14px] cursor-pointer">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <Section>
          <div className="flex flex-col gap-[16px]">
            <span className="text-white text-[14px] font-bold leading-[1.2]">Description of product</span>
            <p className="text-white text-[12px] font-normal leading-[1.4] m-0 whitespace-pre-line">{DESCRIPTION}</p>
          </div>
        </Section>

        {/* Main Prompt */}
        <Section className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[20px]">
            <SectionRow title="Main Prompt" />
            {/* Tabs */}
            <div className="flex gap-[20px] items-center">
              {promptTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setPromptTab(tab)}
                  className="bg-transparent border-0 cursor-pointer p-0 flex flex-col items-center gap-[2px]"
                >
                  <span className={`text-[12px] ${tab === promptTab ? 'font-bold text-white' : 'font-normal text-white'}`}>{tab}</span>
                  {tab === promptTab && <div className="h-[1px] bg-white w-full" />}
                </button>
              ))}
            </div>
          </div>
          {/* Prompt body */}
          {promptTab === 'Api' ? (
            <pre className="text-white text-[12px] font-normal leading-[1.4] m-0 whitespace-pre-wrap overflow-x-auto" style={{ fontFamily: 'monospace' }}>{API_CODE}</pre>
          ) : (
            <p className="text-white text-[12px] font-normal leading-[1.4] m-0 whitespace-pre-line">{PROMPT_TEXT}</p>
          )}
          {/* Copy / Download */}
          <div className="flex gap-[4px]">
            <CopyButton />
            <button className="w-6 h-6 bg-[#393939] rounded-[4px] flex items-center justify-center border-0 cursor-pointer shrink-0">
              <img src={ASSETS.downloadIcon} alt="Download" className="w-[14px] h-[14px]" />
            </button>
          </div>
        </Section>

        {/* Chat */}
        <Section>
          <SectionRow title="Chat" />
        </Section>

        {/* Images */}
        <Section>
          <SectionRow title="Images" chevronDown />
        </Section>

        {/* AI Generated Images */}
        <div className="bg-white/[0.08] py-[8px] w-full">
          <div className="flex flex-col gap-[16px]">
            {/* Header */}
            <div className="flex items-center gap-[12px] px-[24px]">
              <div className="w-[36px] h-[36px] bg-[rgba(88,28,135,0.3)] rounded-[8px] flex items-center justify-center shrink-0">
                <img src={ASSETS.aiIcon} alt="" className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="text-[#f4f4f5] text-[14px] font-bold leading-[1.2]">AI Generated Images</span>
                <span className="text-white/50 text-[10px]">Generate and manage product images using AI</span>
              </div>
            </div>
            {/* Generate button */}
            <div className="px-[24px]">
              <button className="flex items-center gap-[8px] bg-[#9333ea] px-[16px] py-[8px] rounded-[6px] border-0 cursor-pointer">
                <img src={ASSETS.genImgIcon} alt="" className="w-4 h-4" />
                <span className="text-white text-[12px] font-normal">Generate Images</span>
              </button>
            </div>
            {/* Note */}
            <div className="px-[10px]">
              <div className="border border-[rgba(237,0,0,0.5)] rounded-[8px] p-[10px]">
                <p className="text-white text-[10px] font-normal leading-[1.8] m-0">
                  Note: Each generation creates 2 unique images. All generated images are public and visible to everyone.
                </p>
              </div>
            </div>
            {/* Generated image cards */}
            <div className="flex gap-[17px] px-[24px] overflow-x-auto scroll-hide">
              {[0, 1].map(i => (
                <div key={i} className="flex flex-col rounded-[10px] overflow-hidden shrink-0 w-[155px]">
                  <img src={ASSETS.generatedImg} alt="" className="w-full h-[100px] object-cover" />
                  <div className="bg-[#0d0d0d] px-[11px] py-[12px] flex flex-col gap-[6px] h-[96px]">
                    <span className="text-[#a1a1aa] text-[8px] font-normal leading-[2]">Generated 2026/1/3</span>
                    <p className="text-[#f5f8fa] text-[8px] font-medium leading-[1.2] m-0 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
                      Create a dynamic and vibrant promotional banner for the Quant Trader Agent, featuring a futuristic city…
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metadata */}
        <Section className="flex flex-col gap-[10px]">
          <SectionRow title="Metadata" chevronDown />
          <div className="flex items-center justify-between">
            <span className="text-white text-[12px] font-normal">Prompt ID</span>
            <CopyButton />
          </div>
          <p className="text-white text-[12px] font-normal m-0 break-all">6d165e47-1827-4abe-9a84-b25005d8e3b4</p>
          {METADATA.map(({ label, value, valueClass }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-white text-[12px] font-normal">{label}</span>
              <span className={`text-[12px] font-normal ${valueClass || 'text-white'}`}>{value}</span>
            </div>
          ))}
        </Section>

        {/* Tokenization Details */}
        <Section className="flex flex-col gap-[10px]">
          <SectionRow title="Tokenization Details" chevronDown />
          <div className="flex items-center justify-between">
            <span className="text-white text-[12px] font-normal">Contract Address</span>
            <CopyButton />
          </div>
          <p className="text-white text-[12px] font-normal m-0 break-all">GovbZFQxSk8rGy5S5L54uSWmrGaUJngEypSUDfwswrm</p>
          {TOKEN_DETAILS.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-white text-[12px] font-normal">{label}</span>
              <span className="text-white text-[12px] font-normal">{value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <span className="text-white text-[12px] font-normal">Pool Address</span>
            <CopyButton />
          </div>
          <p className="text-white text-[12px] font-normal m-0 break-all">3TKV9xXhigwbDUDG4dL4S8L9PHiDFMf3yBXvWrG</p>
        </Section>

        {/* Reviews */}
        <Section>
          <SectionRow title="Reviews" />
        </Section>

        {/* Items You'd Like */}
        <div className="bg-white/[0.08] w-full pb-[16px]">
          <div className="px-[24px] py-[16px]">
            <SectionRow title="Items You'd Like" />
          </div>
          <div className="flex gap-[17px] px-[24px] overflow-x-auto scroll-hide">
            {[
              { img: ASSETS.recCard1, tag: 'prompt', name: 'Pineapple Agent', price: 'Free', stars: 5 },
              { img: ASSETS.recCard2, tag: 'prompt', name: 'Quant Trader Agent', price: 'Free', stars: 5 },
            ].map((item, i) => (
              <div key={i} className="flex flex-col rounded-[10px] overflow-hidden shrink-0 w-[155px]">
                <div className="relative h-[100px]">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute top-[8px] right-[8px] flex items-center gap-[2px] bg-black/40 backdrop-blur-sm rounded-full px-[5px] py-[2px]">
                    <span className="text-[#fed900] text-[8px] font-bold">{item.stars}</span>
                    <img src={ASSETS.starIcon} alt="" className="w-[9px] h-[9px]" />
                  </div>
                </div>
                <div className="bg-[#0d0d0d] px-[11px] py-[12px] flex flex-col gap-[6px] h-[96px]">
                  <div className="bg-black/35 backdrop-blur-sm border border-white/16 rounded-full px-[6px] py-[2px] self-start">
                    <span className="text-white text-[8px] font-bold capitalize">{item.tag}</span>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[#f5f8fa] text-[12px] font-medium leading-[1.2] truncate m-0">{item.name}</p>
                    <p className="text-white text-[14px] font-semibold m-0">{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spacer for fixed footer */}
        <div className="h-[83px]" />
      </div>

      {/* Fixed footer */}
      <div className="shrink-0 absolute bottom-0 left-0 right-0 h-[83px] border-t border-[rgba(64,64,64,0.4)]"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(17,17,17,0.7))' }}>
        <div className="flex items-center justify-center h-full px-[24px]">
          <button className="w-full h-[58px] bg-[#ed1717] rounded-[16px] border-0 cursor-pointer">
            <span className="text-white text-[16px] font-bold">Trade now</span>
          </button>
        </div>
      </div>
    </div>
  )
}
