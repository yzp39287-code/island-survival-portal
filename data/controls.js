/* =============================================================
 * data/controls.js —— 操作说明数据源
 * -------------------------------------------------------------
 * 内容整理自 reference/README-main-project.md 与游戏副本内的
 * Public Demo 引导文案。未被资料明确支持的按键不要自行添加。
 *
 * 字段说明
 *   group  string   分组名（移动 / 视角 / 交互 / 背包 / 航行 / 拍照 …）
 *   icon   string   分组图标（单字符或 emoji，保持克制）
 *   items  {key, desc}[]   按键与说明
 *   note   string   可选补充说明
 * ============================================================= */
window.PORTAL_CONTROLS = [
  {
    group: '移动',
    icon: '↑',
    items: [
      { key: 'W A S D', desc: '移动角色（方向取自镜头在地面的投影）' },
      { key: 'Shift', desc: '加速移动' }
    ]
  },
  {
    group: '视角',
    icon: '◎',
    items: [
      { key: '鼠标右键拖动', desc: '转动视角' },
      { key: '滚轮', desc: '调整镜头远近' },
      { key: 'F / 双击', desc: '复位镜头偏移' }
    ]
  },
  {
    group: '交互',
    icon: '✋',
    items: [
      { key: 'E', desc: '采集 / 互动，走近木材、藤蔓等资源后使用' },
      { key: 'K', desc: '捕鱼' },
      { key: 'V', desc: '鱼获图鉴' },
      { key: 'H', desc: '快捷键帮助（拍照模式下为隐藏提示）' }
    ]
  },
  {
    group: '背包',
    icon: '🎒',
    items: [
      { key: 'B', desc: '打开制作与背包面板' }
    ]
  },
  {
    group: '航行',
    icon: '⛵',
    items: [
      { key: 'G', desc: '登船 / 下船，抵岸后在此登陆' },
      { key: 'W A S D', desc: '在船上划行' },
      { key: 'U', desc: '在船边查看船只面板，选择目的地' }
    ]
  },
  {
    group: '拍照',
    icon: '▣',
    items: [
      { key: 'P', desc: '进入 / 退出拍照模式' },
      { key: 'Esc', desc: '退出拍照模式' },
      { key: 'Enter', desc: '导出无 HUD 的 PNG' },
      { key: 'H', desc: '隐藏屏幕提示' }
    ]
  },
  {
    group: '保存与继续',
    icon: '💾',
    items: [
      { key: '右上角“保存游戏”', desc: '保存当前进度' },
      { key: '菜单入口', desc: '从菜单继续已有存档' }
    ]
  }
];
