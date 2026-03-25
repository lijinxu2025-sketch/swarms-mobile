import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'

// Map: figma asset UUID → local webp filename (without extension)
const UUID_TO_FILE = {
  // LaunchScreen
  '4d3b558a-be66-42ce-a59a-28bebb419053': 'launch_bg',
  '50dd0832-5032-496a-b0a1-fe1284450cfb': 'launch_logo',
  // SignInPage
  '5a218323-6408-4a8d-adee-42b57570b814': 'signin_logo',
  'be69c63e-2b75-4e88-984b-35d972334e05': 'signin_emailIcon',
  'c70ce0d3-c2f9-416b-976c-2fd403426c02': 'signin_lockIcon',
  '6991a25c-9f60-45c4-ab5c-fbb52834afb2': 'signin_eyeSlash',
  '9c44a205-3d7b-425f-9605-474e92cf64ed': 'signin_dividerL',
  'bf5a4db6-0a6a-4c23-b312-d4227d1e60c7': 'signin_dividerR',
  'b8f67996-8fe0-4d31-8d98-809b6d0c2031': 'signin_google',
  '87aaca34-fcf8-47e7-bc98-4589aa3145d3': 'signin_twitter',
  'b6acab38-afe1-4356-90b3-f51d309bee95': 'signin_github',
  '3afa02e2-c1ad-4a30-a1be-96fcb4a10acb': 'signin_discord',
  // HomePage
  'dc315817-6270-4143-907f-2977ed0eec89': 'home_statusRight',
  '888e77e8-7537-4b47-9d0a-c51b539ce17e': 'home_iconSearch',
  'c6e07612-312d-49d9-9611-f1fc1930561b': 'home_iconFilter',
  '119c4f8d-9cd5-446a-99d1-025d366eda19': 'home_chevronRight',
  '9c84bc97-6721-4f85-ba6c-229db2d00504': 'home_iconStar',
  '3179f409-df81-49f0-a4cc-635106df3151': 'home_avatarP',
  'c9e3f574-23d8-4f61-b8a3-90da3e2aea23': 'home_ellipse1',
  '709f0cb9-2424-45c6-90da-8beed52d791e': 'home_ellipse2',
  '5e624186-ca25-42c3-a423-ab33bf94cd46': 'home_robotShadow',
  '072a6ec9-b382-4754-8cdb-1a94867bfc50': 'home_robotImg',
  '507e6b71-0f03-4829-9ca6-23a13776b0cb': 'home_ellipse3',
  'e0fa0884-6ed3-4d06-93dc-47fd096454fa': 'home_ellipse4',
  '5615b9c8-f5fe-4b48-8f7d-234744584e70': 'home_bannerPerson',
  'ec998cbc-4066-4924-92d1-4de25c0a4936': 'home_bannerBot',
  '347e0b19-ed63-4f6e-87de-fb2e1458c8cd': 'home_catMaskBg',
  'df0bc403-027e-456d-870c-3f2c94f3af04': 'home_catPrompt',
  'b8d8250a-c866-4b8e-a06d-1102ffd7d52a': 'home_catAgents',
  '4e9439a6-5a78-48a2-8ae0-45eb125aba2a': 'home_catTools',
  '2916443c-41b4-4d68-88c2-9349ea573be6': 'home_card1',
  '35d75c72-a1d9-4f3c-9d3d-0db5641a6706': 'home_card2',
  '012a4018-5ba7-4fb9-9cde-9c29e8570eb0': 'home_card3',
  '849da9a0-396c-47b7-b973-1412f98f8450': 'home_card4',
  'f125b9b6-2481-4f80-822b-eab86becae53': 'home_card5',
  '5ca1c517-5657-4783-9b21-15c6e56d3bbe': 'home_card6',
  '289f92ba-c8ab-4e35-87be-1bdea39fe508': 'home_navChat',
  '38938ff5-cf79-4ba2-babf-66fb19559e3d': 'home_navChatActive',
  '049db54d-396e-4f6c-8021-8b4d14eada15': 'home_navHome',
  'cf0a53a6-c28b-4226-b6e2-a9db17f33215': 'home_navProfile',
  'f7800916-9891-4f98-9863-5c365ef0ad90': 'home_navApps',
  // TrendingAllPage / FilterPage shared back icon
  '09454fa1-bf05-4a27-a765-ac7e2602ed83': 'shared_backIcon',
  // SearchPage
  '11c1464b-dc85-4240-8516-6e4a0849a36d': 'search_iconSearch',
  '102e0a97-a4a4-4c1c-a43c-3e6b5632fb94': 'search_recentQuantTrader',
  'a7490efa-e43d-4d57-b4c1-081d6b16d0f5': 'search_recentCrCa',
  '5f93e772-f405-4750-ac57-a97a9f7d5b32': 'search_clawdCorp',
  '3b0651bf-f210-4d8f-bef2-1ce1b07a41f7': 'search_quantTrader',
  '489649db-57ed-4900-a570-7b60d9ab9919': 'search_luaf',
  'c6834788-2c53-422a-a7be-ad3dd0977d71': 'search_whaleIntel',
  'fbfbaf4a-e4ba-4178-b8eb-124cebf86f20': 'search_youtube',
  '96bbde53-53f0-4a90-8ed1-6ca529dbdbe2': 'search_freePrizes',
  '008c2842-7fcc-45a9-908c-bb48ed29bda1': 'search_fwafwafwa',
  'd52fc4ae-a8d4-4f66-884f-2175c732beae': 'search_swarmsLaunchpad',
  '75b33841-f7bb-493d-ac99-a0ae6c181bcf': 'search_claudeCode',
  // AgentDetailPage
  'cba07ebc-ca5a-4ed4-9e19-572b0ed0f07b': 'agent_heroBg',
  '274c6f28-b821-473d-b753-40027dd66c40': 'agent_authorAvatar',
  'b111a3c1-4085-48aa-8a4e-95f00fa8c6ca': 'agent_copyIcon',
  'dd45c07f-73f7-4220-958b-037622285664': 'agent_downloadIcon',
  'f926fea7-35e0-4176-99ea-24458573c1d6': 'agent_aiIcon',
  'e39b1a97-1bd1-4845-8210-8705395b48a6': 'agent_genImgIcon',
  '63d05d3a-ae64-43ee-89d9-573d89a2c771': 'agent_generatedImg',
  'c009a576-060b-45a4-8e52-948c6ff77c46': 'agent_recCard1',
  '543cd4ff-d19a-4307-9e71-49a2b76fa172': 'agent_recCard2',
  '4e3f1908-a548-4674-90ba-3bb7e772a599': 'agent_shareIcon',
  '8d45e8b3-ee6c-4fb8-86e5-576c26259b44': 'agent_cartIcon',
  'e1b391ae-97fa-45a7-b0ad-4d77656beb84': 'agent_starIcon',
  // ChatPage
  '14524825-edc1-470e-b152-27e47a7775b4': 'chat_logo',
  '9ab7fe81-22b6-4653-9648-3ca04023c972': 'chat_editIcon',
  '97115b49-ef42-439f-87d7-ac9605d3bf0c': 'chat_menuIcon',
  '150de584-d3c1-4ee4-8735-1f82812682ae': 'chat_attachIcon',
  '86fde8d9-0031-442a-8684-f21527ddc2fb': 'chat_micIcon',
  '925eed18-fd86-477c-948f-ebcf87bed244': 'chat_arrowUp',
  'f5058d44-a128-4144-b31c-6126516a091c': 'chat_searchIcon',
  '4d7b228a-6082-47c6-8dd8-2648648ff4ff': 'chat_newChatIcon',
  '552a9af7-1b7a-4580-8990-0402dee8e63a': 'chat_squareIcon',
  'a3730dd0-fe8a-472f-b9f0-b8f989797cbb': 'chat_settingsIcon',
  '38938ff5-cf79-4ba2-babf-66fb19559e3d': 'chat_navChatFilled',
  '061aeff6-c8fa-4ba0-9755-2db289030197': 'chat_navProfile',
  '0a9ca5cc-8bff-481f-b0fa-f4552da72cb2': 'chat_navHomeIcon',
  '75e22f32-cd65-4e04-8f7c-695213e73d59': 'chat_navApps',
  '5f7e35ab-6183-41dd-946c-71252885b17a': 'chat_swarmsAvatar',
  '2d6331cd-4c45-4bcc-a457-7fdaf880a8c4': 'chat_soundIcon',
  '0d837807-44fc-488f-a45e-f70ad2f666df': 'chat_copyIcon',
  '520cddba-a46d-456b-9caf-f049644c017c': 'chat_syncIcon',
  'a5652e5f-cd36-4e58-a3f2-54a9b9190130': 'chat_thumbDownIcon',
  '4971ed8a-dfd0-4fee-bc9c-71ba2b2da1bd': 'chat_deleteIcon',
  // ConfigPage
  '394a07be-dea4-4ad1-a21c-f09d1b3cf955': 'config_agent1Icon',
  '87694f70-9cf4-44e2-bf25-e33833ed47ec': 'config_agent2Icon',
  '4c8687c6-17f2-446b-aa61-e7c7304883cf': 'config_settingsIcon',
  '586548a2-e0cb-4f83-b680-ecf9609b78cd': 'config_marketplaceIcon',
  '1276d079-1196-425e-b178-fdbaeaeb83da': 'config_addIcon',
  'a96aaeec-2190-4eb7-a428-f10a877f61c2': 'config_chevronDown',
}

const SRC_DIR = 'C:/Users/13270/Desktop/swarms-marketplace/src'

const jsxFiles = [
  `${SRC_DIR}/pages/LaunchScreen.jsx`,
  `${SRC_DIR}/pages/SignInPage.jsx`,
  `${SRC_DIR}/pages/HomePage.jsx`,
  `${SRC_DIR}/pages/TrendingAllPage.jsx`,
  `${SRC_DIR}/pages/FilterPage.jsx`,
  `${SRC_DIR}/pages/SearchPage.jsx`,
  `${SRC_DIR}/pages/AgentDetailPage.jsx`,
  `${SRC_DIR}/pages/ChatPage.jsx`,
  `${SRC_DIR}/pages/ConfigPage.jsx`,
]

for (const file of jsxFiles) {
  let src = readFileSync(file, 'utf8')
  let changed = 0
  for (const [uuid, name] of Object.entries(UUID_TO_FILE)) {
    const figmaUrl = `https://www.figma.com/api/mcp/asset/${uuid}`
    const localPath = `/image/${name}.webp`
    if (src.includes(figmaUrl)) {
      src = src.replaceAll(figmaUrl, localPath)
      changed++
    }
  }
  if (changed > 0) {
    writeFileSync(file, src, 'utf8')
    console.log(`✓ ${file.split('/').at(-1)} — ${changed} URL(s) replaced`)
  } else {
    console.log(`- ${file.split('/').at(-1)} — no changes`)
  }
}

console.log('\nAll done.')
