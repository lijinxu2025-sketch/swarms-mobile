import StatusBar from '../components/StatusBar'

// ─── Figma Asset URLs ─────────────────────────────────────────────────────────
const ASSETS = {
  iconSearch: 'https://www.figma.com/api/mcp/asset/11c1464b-dc85-4240-8516-6e4a0849a36d',
  // Recent chips
  recentQuantTrader: 'https://www.figma.com/api/mcp/asset/102e0a97-a4a4-4c1c-a43c-3e6b5632fb94',
  recentCrCa:        'https://www.figma.com/api/mcp/asset/a7490efa-e43d-4d57-b4c1-081d6b16d0f5',
  // Top Agents
  clawdCorp:         'https://www.figma.com/api/mcp/asset/5f93e772-f405-4750-ac57-a97a9f7d5b32',
  quantTrader:       'https://www.figma.com/api/mcp/asset/3b0651bf-f210-4d8f-bef2-1ce1b07a41f7',
  luaf:              'https://www.figma.com/api/mcp/asset/489649db-57ed-4900-a570-7b60d9ab9919',
  // Prompt
  whaleIntel:        'https://www.figma.com/api/mcp/asset/c6834788-2c53-422a-a7be-ad3dd0977d71',
  youtube:           'https://www.figma.com/api/mcp/asset/fbfbaf4a-e4ba-4178-b8eb-124cebf86f20',
  freePrizes:        'https://www.figma.com/api/mcp/asset/96bbde53-53f0-4a90-8ed1-6ca529dbdbe2',
  // Tools
  fwafwafwa:         'https://www.figma.com/api/mcp/asset/008c2842-7fcc-45a9-908c-bb48ed29bda1',
  swarmsLaunchpad:   'https://www.figma.com/api/mcp/asset/d52fc4ae-a8d4-4f66-884f-2175c732beae',
  claudeCode:        'https://www.figma.com/api/mcp/asset/75b33841-f7bb-493d-ac99-a0ae6c181bcf',
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const RECENT = [
  { avatar: ASSETS.recentQuantTrader, name: 'Quant Trader Agent' },
  { avatar: ASSETS.recentCrCa,        name: 'CR-CA Agent' },
]

const TOP_AGENTS = [
  { avatar: ASSETS.clawdCorp,   name: 'ClawdCorp',           description: 'ClawdCorp AVA',         rate: '99.5%' },
  { avatar: ASSETS.quantTrader, name: 'Quant Trader Agent',  description: 'Quant Trader Agent',    rate: '93.5%' },
  { avatar: ASSETS.luaf,        name: 'LUAF',                description: 'Quant Trader Agent',    rate: '91.5%' },
]

const PROMPTS = [
  { avatar: ASSETS.whaleIntel, name: 'Whale Intel',  description: 'Stop getting dumped on by whales.', rate: '89.5%' },
  { avatar: ASSETS.youtube,    name: 'YouTube',      description: 'Quant Trader Agent',                rate: '77.5%' },
  { avatar: ASSETS.freePrizes, name: 'Free Prizes',  description: 'Quant Trader Agent',                rate: '79.3%' },
]

const TOOLS = [
  { avatar: ASSETS.fwafwafwa,       name: 'fwafwafwa',            description: 'none',               rate: '81.5%' },
  { avatar: ASSETS.swarmsLaunchpad, name: 'Swarms Launchpad API', description: 'Quant Trader Agent', rate: '78.5%' },
  { avatar: ASSETS.claudeCode,      name: 'Claude Code As A Tool',description: 'Quant Trader Agent', rate: '79.3%' },
]

const USERS = [
  { initial: 'F', name: 'FrUItswarms' },
  { initial: 'R', name: 'Rainbowkode' },
  { initial: 'S', name: 'Sean' },
  { initial: 'B', name: 'Bitbot' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────
function SuccessBadge({ rate }) {
  return (
    <div className="bg-[rgba(35,183,122,0.1)] flex items-center gap-[6px] px-[4px] py-[4px] rounded-[4px] self-start">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="7" fill="rgba(35,183,122,0.3)" />
        <path d="M4 7.2l2 2 4-4" stroke="#23b77a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-white text-[12px] font-medium">{rate}</span>
    </div>
  )
}

function ResultCard({ avatar, name, description, rate }) {
  return (
    <div className="border border-white/10 rounded-[8px] pl-[16px] pr-[10px] py-[16px] w-full">
      <div className="flex flex-col gap-[18px]">
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center gap-[8px]">
            <img src={avatar} alt="" className="w-6 h-6 rounded-full object-cover shrink-0" />
            <span className="text-white text-[14px] font-medium">{name}</span>
          </div>
          <p className="text-white text-[10px] font-normal leading-[1.2] m-0">{description}</p>
        </div>
        <SuccessBadge rate={rate} />
      </div>
    </div>
  )
}

function UserCard({ initial, name }) {
  return (
    <div className="border border-white/10 rounded-[8px] pl-[16px] pr-[10px] py-[16px] w-full">
      <div className="flex items-center gap-[8px]">
        <div className="w-6 h-6 rounded-[12px] bg-[#1a1a1b] border border-white/10 flex items-center justify-center shrink-0">
          <span className="text-white text-[12px] font-medium tracking-[-0.36px]">{initial}</span>
        </div>
        <span className="text-white text-[14px] font-medium">{name}</span>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="flex flex-col gap-[8px]">
      <h2 className="text-white text-[16px] font-bold leading-[1.6] m-0">{title}</h2>
      {children}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SearchPage({ onBack }) {
  return (
    <div className="flex flex-col h-full bg-black" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <StatusBar />

      {/* Search header row */}
      <div className="flex items-center gap-[16px] px-[24px] pt-[12px] pb-[8px]">
        <button
          onClick={onBack}
          className="w-6 h-6 bg-transparent border-0 cursor-pointer p-0 shrink-0 flex items-center justify-center"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
        <div className="flex items-center gap-[16px] flex-1 h-[56px] bg-white/10 rounded-[10px] px-[24px]">
          <img src={ASSETS.iconSearch} alt="" className="w-6 h-6 shrink-0" />
          <span className="text-white/50 text-[16px] font-medium">Search your agent...</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scroll-hide px-[24px] pb-[24px] flex flex-col gap-[24px] pt-[16px]">

        {/* Recent */}
        <div className="flex flex-col gap-[8px]">
          <h2 className="text-white text-[16px] font-bold leading-[1.6] m-0">Recent</h2>
          <div className="flex gap-[8px] overflow-x-auto scroll-hide">
            {RECENT.map((item, i) => (
              <div key={i} className="bg-white/10 flex items-center gap-[10px] px-[10px] py-[8px] rounded-[8px] shrink-0">
                <img src={item.avatar} alt="" className="w-[26px] h-[26px] rounded-full object-cover shrink-0" />
                <span className="text-white text-[12px] font-medium whitespace-nowrap">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sectioned results */}
        <Section title="Top Agents">
          {TOP_AGENTS.map((item, i) => <ResultCard key={i} {...item} />)}
        </Section>

        <Section title="Prompt">
          {PROMPTS.map((item, i) => <ResultCard key={i} {...item} />)}
        </Section>

        <Section title="Tools">
          {TOOLS.map((item, i) => <ResultCard key={i} {...item} />)}
        </Section>

        <Section title="Users">
          {USERS.map((item, i) => <UserCard key={i} {...item} />)}
        </Section>

      </div>
    </div>
  )
}
