import StatusBar from '../components/StatusBar'

// ─── Figma Asset URLs ─────────────────────────────────────────────────────────
const ASSETS = {
  agent1Icon:      'https://www.figma.com/api/mcp/asset/394a07be-dea4-4ad1-a21c-f09d1b3cf955',
  agent2Icon:      'https://www.figma.com/api/mcp/asset/87694f70-9cf4-44e2-bf25-e33833ed47ec',
  settingsIcon:    'https://www.figma.com/api/mcp/asset/4c8687c6-17f2-446b-aa61-e7c7304883cf',
  marketplaceIcon: 'https://www.figma.com/api/mcp/asset/586548a2-e0cb-4f83-b680-ecf9609b78cd',
  addIcon:         'https://www.figma.com/api/mcp/asset/1276d079-1196-425e-b178-fdbaeaeb83da',
  chevronDown:     'https://www.figma.com/api/mcp/asset/a96aaeec-2190-4eb7-a428-f10a877f61c2',
}

const AGENTS = [
  {
    icon: ASSETS.agent1Icon,
    name: 'Market Insights Analyst',
    desc: 'A specialized AI agent focused on providing detailed 1insight...',
  },
  {
    icon: ASSETS.agent2Icon,
    name: 'Customer Support Assistant',
    desc: 'A prompt designed to help AI assist users by providing polit...',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <span className="text-white text-[14px] font-medium">{label}</span>
      {children}
    </div>
  )
}

function TextBox({ value, placeholder }) {
  return (
    <div className="bg-white/[0.08] h-[44px] rounded-[8px] px-[12px] flex items-center">
      <span className={`text-[16px] font-normal ${value ? 'text-white' : 'text-white/50'}`}>
        {value || placeholder}
      </span>
    </div>
  )
}

function AgentCard({ icon, name, desc }) {
  return (
    <div className="bg-white/[0.08] rounded-[8px] px-[10px] py-[20px] flex items-center gap-[10px]">
      {/* Avatar */}
      <div className="relative w-[44px] h-[44px] shrink-0">
        <div className="w-[44px] h-[44px] rounded-[12px] border border-white/10" />
        <img src={icon} alt="" className="absolute w-[17.5px] h-[17.5px] left-[10px] top-[16.5px]" />
        <div className="absolute w-[9px] h-[9px] rounded-full bg-[#22c55e] right-0 top-0" />
      </div>
      {/* Info */}
      <div className="flex flex-col gap-[4px] flex-1 min-w-0">
        <span className="text-[#e4e4e7] text-[14px] font-bold leading-[24px] truncate">{name}</span>
        <span className="text-[#a1a1aa] text-[10px] leading-[1.2]">{desc}</span>
      </div>
      {/* Settings */}
      <button className="w-5 h-5 bg-transparent border-0 cursor-pointer p-0 shrink-0">
        <img src={ASSETS.settingsIcon} alt="Settings" className="w-5 h-5" />
      </button>
    </div>
  )
}

function ActionRow({ icon, label }) {
  return (
    <div className="bg-white/[0.08] h-[44px] rounded-[8px] px-[12px] flex items-center justify-between">
      <div className="flex items-center gap-[4px]">
        <img src={icon} alt="" className="w-4 h-4 shrink-0" />
        <span className="text-white text-[16px] font-normal">{label}</span>
      </div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ transform: 'rotate(90deg)' }}>
        <path d="M10 6L16 12L10 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ConfigPage({ onBack }) {
  return (
    <div className="flex flex-col h-full bg-black" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <StatusBar />

      {/* Nav bar */}
      <div className="flex items-center px-[24px] h-[56px] shrink-0">
        <button
          onClick={onBack}
          className="w-6 h-6 bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scroll-hide px-[24px] pb-[24px] flex flex-col gap-[40px] pt-[16px]">

        {/* Basic fields */}
        <div className="flex flex-col gap-[24px]">
          <Field label="Name">
            <TextBox value="Swarms" />
          </Field>

          <Field label="Description">
            <TextBox placeholder="Enter description" />
          </Field>

          <Field label="Swarm Type">
            <div className="bg-white/[0.08] h-[44px] rounded-[8px] px-[12px] flex items-center justify-between">
              <span className="text-white/50 text-[16px] font-normal">Concurrent</span>
              <img
                src={ASSETS.chevronDown}
                alt=""
                className="w-6 h-6 shrink-0"
                style={{ transform: 'rotate(90deg)' }}
              />
            </div>
          </Field>
        </div>

        {/* Agents in Chat */}
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[4px]">
            <span className="text-white text-[18px] font-bold">Agents in Chat</span>
            <span className="text-[#d4d4d8] text-[12px]">Number of Agents: {AGENTS.length}</span>
          </div>
          <div className="flex flex-col gap-[16px]">
            {AGENTS.map((agent, i) => (
              <AgentCard key={i} {...agent} />
            ))}
          </div>
        </div>

        {/* Add from Marketplace */}
        <div className="flex flex-col gap-[10px]">
          <span className="text-white text-[18px] font-bold">Add from Marketplace</span>
          <ActionRow icon={ASSETS.marketplaceIcon} label="Browse Marketplace" />
        </div>

        {/* Add Custom Agent */}
        <div className="flex flex-col gap-[10px]">
          <span className="text-white text-[18px] font-bold">Add Custom Agent</span>
          <ActionRow icon={ASSETS.addIcon} label="Create Custom Agent" />
        </div>

      </div>
    </div>
  )
}
