import StatusBar from '../components/StatusBar'

const BACK_ICON = 'https://www.figma.com/api/mcp/asset/09454fa1-bf05-4a27-a765-ac7e2602ed83'

const ALL_TRENDING = [
  { img: 'https://www.figma.com/api/mcp/asset/2916443c-41b4-4d68-88c2-9349ea573be6', tag: 'Prompt', stars: 5, author: 'Playeds',        authorInitial: 'P', title: 'Pineapple Agent',      price: 'Free'      },
  { img: 'https://www.figma.com/api/mcp/asset/35d75c72-a1d9-4f3c-9d3d-0db5641a6706', tag: 'Prompt', stars: 5, author: 'QuantAgentDev',  authorInitial: 'Q', title: 'Quant Trader Agent',  price: 'US$15.00'  },
  { img: 'https://www.figma.com/api/mcp/asset/012a4018-5ba7-4fb9-9cde-9c29e8570eb0', tag: 'Prompt', stars: 5, author: 'Playeds',        authorInitial: 'P', title: 'Equity Analysis...',  price: 'US$10.00'  },
  { img: 'https://www.figma.com/api/mcp/asset/849da9a0-396c-47b7-b973-1412f98f8450', tag: 'Agent',  stars: 5, author: 'QuantAgentDev',  authorInitial: 'Q', title: 'Quant Trader Agent',  price: 'US$5.00'   },
  { img: 'https://www.figma.com/api/mcp/asset/f125b9b6-2481-4f80-822b-eab86becae53', tag: 'Prompt', stars: 5, author: 'Playeds',        authorInitial: 'P', title: 'Apple Agent',         price: 'US$25.00'  },
  { img: 'https://www.figma.com/api/mcp/asset/5ca1c517-5657-4783-9b21-15c6e56d3bbe', tag: 'Agent',  stars: 5, author: 'Euroswarms',     authorInitial: 'E', title: 'LiveFetch',           price: 'US$35.00'  },
]

function AgentCard({ img, tag, stars, author, authorInitial, title, price }) {
  return (
    <div className="flex flex-col rounded-[10px] overflow-hidden">
      <div className="relative h-[100px]">
        <img src={img} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-[8px] left-[8px] bg-black/40 backdrop-blur-sm rounded-full px-[6px] py-[2px]">
          <span className="text-white text-[8px] font-bold capitalize">{tag}</span>
        </div>
        <div className="absolute top-[8px] right-[8px] flex items-center gap-[2px] bg-black/40 backdrop-blur-sm rounded-full px-[5px] py-[2px]">
          <span className="text-[#fed900] text-[8px] font-bold">{stars}</span>
          <svg width="9" height="9" viewBox="0 0 10 10" fill="#fed900">
            <polygon points="5,0 6.2,3.8 10,3.8 7,6.1 8.1,10 5,7.6 1.9,10 3,6.1 0,3.8 3.8,3.8" />
          </svg>
        </div>
      </div>
      <div className="bg-[#0d0d0d] px-[11px] py-[12px] flex flex-col gap-[6px]">
        <div className="flex items-center gap-[6px]">
          <div className="w-4 h-4 rounded-[8px] bg-[#1a1a1b] border border-white/10 flex items-center justify-center shrink-0">
            <span className="text-white text-[8px] font-medium">{authorInitial}</span>
          </div>
          <span className="text-white text-[8px] font-medium tracking-[-0.24px] truncate">{author}</span>
        </div>
        <p className="text-[#f5f8fa] text-[12px] font-semibold leading-[1.2] truncate m-0">{title}</p>
        <p className="text-white text-[12px] font-normal m-0">{price}</p>
      </div>
    </div>
  )
}

export default function TrendingAllPage({ onBack }) {
  return (
    <div className="flex flex-col h-full bg-black" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <StatusBar />

      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 shrink-0">
        <button onClick={onBack} className="bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center">
          <img src={BACK_ICON} alt="Back" className="w-6 h-6" />
        </button>
        <h1 className="text-white text-[20px] font-bold m-0 leading-[1.2]">Trending</h1>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto scroll-hide px-6 pb-6">
        <div className="grid grid-cols-2 gap-4">
          {ALL_TRENDING.map((item, i) => (
            <AgentCard key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}
