import { useState } from 'react'
import StatusBar from '../components/StatusBar'

// ─── Icons ────────────────────────────────────────────────────────────────────
function AgentIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="8" width="16" height="12" rx="3" stroke={active ? '#60a5fa' : '#a1a1aa'} strokeWidth="1.5" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke={active ? '#60a5fa' : '#a1a1aa'} strokeWidth="1.5" />
      <circle cx="9" cy="14" r="1.5" fill={active ? '#60a5fa' : '#a1a1aa'} />
      <circle cx="15" cy="14" r="1.5" fill={active ? '#60a5fa' : '#a1a1aa'} />
      <path d="M9 17h6" stroke={active ? '#60a5fa' : '#a1a1aa'} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function PromptIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1z" stroke={active ? '#60a5fa' : '#a1a1aa'} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 9h8M8 12h5" stroke={active ? '#60a5fa' : '#a1a1aa'} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ToolIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke={active ? '#60a5fa' : '#a1a1aa'} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
      <path d="M12 8v1M12 11v5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 16V8M8 12l4-4 4 4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 20h12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function AddIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Shared field components ──────────────────────────────────────────────────
function FieldLabel({ children }) {
  return (
    <p className="text-white text-[12px] font-medium mb-[8px]">{children}</p>
  )
}

function TextInput({ placeholder, value, onChange }) {
  return (
    <input
      className="w-full h-[49px] rounded-[8px] px-[12px] text-white text-[14px] font-medium bg-white/[0.08] border border-transparent outline-none placeholder-white/50 focus:border-[#3b82f6]"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
}

function TextArea({ placeholder, value, onChange, rows = 4 }) {
  return (
    <textarea
      className="w-full rounded-[8px] px-[12px] py-[12px] text-white text-[14px] font-medium bg-white/[0.08] border border-transparent outline-none placeholder-white/50 focus:border-[#3b82f6] resize-none"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={rows}
    />
  )
}

function SelectField({ placeholder }) {
  return (
    <div className="w-full h-[49px] rounded-[8px] px-[12px] bg-white/[0.08] flex items-center justify-between cursor-pointer">
      <span className="text-white/50 text-[14px] font-medium">{placeholder}</span>
      <ChevronDown />
    </div>
  )
}

const CATEGORIES = [
  'All', 'Non x402', 'x402', 'Healthcare', 'Education',
  'Finance', 'Research', 'Public Safety', 'Marketing',
  'Sales', 'Customer Support', 'Other',
]

function CategorySelect({ selected, onChange }) {
  const [open, setOpen] = useState(false)

  function toggle(cat) {
    if (selected.includes(cat)) {
      onChange(selected.filter(c => c !== cat))
    } else {
      onChange([...selected, cat])
    }
  }

  const displayText = selected.length === 0
    ? 'Select categories'
    : selected.join(', ')

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full h-[49px] rounded-[8px] px-[12px] bg-white/[0.08] flex items-center justify-between cursor-pointer border-0"
      >
        <span className={`text-[14px] font-medium truncate pr-2 ${selected.length === 0 ? 'text-white/50' : 'text-white'}`}>
          {displayText}
        </span>
        <span className={`transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`}>
          <ChevronDown />
        </span>
      </button>

      {/* Dropdown list */}
      {open && (
        <div className="absolute left-0 right-0 top-[53px] z-50 bg-[#1a1a1a] border border-white/[0.12] rounded-[10px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          {CATEGORIES.map((cat, i) => {
            const isSelected = selected.includes(cat)
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggle(cat)}
                className={`w-full flex items-center justify-between px-[16px] py-[13px] text-[14px] font-medium cursor-pointer border-0 text-left transition-colors ${
                  i < CATEGORIES.length - 1 ? 'border-b border-white/[0.06]' : ''
                } ${isSelected ? 'bg-white/[0.06] text-white' : 'bg-transparent text-white/70 hover:bg-white/[0.04]'}`}
              >
                <span>{cat}</span>
                {isSelected && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L19 7" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Type-specific sections ───────────────────────────────────────────────────
function AgentSection({ codeTab, setCodeTab }) {
  const tabs = ['code', 'x402 URL', 'MCP URL']
  return (
    <div className="flex flex-col gap-[16px]">
      {/* Code tab switcher */}
      <div className="h-[44px] bg-white/[0.08] rounded-[8px] flex items-stretch overflow-hidden">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setCodeTab(tab)}
            className={`flex-1 text-[12px] font-medium border-0 cursor-pointer transition-colors ${
              codeTab === tab
                ? 'bg-white/20 text-white rounded-[6px]'
                : 'bg-transparent text-white/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {codeTab === 'code' && (
        <>
          {/* Traditional Agent Code info */}
          <div className="bg-[rgba(59,130,246,0.08)] border border-[#3b82f6] rounded-[4px] p-[12px]">
            <p className="text-[#3b82f6] text-[12px] font-medium mb-[6px]">Traditional Agent Code</p>
            <p className="text-[#3b82f6]/70 text-[10px] leading-relaxed">
              Provide your agent's code directly. Include type hints and docstrings for better validation and documentation. The code will be validated before submission.
            </p>
          </div>

          {/* Programming Language */}
          <div>
            <FieldLabel>Programming Language</FieldLabel>
            <SelectField placeholder="Python" />
          </div>

          {/* Package Requirements */}
          <div>
            <div className="flex items-center justify-between mb-[8px]">
              <FieldLabel>Package Requirements</FieldLabel>
              <button className="flex items-center gap-[2px] text-white text-[12px] font-medium bg-transparent border-0 cursor-pointer">
                Add <AddIcon />
              </button>
            </div>
            <div className="flex gap-[8px]">
              <div className="flex-1 h-[49px] rounded-[8px] bg-white/[0.08] flex items-center px-[12px]">
                <span className="text-white/50 text-[14px] font-medium">requests</span>
              </div>
              <div className="flex-1 h-[49px] rounded-[8px] bg-white/[0.08] flex items-center px-[12px]">
                <span className="text-white/50 text-[14px] font-medium">pip3 install requests</span>
              </div>
            </div>
          </div>

          {/* Agent Code */}
          <div>
            <FieldLabel>Agent Code</FieldLabel>
            <TextArea placeholder="Paste your agent's code here... (Add types and docstrings)" rows={5} value="" onChange={() => {}} />
          </div>
        </>
      )}

      {codeTab === 'x402 URL' && (
        <div>
          <FieldLabel>x402 URL</FieldLabel>
          <TextInput placeholder="Enter x402 endpoint URL" value="" onChange={() => {}} />
        </div>
      )}

      {codeTab === 'MCP URL' && (
        <div>
          <FieldLabel>MCP URL</FieldLabel>
          <TextInput placeholder="Enter MCP server URL" value="" onChange={() => {}} />
        </div>
      )}
    </div>
  )
}

function PromptSection() {
  return (
    <div>
      <FieldLabel>Prompt Content</FieldLabel>
      <TextArea placeholder="Enter your prompt here... (Add clear instructions and examples)" rows={5} value="" onChange={() => {}} />
    </div>
  )
}

function ToolSection() {
  return (
    <div className="flex flex-col gap-[16px]">
      {/* Programming Language */}
      <div>
        <FieldLabel>Programming Language</FieldLabel>
        <SelectField placeholder="Python" />
      </div>

      {/* Package Requirements */}
      <div>
        <div className="flex items-center justify-between mb-[8px]">
          <FieldLabel>Package Requirements</FieldLabel>
          <button className="flex items-center gap-[2px] text-white text-[12px] font-medium bg-transparent border-0 cursor-pointer">
            Add <AddIcon />
          </button>
        </div>
        <div className="flex gap-[8px]">
          <div className="flex-1 h-[49px] rounded-[8px] bg-white/[0.08] flex items-center px-[12px]">
            <span className="text-white/50 text-[14px] font-medium">requests</span>
          </div>
          <div className="flex-1 h-[49px] rounded-[8px] bg-white/[0.08] flex items-center px-[12px]">
            <span className="text-white/50 text-[14px] font-medium">pip3 install requests</span>
          </div>
        </div>
      </div>

      {/* Tool Code */}
      <div>
        <FieldLabel>Tool Code</FieldLabel>
        <TextArea placeholder="Enter tool code here... (Add types and docstrings)" rows={4} value="" onChange={() => {}} />
      </div>
    </div>
  )
}

// ─── Pricing Button ───────────────────────────────────────────────────────────
function PricingButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`h-[44px] px-[16px] rounded-[7px] text-[13px] font-mono flex items-center gap-[8px] border cursor-pointer transition-all ${
        active
          ? 'bg-[rgba(59,130,246,0.1)] border-[#3b82f6] text-[#60a5fa] shadow-[0_9px_14px_-3px_rgba(59,130,246,0.2)]'
          : 'bg-[rgba(39,39,42,0.5)] border-[#3f3f46] text-[#a1a1aa]'
      }`}
    >
      <span className={`w-[7px] h-[7px] rounded-full ${active ? 'bg-[#3b82f6]' : 'bg-[#52525b]'}`} />
      {label}
    </button>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LaunchAgentPage({ onBack }) {
  const [type, setType]         = useState('agent')
  const [codeTab, setCodeTab]   = useState('code')
  const [pricing, setPricing]       = useState('Free')
  const [name, setName]             = useState('')
  const [description, setDesc]      = useState('')
  const [githubUrl, setGithub]      = useState('')
  const [tags, setTags]             = useState('')
  const [categories, setCategories] = useState([])

  const typeConfig = {
    agent:  { label: 'Agent',  Icon: AgentIcon,  submitLabel: 'Submit agent' },
    prompt: { label: 'Prompt', Icon: PromptIcon, submitLabel: 'Submit prompt' },
    tool:   { label: 'Tool',   Icon: ToolIcon,   submitLabel: 'Submit Tool' },
  }

  function handleClear() {
    setName(''); setDesc(''); setGithub(''); setTags('')
    setPricing('Free'); setCategories([])
  }

  return (
    <div
      className="flex flex-col h-full bg-black"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <StatusBar />

      {/* ── Header ── */}
      <div className="flex items-center px-[24px] h-[56px] shrink-0">
        <button
          onClick={onBack}
          className="bg-transparent border-0 cursor-pointer p-0 flex items-center"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto px-[24px] pb-[100px]">

        {/* Title */}
        <div className="mb-[20px]">
          <p className="text-white text-[16px] font-semibold leading-[1.4]">Launch Now</p>
          <p className="text-white text-[12px] font-normal opacity-70">Publish Your Product To The Swarms Marketplace</p>
        </div>

        {/* ── Type Selector ── */}
        <div className="flex gap-[12px] mb-[16px]">
          {Object.entries(typeConfig).map(([key, { label, Icon }]) => {
            const active = type === key
            return (
              <button
                key={key}
                onClick={() => setType(key)}
                className={`flex-1 h-[96px] rounded-[4px] flex flex-col items-center justify-center gap-[6px] border cursor-pointer transition-all ${
                  active
                    ? 'bg-[rgba(59,130,246,0.08)] border-[#3b82f6]'
                    : 'bg-white/[0.08] border-transparent'
                }`}
              >
                <div className="w-[36px] h-[36px] rounded-[7px] bg-[rgba(63,63,70,0.5)] flex items-center justify-center">
                  <Icon active={active} />
                </div>
                <span className={`text-[14px] font-semibold ${active ? 'text-[#60a5fa]' : 'text-white'}`}>
                  {label}
                </span>
              </button>
            )
          })}
        </div>

        {/* ── Info Box ── */}
        <div className="bg-white/[0.08] rounded-[8px] p-[12px] mb-[12px]">
          <div className="flex items-center gap-[6px] mb-[12px]">
            <InfoIcon />
            <span className="text-white text-[14px] font-normal">Not sure which to choose?</span>
          </div>
          <ul className="text-white text-[12px] font-bold list-disc pl-[18px] flex flex-col gap-[4px]">
            <li>Have code? → Choose Agent or Tool</li>
            <li>Only text/prompt? → Choose Prompt</li>
          </ul>
          <a
            href="https://docs.swarms.ai/docs/marketplace/agents-vs-prompts"
            target="_blank"
            rel="noreferrer"
            className="block text-white text-[10px] font-normal underline mt-[12px]"
          >
            Learn more about Agents vs Prompts
          </a>
        </div>

        {/* ── Quality Validation Notice ── */}
        <div className="bg-white/[0.08] rounded-[8px] p-[12px] mb-[20px]">
          <p className="text-white text-[14px] font-normal mb-[12px]">Quality Validation Notice</p>
          <ul className="text-white text-[12px] font-medium list-disc pl-[18px]">
            <li>All submissions undergo automated quality validation to maintain marketplace standards.</li>
          </ul>
        </div>

        {/* ── Import from GitHub ── */}
        <div className="mb-[16px]">
          <FieldLabel>Import from GitHub</FieldLabel>
          <TextInput
            placeholder="Enter public GitHub repository URL"
            value={githubUrl}
            onChange={setGithub}
          />
        </div>

        {/* ── Name ── */}
        <div className="mb-[16px]">
          <FieldLabel>Name</FieldLabel>
          <TextInput
            placeholder={`Enter ${type} name`}
            value={name}
            onChange={setName}
          />
        </div>

        {/* ── Description ── */}
        <div className="mb-[16px]">
          <FieldLabel>Description</FieldLabel>
          <TextInput
            placeholder={`Describe what your ${type} does...`}
            value={description}
            onChange={setDesc}
          />
        </div>

        {/* ── Categories ── */}
        <div className="mb-[16px]">
          <FieldLabel>Categories</FieldLabel>
          <CategorySelect selected={categories} onChange={setCategories} />
        </div>

        {/* ── Tags ── */}
        <div className="mb-[20px]">
          <FieldLabel>Tags</FieldLabel>
          <div className="w-full min-h-[49px] rounded-[8px] px-[12px] py-[10px] bg-white/[0.08]">
            <input
              className="w-full bg-transparent border-none outline-none text-white/50 text-[14px] font-medium placeholder-white/50"
              placeholder={'AI, automation, tools, etc. (comma-separated)'}
              value={tags}
              onChange={e => setTags(e.target.value)}
            />
          </div>
        </div>

        {/* ── Image Upload ── */}
        <div className="mb-[20px]">
          <p className="text-white text-[13px] font-semibold mb-[4px]">
            {typeConfig[type].label} Image
          </p>
          <p className="text-white/50 text-[11px] mb-[12px]">
            Recommended resolution: 800 × 800 px (1:1 aspect ratio). Max file size: 5MB. Supported formats: JPG, PNG, WebP.
          </p>
          <div className="w-full h-[96px] rounded-[8px] bg-white/[0.08] border border-dashed border-white/[0.08] flex items-center justify-center cursor-pointer">
            <UploadIcon />
          </div>
        </div>

        {/* ── Type-specific section ── */}
        <div className="mb-[20px]">
          {type === 'agent'  && <AgentSection codeTab={codeTab} setCodeTab={setCodeTab} />}
          {type === 'prompt' && <PromptSection />}
          {type === 'tool'   && <ToolSection />}
        </div>

        {/* ── Use Cases ── */}
        <div className="mb-[16px]">
          <div className="flex items-center justify-between mb-[8px]">
            <FieldLabel>Use Cases</FieldLabel>
            <button className="flex items-center gap-[2px] text-white text-[12px] font-medium bg-transparent border-0 cursor-pointer">
              Add <AddIcon />
            </button>
          </div>
          <TextInput placeholder="Use case title (e.g., Content Generation, Data Analysis)" value="" onChange={() => {}} />
          <div className="mt-[8px]">
            <TextInput placeholder="Describe how this use case applies to your product..." value="" onChange={() => {}} />
          </div>
        </div>

        {/* ── Links ── */}
        <div className="mb-[16px]">
          <div className="flex items-center justify-between mb-[8px]">
            <FieldLabel>Links</FieldLabel>
            <button className="flex items-center gap-[2px] text-white text-[12px] font-medium bg-transparent border-0 cursor-pointer">
              Add <AddIcon />
            </button>
          </div>
          <TextInput placeholder="Link name (e.g., GitHub, Twitter)" value="" onChange={() => {}} />
          <div className="mt-[8px]">
            <TextInput placeholder="https://example.com/" value="" onChange={() => {}} />
          </div>
        </div>

        {/* ── Pricing ── */}
        <div className="mb-[20px]">
          <FieldLabel>Pricing</FieldLabel>
          <div className="flex gap-[10px] flex-wrap">
            {['Free', 'Paid', 'Tokenization'].map(p => (
              <PricingButton
                key={p}
                label={p}
                active={pricing === p}
                onClick={() => setPricing(p)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="shrink-0 absolute bottom-0 left-0 right-0 h-[83px] flex items-center justify-between px-[24px] backdrop-blur-[25px] bg-[rgba(7,7,7,0.5)] shadow-[0_-10px_20px_0_#070707]">
        <button
          onClick={handleClear}
          className="w-[154px] h-[58px] rounded-[16px] bg-[#393939] text-white text-[16px] font-bold border-0 cursor-pointer"
        >
          Clear Form
        </button>
        <button
          className="w-[154px] h-[58px] rounded-[16px] bg-[#ed1717] text-white text-[16px] font-bold border-0 cursor-pointer"
        >
          {typeConfig[type].submitLabel}
        </button>
      </div>
    </div>
  )
}
