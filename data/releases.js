/* =============================================================
 * data/releases.js —— 版本时间线数据源
 * -------------------------------------------------------------
 * 内容全部整理自 reference/ 下的正式说明与验收报告，不虚构版本内容。
 * 修改版本信息：只改本文件即可，index.html 与 game.html 会自动渲染。
 *
 * 字段说明
 *   version  string   版本号
 *   codename string   版本代号/副名
 *   date     string   完成日期
 *   status   string   展示文案，例如“长期稳定基线”
 *   current  boolean  true 时高亮为当前版本
 *   summary  string   一句话概述
 *   points   string[] 要点列表
 * ============================================================= */
window.PORTAL_RELEASES = [
  {
    version: 'v12.2',
    codename: 'Final Foundation',
    date: '2026-10-05',
    status: '长期稳定基线',
    current: true,
    summary: '修复再生资源、伙伴外岛行为与陷阱动物恢复问题。',
    points: []
  },
  {
    version: 'v12.1.2',
    codename: 'Photo Album Preview',
    date: '2026-10-04',
    status: '历史版本',
    current: false,
    summary: '新增“荒岛相册”：可查看拍摄地点、时间、天气和文件名，记录随游戏保存，最多 50 条。',
    points: [
      '在拍照工具条点“相册”查看已有记录，倒序排列',
      '删除需要二次确认，记录随存档恢复',
      'PNG 继续下载到本地，相册不存图片本体',
      '原拍照模式与核心玩法保持稳定'
    ]
  },
  {
    version: 'v12.1.1',
    codename: 'Photo Preview',
    date: '2026-10-04',
    status: '历史版本',
    current: false,
    summary: '新增轻量拍照模式，可在世界中自由取景并导出无 HUD 的 PNG。',
    points: [
      'P 进入 / 退出，Esc 退出，Enter 导出 PNG，H 隐藏提示',
      '沿用右键旋转与滚轮缩放',
      '拍照时角色操作暂时禁用，世界继续运行',
      '玩法、任务、岛屿、航行和存档逻辑未变'
    ]
  },
  {
    version: 'v12.1',
    codename: 'Public Demo',
    date: '2026-10-04',
    status: '历史版本',
    current: false,
    summary: 'Public Demo：约 15–20 分钟体验探索、采集、制作、远征与返营。',
    points: [
      '菜单和游戏内成就、默认精简 HUD、可展开观察详情',
      '内联自然录音及划桨声延续 RC',
      '保留低潮潮池采集、永久观察记录与既有动物反馈'
    ]
  }
];
