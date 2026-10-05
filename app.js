/* =============================================================
 * app.js —— 展示层
 * 数据全部来自 data/*.js；页面结构由 HTML 提供，这里只负责填充。
 * 保持 data 驱动：新增游戏只改 data/games.js。
 * ============================================================= */
(function () {
  'use strict';

  var GAMES = window.PORTAL_GAMES || [];
  var RELEASES = window.PORTAL_RELEASES || [];
  var CONTROLS = window.PORTAL_CONTROLS || [];
  var SHOTS = window.PORTAL_SCREENSHOTS || [];

  /* ---------------- 工具 ---------------- */

  function $(id) {
    return document.getElementById(id);
  }

  function set(id, html) {
    var el = $(id);
    if (el) el.innerHTML = html;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function currentGame() {
    var i;
    for (i = 0; i < GAMES.length; i++) {
      if (GAMES[i].featured && GAMES[i].available) return GAMES[i];
    }
    for (i = 0; i < GAMES.length; i++) {
      if (GAMES[i].available) return GAMES[i];
    }
    return GAMES[0] || null;
  }

  function availableGames() {
    return GAMES.filter(function (g) {
      return g.available;
    });
  }

  function plannedGames() {
    return GAMES.filter(function (g) {
      return !g.available;
    });
  }

  function latestRelease() {
    for (var i = 0; i < RELEASES.length; i++) {
      if (RELEASES[i].current) return RELEASES[i];
    }
    return RELEASES[0] || null;
  }

  /* ---------------- 主题图标（极简线性） ---------------- */

  var ICONS = {
    explore:
      '<circle cx="14" cy="14" r="9.5"></circle>' +
      '<path d="M14 8.4 16.6 14 14 19.6 11.4 14Z"></path>',
    survive:
      '<path d="M14 22v-6.5"></path>' +
      '<path d="M14 15.5c0-4 3-6.5 7.5-6.5 0 4.2-3 6.5-7.5 6.5Z"></path>' +
      '<path d="M13.6 18c0-3-2.4-5-6-5 0 3.3 2.4 5 6 5Z"></path>',
    sail:
      '<path d="M5.5 18.5h19l-3.2 4.5H8.7Z"></path>' +
      '<path d="M15.5 18.5V5.5"></path>' +
      '<path d="M16.6 6.6 22 16.4h-5.4Z"></path>',
    friend:
      '<circle cx="9.6" cy="8.6" r="3.1"></circle>' +
      '<path d="M3.4 20.4c0-3.4 2.8-6.2 6.2-6.2s6.2 2.8 6.2 6.2"></path>' +
      '<circle cx="19.4" cy="10.8" r="2.4"></circle>' +
      '<path d="M16.8 20.4c0-2.9 1.9-5.2 4.8-5.2 1 0 2 .3 2.8.9"></path>'
  };

  function themeIcon(name) {
    return (
      '<svg class="theme-icon" viewBox="0 0 28 28" fill="none" stroke="currentColor" ' +
      'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICONS[name] || ICONS.explore) +
      '</svg>'
    );
  }

  function themesHtml(list) {
    if (!list || !list.length) return '';
    return list
      .map(function (t) {
        return (
          '<div class="theme">' +
          themeIcon(t.icon) +
          '<h3>' + esc(t.title) + '</h3>' +
          '<p>' + esc(t.text) + '</p>' +
          '</div>'
        );
      })
      .join('');
  }

  /* ---------------- 游戏大厅 ---------------- */

  function coverHtml(game) {
    return (
      '<div class="cover" data-cover="' + esc(game.cover || 'island') + '" role="img" aria-label="' +
      esc(game.title + ' 封面：薄雾中的低多边形海岛') + '"></div>'
    );
  }

  function gamePlateHtml(game, compact) {
    return (
      '<article class="game-plate' + (compact ? ' game-plate--compact' : '') + '">' +
      '<a class="game-plate-art" href="' + esc(game.launchPath) + '" tabindex="-1" aria-hidden="true">' +
      coverHtml(game) +
      '<span class="game-plate-veil"></span>' +
      '<span class="game-plate-play" aria-hidden="true"></span>' +
      '</a>' +
      '<div class="game-plate-body">' +
      '<h3 class="game-plate-title">' + esc(game.title) + '</h3>' +
      '<p class="game-plate-sub">' + esc(game.subtitle) + '</p>' +
      '<p class="game-plate-meta">' + esc(game.version) + ' · ' + esc(game.type) + '</p>' +
      '<div class="game-plate-actions">' +
      '<a class="btn btn-primary" href="' + esc(game.launchPath) + '">开始游戏</a>' +
      '<a class="btn btn-line" href="' + esc(game.detailPath || 'game.html') + '">游戏详情</a>' +
      '</div>' +
      '</div>' +
      '</article>'
    );
  }

  function lobbyHtml() {
    var list = availableGames();
    if (!list.length) return '';

    var main = list.filter(function (game) {
      return game.featured;
    })[0] || list[0];
    var additional = list.filter(function (game) {
      return game !== main;
    });

    return (
      gamePlateHtml(main, false) +
      (additional.length
        ? '<div class="lobby-additional">' +
          additional.map(function (game) {
            return gamePlateHtml(game, true);
          }).join('') +
          '</div>'
        : '')
    );
  }

  /* ---------------- 版本 ---------------- */

  // 首页 / 详情页：紧凑列表（当前 + 最近两条）
  function releasesHtml(limit) {
    var cur = latestRelease();
    if (!cur) return '';
    var rest = RELEASES.filter(function (r) {
      return r !== cur;
    }).slice(0, limit || 2);

    var rows = [cur].concat(rest).map(function (r) {
      return (
        '<li class="release-row' + (r.current ? ' is-current' : '') + '">' +
        '<span class="release-ver">' + esc(r.version) + '</span>' +
        '<span class="release-name">' + esc(r.codename) + '</span>' +
        '<span class="release-date">' + esc(r.date) + '</span>' +
        (r.current ? '<span class="release-now">当前版本</span>' : '') +
        '</li>'
      );
    });
    return '<ul class="release-list">' + rows.join('') + '</ul>';
  }

  // 独立版本页：完整时间线
  function timelineHtml() {
    if (!RELEASES.length) return '';
    return (
      '<ol class="timeline-list">' +
      RELEASES.map(function (r) {
        var points = (r.points || [])
          .map(function (p) {
            return '<li>' + esc(p) + '</li>';
          })
          .join('');
        return (
          '<li class="timeline-entry' + (r.current ? ' is-current' : '') + '">' +
          '<p class="timeline-head">' +
          '<span class="timeline-ver">' + esc(r.version) + '</span>' +
          '<span class="timeline-name">' + esc(r.codename) + '</span>' +
          '<span class="timeline-date">' + esc(r.date) + ' · ' + esc(r.status) + '</span>' +
          '</p>' +
          '<p class="timeline-summary">' + esc(r.summary) + '</p>' +
          (points ? '<ul class="timeline-points">' + points + '</ul>' : '') +
          '</li>'
        );
      })
      .join('') +
      '</ol>'
    );
  }

  /* ---------------- 操作方式 ---------------- */

  function keyHtml(key) {
    if (/^[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/.test(key)) {
      return key
        .split(' ')
        .map(function (k) {
          return '<kbd>' + esc(k) + '</kbd>';
        })
        .join('');
    }
    return '<span class="key-label">' + esc(key) + '</span>';
  }

  function controlsHtml() {
    if (!CONTROLS.length) return '';
    return CONTROLS.map(function (g) {
      var rows = (g.items || [])
        .map(function (it) {
          return (
            '<div class="control-row">' +
            '<dt class="control-key">' + keyHtml(it.key) + '</dt>' +
            '<dd class="control-desc">' + esc(it.desc) + '</dd>' +
            '</div>'
          );
        })
        .join('');
      return (
        '<section class="control-col">' +
        '<h3>' + esc(g.title) + '</h3>' +
        '<dl class="control-rows">' + rows + '</dl>' +
        (g.note ? '<p class="control-note">' + esc(g.note) + '</p>' : '') +
        '</section>'
      );
    }).join('');
  }

  /* ---------------- 画面 ---------------- */

  function shotsHtml() {
    if (SHOTS.length) {
      return (
        '<div class="shot-grid">' +
        SHOTS.map(function (s) {
          return (
            '<figure class="shot-item">' +
            '<img src="' + esc(s.src) + '" alt="' + esc(s.alt) + '" loading="lazy">' +
            (s.caption ? '<figcaption>' + esc(s.caption) + '</figcaption>' : '') +
            '</figure>'
          );
        }).join('') +
        '</div>'
      );
    }
    return '';
  }

  /* ---------------- 页面装配 ---------------- */

  function initHome() {
    var g = currentGame();
    if (!g) return;
    var rel = latestRelease();

    var play = $('heroPlay');
    if (play && g.launchPath) play.setAttribute('href', g.launchPath);
    set('heroVersion', rel ? esc(rel.version + ' ' + rel.codename) : esc(g.version));
    set('footerVersion', rel ? '当前版本 ' + esc(rel.version + ' ' + rel.codename) : '');
    set('introThemes', themesHtml(g.themes));
    set('lobbyGames', lobbyHtml());
    set('recentReleases', releasesHtml(2));
  }

  function initGame() {
    var g = currentGame();
    if (!g) return;
    var rel = latestRelease();

    set('detailTitle', esc(g.title));
    set('detailLede', esc(g.subtitle));
    set('detailVersion', rel ? esc(rel.version + ' ' + rel.codename) : esc(g.version));
    set(
      'detailActions',
      '<a class="btn btn-primary" href="' + esc(g.launchPath) + '">开始游戏</a>' +
        '<a class="btn btn-line" href="index.html#games">返回游戏大厅</a>'
    );
    set('detailThemes', themesHtml(g.themes));
    set('detailProse', '<p>' + esc(g.description[0]) + '</p>');
    set('detailControls', controlsHtml());
    set('detailReleases', releasesHtml(2));
    set('detailShots', shotsHtml());
    if (!SHOTS.length) {
      var shotsSection = $('shots');
      if (shotsSection) shotsSection.hidden = true;
    }
  }

  function initVersions() {
    set('releaseTimeline', timelineHtml());
  }

  /* ---------------- 交互 ---------------- */

  function initHeader() {
    var header = $('siteHeader');
    if (!header) return;
    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initNav() {
    var toggle = $('navToggle');
    var nav = $('primaryNav');
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) close();
    });
  }

  function initSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.primary-nav a'));
    if (!links.length) return;

    var here = location.pathname.split('/').pop() || 'index.html';
    var homeLink = links.filter(function (a) {
      return (a.getAttribute('href') || '').split('#')[0] === 'index.html';
    })[0];
    var gameLink = links.filter(function (a) {
      return (a.getAttribute('href') || '').indexOf('#games') !== -1;
    })[0];
    var aboutLink = links.filter(function (a) {
      return (a.getAttribute('href') || '').indexOf('#about') !== -1;
    })[0];

    if (here === 'game.html' && gameLink) {
      gameLink.classList.add('is-active');
      return;
    }

    if (here !== 'index.html') {
      links.forEach(function (a) {
        if ((a.getAttribute('href') || '').split('#')[0] === here) {
          a.classList.add('is-active');
        }
      });
      return;
    }

    var games = document.getElementById('games');
    var versions = document.getElementById('versions');
    var about = document.getElementById('about');

    function update() {
      var line = window.scrollY + 140;
      var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      var active = homeLink;
      if (games && games.getBoundingClientRect().top + window.scrollY <= line) active = gameLink;
      if (versions && versions.getBoundingClientRect().top + window.scrollY <= line) active = homeLink;
      if (about && (about.getBoundingClientRect().top + window.scrollY <= line || atBottom)) active = aboutLink;
      links.forEach(function (a) {
        a.classList.toggle('is-active', a === active);
      });
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function initReveal() {
    var nodes = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !nodes.length) {
      Array.prototype.forEach.call(nodes, function (n) {
        n.classList.add('is-visible');
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('is-visible');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -4% 0px' }
    );
    Array.prototype.forEach.call(nodes, function (n) {
      io.observe(n);
    });
    setTimeout(function () {
      Array.prototype.forEach.call(nodes, function (n) {
        if (n.getBoundingClientRect().top < window.innerHeight * 0.92) {
          n.classList.add('is-visible');
        }
      });
    }, 80);
  }

  /* ---------------- 启动 ---------------- */

  function boot() {
    initHeader();
    initNav();
    initHome();
    initGame();
    initVersions();
    initSpy();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
