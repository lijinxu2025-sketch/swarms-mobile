import { useState } from 'react'
import StatusBar from '../components/StatusBar'

// ─── Figma Asset URLs ────────────────────────────────────────────────────────
const ASSETS = {
  // Status bar right icons
  statusRight: 'https://www.figma.com/api/mcp/asset/dc315817-6270-4143-907f-2977ed0eec89',
  // Search & filter
  iconSearch: 'https://www.figma.com/api/mcp/asset/888e77e8-7537-4b47-9d0a-c51b539ce17e',
  iconFilter: 'https://www.figma.com/api/mcp/asset/c6e07612-312d-49d9-9611-f1fc1930561b',
  // Chevron right
  chevronRight: 'https://www.figma.com/api/mcp/asset/119c4f8d-9cd5-446a-99d1-025d366eda19',
  // Star icon
  iconStar: 'https://www.figma.com/api/mcp/asset/9c84bc97-6721-4f85-ba6c-229db2d00504',
  // User avatar placeholder
  avatarP: 'https://www.figma.com/api/mcp/asset/3179f409-df81-49f0-a4cc-635106df3151',
  // Banner 1 assets
  ellipse1: 'https://www.figma.com/api/mcp/asset/c9e3f574-23d8-4f61-b8a3-90da3e2aea23',
  ellipse2: 'https://www.figma.com/api/mcp/asset/709f0cb9-2424-45c6-90da-8beed52d791e',
  robotShadow: 'https://www.figma.com/api/mcp/asset/5e624186-ca25-42c3-a423-ab33bf94cd46',
  robotImg: 'https://www.figma.com/api/mcp/asset/072a6ec9-b382-4754-8cdb-1a94867bfc50',
  // Banner 2 assets
  ellipse3: 'https://www.figma.com/api/mcp/asset/507e6b71-0f03-4829-9ca6-23a13776b0cb',
  ellipse4: 'https://www.figma.com/api/mcp/asset/e0fa0884-6ed3-4d06-93dc-47fd096454fa',
  bannerPerson: 'https://www.figma.com/api/mcp/asset/5615b9c8-f5fe-4b48-8f7d-234744584e70',
  bannerBot: 'https://www.figma.com/api/mcp/asset/ec998cbc-4066-4924-92d1-4de25c0a4936',
  // Category icons (masks)
  catMaskBg: 'https://www.figma.com/api/mcp/asset/347e0b19-ed63-4f6e-87de-fb2e1458c8cd',
  catPrompt: 'https://www.figma.com/api/mcp/asset/df0bc403-027e-456d-870c-3f2c94f3af04',
  catAgents: 'https://www.figma.com/api/mcp/asset/b8d8250a-c866-4b8e-a06d-1102ffd7d52a',
  catTools: 'https://www.figma.com/api/mcp/asset/4e9439a6-5a78-48a2-8ae0-45eb125aba2a',
  // Agent card images
  card1: 'https://www.figma.com/api/mcp/asset/2916443c-41b4-4d68-88c2-9349ea573be6',
  card2: 'https://www.figma.com/api/mcp/asset/35d75c72-a1d9-4f3c-9d3d-0db5641a6706',
  card3: 'https://www.figma.com/api/mcp/asset/012a4018-5ba7-4fb9-9cde-9c29e8570eb0',
  card4: 'https://www.figma.com/api/mcp/asset/849da9a0-396c-47b7-b973-1412f98f8450',
  card5: 'https://www.figma.com/api/mcp/asset/f125b9b6-2481-4f80-822b-eab86becae53',
  card6: 'https://www.figma.com/api/mcp/asset/5ca1c517-5657-4783-9b21-15c6e56d3bbe',
  // Bottom nav icons
  navChat: 'https://www.figma.com/api/mcp/asset/289f92ba-c8ab-4e35-87be-1bdea39fe508',
  navChatActive: 'https://www.figma.com/api/mcp/asset/38938ff5-cf79-4ba2-babf-66fb19559e3d',
  navHome: 'https://www.figma.com/api/mcp/asset/049db54d-396e-4f6c-8021-8b4d14eada15',
  navProfile: 'https://www.figma.com/api/mcp/asset/cf0a53a6-c28b-4226-b6e2-a9db17f33215',
  navApps: 'https://www.figma.com/api/mcp/asset/f7800916-9891-4f98-9863-5c365ef0ad90',
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const TRENDING = [
  { img: ASSETS.card1, tag: 'Prompt', stars: 5, author: 'Playeds', authorInitial: 'P', title: 'Pineapple Agent', price: 'Free' },
  { img: ASSETS.card2, tag: 'Prompt', stars: 5, author: 'QuantAgentDev', authorInitial: 'Q', title: 'Quant Trader Agent', price: 'US$15.00' },
]
const TOKENIZED = [
  { img: ASSETS.card3, tag: 'Prompt', stars: 5, author: 'Playeds', authorInitial: 'P', title: 'Equity Analysis...', price: 'US$10.00' },
  { img: ASSETS.card4, tag: 'Agent', stars: 5, author: 'QuantAgentDev', authorInitial: 'Q', title: 'Quant Trader Agent', price: 'US$5.00' },
]
const TOP_PRODUCTS = [
  { img: ASSETS.card5, tag: 'Prompt', stars: 5, author: 'Playeds', authorInitial: 'P', title: 'Apple Agent', price: 'US$25.00' },
  { img: ASSETS.card6, tag: 'Agent', stars: 5, author: 'Euroswarms', authorInitial: 'E', title: 'LiveFetch', price: 'US$35.00' },
]
const CATEGORIES = [
  { label: 'Prompt', img: ASSETS.catPrompt },
  { label: 'Agents', img: ASSETS.catAgents },
  { label: 'Tools', img: ASSETS.catTools },
]

// ─── Sub-components ────────────────────────────────────────────────────────────
function SearchBar({ onFilter, onSearch }) {
  return (
    <div className="flex items-center gap-1 px-6 py-0">
      {/* Search input */}
      <button onClick={onSearch} className="flex items-center gap-4 flex-1 h-[56px] bg-white/10 rounded-[10px] px-6 border-0 cursor-pointer text-left">
        <img src={ASSETS.iconSearch} alt="" className="w-6 h-6 shrink-0" />
        <span className="text-white text-[16px] font-medium">Search your agent...</span>
      </button>
      {/* Filter button */}
      <button onClick={onFilter} className="w-[56px] h-[56px] bg-white/10 rounded-[12px] flex items-center justify-center shrink-0 border-0 cursor-pointer">
        <img src={ASSETS.iconFilter} alt="Filter" className="w-6 h-6" />
      </button>
    </div>
  )
}

function SectionHeader({ title, onSeeAll }) {
  return (
    <div className="flex items-center justify-between mb-[15px]">
      <h2 className="text-[#f5f8fa] text-[24px] font-bold m-0 leading-[1.2]">{title}</h2>
      <button onClick={onSeeAll} className="flex items-center gap-0 bg-transparent border-0 cursor-pointer p-0">
        <span className="text-[#f5f8fa] text-[14px] font-medium">See all</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="#f5f8fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}

function StarRating({ stars }) {
  return (
    <div className="flex items-center gap-[2px] bg-black/40 backdrop-blur-sm rounded-full px-[5px] py-[2px]">
      <span className="text-[#fed900] text-[8px] font-bold">{stars}</span>
      <svg width="9" height="9" viewBox="0 0 10 10" fill="#fed900">
        <polygon points="5,0 6.2,3.8 10,3.8 7,6.1 8.1,10 5,7.6 1.9,10 3,6.1 0,3.8 3.8,3.8" />
      </svg>
    </div>
  )
}

function AgentCard({ img, tag, stars, author, authorInitial, title, price, onClick }) {
  return (
    <div onClick={onClick} className="flex flex-col rounded-[10px] overflow-hidden shrink-0 w-[155px] cursor-pointer">
      {/* Image area with overlays */}
      <div className="relative h-[100px]">
        <img src={img} alt={title} className="w-full h-full object-cover" />
        {/* Category tag */}
        <div className="absolute top-[8px] left-[8px] bg-black/40 backdrop-blur-sm rounded-full px-[6px] py-[2px]">
          <span className="text-white text-[8px] font-bold capitalize">{tag}</span>
        </div>
        {/* Stars */}
        <div className="absolute top-[8px] right-[8px]">
          <StarRating stars={stars} />
        </div>
      </div>
      {/* Info area */}
      <div className="bg-[#0d0d0d] px-[11px] py-[12px] flex flex-col gap-[6px] h-[96px]">
        {/* Author row */}
        <div className="flex items-center gap-[6px]">
          <div className="w-4 h-4 rounded-[8px] bg-[#1a1a1b] border border-white/10 flex items-center justify-center shrink-0">
            <span className="text-white text-[8px] font-medium">{authorInitial}</span>
          </div>
          <span className="text-white text-[8px] font-medium tracking-[-0.24px] truncate">{author}</span>
        </div>
        {/* Title & price */}
        <div className="flex flex-col gap-[8px]">
          <p className="text-[#f5f8fa] text-[12px] font-semibold leading-[1.2] truncate m-0">{title}</p>
          <p className="text-white text-[12px] font-normal m-0">{price}</p>
        </div>
      </div>
    </div>
  )
}

function CardsRow({ items, onCardClick }) {
  return (
    <div className="flex gap-[17px] overflow-x-auto scroll-hide pb-1">
      {items.map((item, i) => (
        <AgentCard key={i} {...item} onClick={onCardClick} />
      ))}
    </div>
  )
}

function Banner1() {
  return (
    <div className="relative h-[144px] bg-[#151515] rounded-[8px] overflow-hidden shrink-0 w-[304px] shadow-[0_4px_7px_rgba(0,0,0,0.05)]">
      {/* Glow circles */}
      <img src={ASSETS.ellipse1} alt="" className="absolute w-[181px] h-[181px] top-[-73px] left-[139px]" />
      <img src={ASSETS.ellipse2} alt="" className="absolute w-[193px] h-[193px] top-[-77px] left-[133px]" />
      {/* Text content */}
      <div className="absolute left-[25px] top-[18px]">
        <p className="text-[#ed1717] text-[10px] font-normal m-0">SALE</p>
        <div className="text-white font-extrabold text-[25px] leading-[1.1] mt-1">
          <p className="m-0">UPTO</p>
          <p className="m-0">
            <span className="text-[#ed1717]">60%</span>
            {' OFF'}
          </p>
        </div>
      </div>
      <p className="absolute left-[28px] bottom-[18px] text-white text-[10px] font-normal m-0">
        Agents Collections
      </p>
      {/* Robot image */}
      <img src={ASSETS.robotShadow} alt="" className="absolute w-[113px] h-[124px] left-[184px] top-[12px] opacity-70" />
      <img src={ASSETS.robotImg} alt="" className="absolute w-[216px] h-[162px] left-[129px] top-[-9px] object-cover pointer-events-none" />
    </div>
  )
}

function Banner2() {
  return (
    <div
      className="relative h-[144px] rounded-[8px] overflow-hidden shrink-0 w-[304px]"
      style={{ background: 'linear-gradient(to bottom, #ee0101, #6d0509)' }}
    >
      {/* Decorative circles */}
      <img src={ASSETS.ellipse3} alt="" className="absolute w-[117px] h-[117px] left-[-24px] top-[76px]" />
      <img src={ASSETS.ellipse4} alt="" className="absolute w-[90px] h-[11px] left-[164px] top-[108px] opacity-60" />
      {/* Text */}
      <p className="absolute left-[25px] top-[23px] text-white text-[10px] font-normal m-0">
        Limited-Time Discount
      </p>
      <p className="absolute left-[25px] top-[42px] text-white text-[18px] font-bold leading-[1.2] m-0 w-[135px]">
        Get Your Dream Agent
      </p>
      <p className="absolute left-[25px] bottom-[18px] text-white text-[18px] font-extrabold m-0">
        40% OFF
      </p>
      {/* Person image */}
      <img
        src={ASSETS.bannerPerson}
        alt=""
        className="absolute w-[308px] h-[230px] left-[91px] top-[3px] object-cover pointer-events-none"
      />
    </div>
  )
}

function BannerSlide() {
  return (
    <div className="flex gap-[15px] overflow-x-auto scroll-hide px-6">
      <Banner1 />
      <Banner2 />
    </div>
  )
}

function Categories() {
  return (
    <div className="px-6">
      <h2 className="text-white text-[24px] font-bold mb-4 leading-[1.2]">Categories</h2>
      <div className="flex gap-[15px] overflow-x-auto scroll-hide">
        {CATEGORIES.map(({ label, img }) => (
          <div
            key={label}
            className="relative bg-[#151515] border border-white/[0.08] rounded-[5px] w-[130px] h-[120px] shrink-0 flex flex-col overflow-hidden cursor-pointer"
          >
            <p className="text-[#f5f8fa] text-[14px] font-medium leading-[1.2] m-0 px-[10px] pt-[10px]">{label}</p>
            <img
              src={img}
              alt={label}
              className="absolute bottom-[-10px] right-[-10px] w-[100px] h-[90px] object-contain"
              style={{ transform: 'rotate(-3.61deg)' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function BottomNav({ onChat }) {
  return (
    <div className="shrink-0 relative h-[88px]">
      {/* Gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      {/* Nav bar */}
      <div className="absolute bottom-[10px] left-[24px] right-[24px] h-[66px] rounded-[10px] border border-white/[0.15] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-[#111]/70 backdrop-blur-md" />
        <div className="relative z-10 h-full flex items-center justify-between px-[6px]">
          {/* Chat */}
          <button
            onClick={onChat}
            className="w-[51px] h-[54px] rounded-[10px] bg-white/10 flex items-center justify-center border-0 cursor-pointer"
          >
            <img src={ASSETS.navChat} alt="Chat" className="w-[22px] h-[22px]" />
          </button>
          {/* Profile */}
          <button className="w-[51px] h-[54px] rounded-[10px] bg-white/10 flex items-center justify-center border-0 cursor-pointer">
            <img src={ASSETS.navProfile} alt="Profile" className="w-6 h-6" />
          </button>
          {/* Home (center, red) */}
          <button className="w-[52px] h-[52px] rounded-[10px] bg-[#ed1717] flex items-center justify-center border-0 cursor-pointer">
            <img src={ASSETS.navHome} alt="Home" className="w-5 h-5" />
          </button>
          {/* Apps */}
          <button className="w-[51px] h-[54px] rounded-[10px] bg-white/10 flex items-center justify-center border-0 cursor-pointer">
            <img src={ASSETS.navApps} alt="Apps" className="w-6 h-6" />
          </button>
          {/* Settings */}
          <button className="w-[51px] h-[54px] rounded-[10px] bg-white/10 flex items-center justify-center border-0 cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="0" y="0" width="7.8" height="7.8" rx="2" stroke="#aaaaab" strokeWidth="1.5" fill="none" />
              <rect x="0" y="10" width="7.8" height="7.8" rx="2" stroke="#aaaaab" strokeWidth="1.5" fill="none" />
              <rect x="10" y="10" width="7.8" height="7.8" rx="2" stroke="#aaaaab" strokeWidth="1.5" fill="none" />
              <rect x="10" y="0" width="7.8" height="7.8" rx="2" stroke="#aaaaab" strokeWidth="1.5" fill="none" transform="rotate(45 13.9 3.9)" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage({ onSeeAllTrending, onFilter, onSearch, onAgentClick, onChat }) {
  return (
    <div className="flex flex-col h-full bg-black" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <StatusBar />

      <div className="flex-1 overflow-y-auto scroll-hide flex flex-col gap-[30px] py-[12px]">
        <SearchBar onFilter={onFilter} onSearch={onSearch} />

        <BannerSlide />

        <Categories />

        <div className="px-6">
          <SectionHeader title="Trending" onSeeAll={onSeeAllTrending} />
          <CardsRow items={TRENDING} onCardClick={onAgentClick} />
        </div>

        <div className="px-6">
          <SectionHeader title="Tokenized Items" />
          <CardsRow items={TOKENIZED} onCardClick={onAgentClick} />
        </div>

        <div className="px-6 pb-2">
          <SectionHeader title="Top Products" />
          <CardsRow items={TOP_PRODUCTS} onCardClick={onAgentClick} />
        </div>
      </div>

      <BottomNav onChat={onChat} />
    </div>
  )
}
