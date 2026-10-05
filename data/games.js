/* =============================================================
 * data/games.js —— 游戏大厅数据源（唯一维护入口）
 * -------------------------------------------------------------
 * 新增游戏：在本数组末尾追加一个对象即可，首页游戏大厅与详情页会
 * 自动渲染，不需要改动 index.html / game.html 的结构。
 *
 * 字段说明
 *   id          string  唯一标识，用于详情页锚点与 DOM id
 *   title       string  游戏名
 *   subtitle    string  一句话副标题
 *   version     string  当前版本号
 *   status      string  stable | preview | planned
 *   statusText  string  状态显示文案
 *   type        string  类型/题材
 *   cover       string  内置封面 key：island | sea | forest | dawn | none
 *   description string[] 简介段落（基于 reference 资料整理，请勿虚构功能）
 *   tags        string[] 核心系统标签
 *   launchPath  string  启动入口（相对路径）；planned 状态可留空
 *   detailPath  string  详情页；没有则留空
 *   available   boolean false 时渲染为“即将开放”占位卡片
 *   featured    boolean 是否在首页作为主推大卡展示
 * ============================================================= */
window.PORTAL_GAMES = [
  {
    id: 'island-survival',
    title: '荒岛求生',
    subtitle: '在群岛之间航行、生存、建造，并记录属于你的荒岛故事。',
    version: 'v12.2 Final Foundation',
    status: 'stable',
    statusText: '稳定版本',
    type: '3D 生存 / 探索 / 建造',
    cover: 'island',
    description: [
      '荒岛求生是一款 3D 荒岛生存游戏。当前版本保留主岛与外岛，包含生存采集与建造、天气与昼夜、船只航行、阿禾与阿岩两位 NPC、保存继续与旧档兼容，以及拍照模式与荒岛相册。',
      'v12.2 Final Foundation 是阶段性收官版本：修复再生资源、NPC 外岛锚点与陷阱动物的存档恢复，恢复正式音频探针与真实输入试玩；本版本没有新增玩法、地图、航行物理或任务节奏。',
      '正式游戏为单文件 HTML，素材全部内联，双击即可运行，不需要本地服务器或联网。'
    ],
    tags: [
      '岛屿探索',
      '生存资源',
      '建造',
      '昼夜与天气',
      '跨岛航行',
      'NPC 阿禾 / 阿岩',
      '保存与继续',
      '拍照模式',
      '相册记录'
    ],
    themes: [
      { icon: 'explore', title: '探索', text: '穿行于主岛与外岛之间，寻找资源与未知地点。' },
      { icon: 'survive', title: '生存', text: '采集与建造，并应对昼夜与天气的变化。' },
      { icon: 'sail', title: '航行', text: '驾驶木筏跨越海域，前往不同的岛屿。' },
      { icon: 'friend', title: '伙伴', text: '与阿禾、阿岩同行，在岛上建立关系与营地。' }
    ],
    launchPath: 'games/island-survival.html',
    detailPath: 'game.html',
    available: true,
    featured: true,
    released: '2026-10-05',
    baseline: {
      file: '10月5-v12.2-final-foundation.html',
      size: '7,572,410 bytes',
      sha256: 'c101871c6f02c83aea759bab4b876746045ddfb749108a24b56046058e955228',
      acceptance: '统一验收 37/37 全通过'
    }
  },

  /* ---------------------------------------------------------
   * 以下为未来游戏预留槽位。
   * 不要虚构具体游戏名称与玩法，保持“即将开放”。
   * 有新游戏时：把对应槽位的 available 改为 true 并补全字段即可。
   * --------------------------------------------------------- */
  {
    id: 'slot-2',
    title: '即将开放',
    subtitle: '下一个游戏正在规划中',
    version: '—',
    status: 'planned',
    statusText: '即将开放',
    type: '待公布',
    cover: 'sea',
    description: [],
    tags: [],
    launchPath: '',
    detailPath: '',
    available: false,
    featured: false
  },
  {
    id: 'slot-3',
    title: '即将开放',
    subtitle: '下一个游戏正在规划中',
    version: '—',
    status: 'planned',
    statusText: '即将开放',
    type: '待公布',
    cover: 'forest',
    description: [],
    tags: [],
    launchPath: '',
    detailPath: '',
    available: false,
    featured: false
  },
  {
    id: 'slot-4',
    title: '即将开放',
    subtitle: '下一个游戏正在规划中',
    version: '—',
    status: 'planned',
    statusText: '即将开放',
    type: '待公布',
    cover: 'dawn',
    description: [],
    tags: [],
    launchPath: '',
    detailPath: '',
    available: false,
    featured: false
  }
];
