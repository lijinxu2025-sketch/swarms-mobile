import { useState } from 'react'
import StatusBar from '../components/StatusBar'

const BACK_ICON = 'https://www.figma.com/api/mcp/asset/09454fa1-bf05-4a27-a765-ac7e2602ed83'

const PRODUCT_TYPES = ['All', 'Prompt', 'Agents', 'Tools']
const CATEGORIES    = ['All', 'Non x402', 'x402', 'Finance', 'Healthcare', 'Education', 'Sales', 'Research', 'Public Safety', 'Marketing', 'Customer Support', 'Other']

function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="h-[44px] px-5 rounded-[15px] border-0 cursor-pointer text-white whitespace-nowrap transition-all"
      style={{
        background: active ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
        opacity: active ? 1 : 0.8,
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '12px',
        fontWeight: active ? '600' : '400',
        boxShadow: '12px 26px 50px 0px rgba(90,108,234,0.07)',
      }}
    >
      {label}
    </button>
  )
}

function ChipGroup({ items, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-5">
      {items.map(item => (
        <FilterChip
          key={item}
          label={item}
          active={selected === item}
          onClick={() => onSelect(item)}
        />
      ))}
    </div>
  )
}

export default function FilterPage({ onBack, onApply }) {
  const [productType, setProductType] = useState('All')
  const [category,    setCategory]    = useState('All')

  return (
    <div className="flex flex-col h-full bg-black" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <StatusBar />

      {/* Back button row */}
      <div className="h-[56px] flex items-center px-6 shrink-0">
        <button onClick={onBack} className="bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center">
          <img src={BACK_ICON} alt="Back" className="w-6 h-6" />
        </button>
      </div>

      {/* Filter content */}
      <div className="flex-1 overflow-y-auto scroll-hide px-[25px] pt-4 pb-8 flex flex-col gap-8">

        {/* Product Type */}
        <div className="flex flex-col gap-5">
          <p className="text-white text-[15px] font-bold leading-[1.31] m-0">Product Type</p>
          <ChipGroup items={PRODUCT_TYPES} selected={productType} onSelect={setProductType} />
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-5">
          <p className="text-white text-[15px] font-bold leading-[1.31] m-0">Categories</p>
          <ChipGroup items={CATEGORIES} selected={category} onSelect={setCategory} />
        </div>
      </div>

      {/* Apply button */}
      <div className="px-6 pb-8 shrink-0">
        <button
          onClick={() => onApply({ productType, category })}
          className="w-full h-[58px] rounded-[16px] bg-[#ed1717] text-white text-[16px] font-bold border-0 cursor-pointer"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  )
}
