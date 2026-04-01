const ICON_X_CLOSE = 'https://www.figma.com/api/mcp/asset/f3ddac25-1418-4c55-aa63-ced640c6f6c5'
const ICON_LINK    = 'https://www.figma.com/api/mcp/asset/0376e58e-ae4d-4959-9489-b8f4c3e90c99'

const SOCIALS = [
  { label: 'GitHub',   img: 'https://www.figma.com/api/mcp/asset/c8dc825b-69fa-4310-b414-624a9d40e46e' },
  { label: 'Facebook', img: 'https://www.figma.com/api/mcp/asset/0a85d1f0-3918-4de4-8886-a5a749142533' },
  { label: 'Twitter',  img: 'https://www.figma.com/api/mcp/asset/41414daf-9fda-4fb4-97ab-7e15b087dc70', bg: '#0f1419' },
  { label: 'LinkedIn', img: 'https://www.figma.com/api/mcp/asset/d5f99aaa-b425-446d-8562-c2a120d62189' },
  { label: 'Email',    img: 'https://www.figma.com/api/mcp/asset/ad41d4a5-45e6-4561-a6aa-a8453f181a63' },
]

export default function ShareLinkModal({ onClose, onCopyLink }) {
  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-end"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={onClose}
    >
      {/* Sheet */}
      <div
        className="rounded-t-[7.5px] overflow-hidden"
        style={{ background: '#202020' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-[15px] py-[15px]"
          style={{ borderBottom: '0.625px solid #4c504c' }}
        >
          <span className="text-white text-[15px] font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Share link
          </span>
          <button
            onClick={onClose}
            className="w-[15px] h-[15px] rounded-full flex items-center justify-center border-0 cursor-pointer"
            style={{ background: '#505450' }}
          >
            <img src={ICON_X_CLOSE} alt="close" className="w-[10px] h-[10px]" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-[25px] px-[15px] pt-[25px] pb-[20px]">
          {/* Social icons row */}
          <div className="flex items-center justify-between">
            {SOCIALS.map(({ label, img, bg }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-[12.5px] w-[50px] bg-transparent border-0 cursor-pointer p-0"
              >
                <div
                  className="w-[41.25px] h-[41.25px] rounded-[4px] overflow-hidden flex items-center justify-center"
                  style={bg ? { background: bg } : {}}
                >
                  <img src={img} alt={label} className="w-full h-full object-cover" />
                </div>
                <span
                  className="text-[#c3c5c3] text-[10px] font-medium text-center w-full"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>

          {/* Copy link button */}
          <button
            onClick={onCopyLink}
            className="w-full h-[31.25px] rounded-[5px] flex items-center justify-center gap-[7.5px] border-0 cursor-pointer"
            style={{ background: '#2e2e2f' }}
          >
            <img src={ICON_LINK} alt="" className="w-[15px] h-[15px]" />
            <span className="text-white text-[11.25px] font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Copy link
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
