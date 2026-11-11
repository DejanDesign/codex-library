/* CODEX Polish Kit v1 — small progressive enhancements. Everything works without this file. */
(function () {
  var d = document, root = d.documentElement;
  root.classList.add('kit-js');

  // Stagger: children with data-reveal inside a data-reveal-group get --i = 0, 1, 2...
  [].forEach.call(d.querySelectorAll('[data-reveal-group]'), function (g) {
    [].forEach.call(g.querySelectorAll('[data-reveal]'), function (el, i) { el.style.setProperty('--i', i % 8); });
  });

  // Reveal on scroll, with a safety net so content can never stay hidden.
  var items = [].slice.call(d.querySelectorAll('[data-reveal]'));
  var showAll = function () { items.forEach(function (el) { el.classList.add('is-in'); }); };
  if ('IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }
  setTimeout(showAll, 1200);

  // Numbers count up once when visible: <span class="kit-number" data-count="35">35</span>
  var counters = [].slice.call(d.querySelectorAll('[data-count]'));
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (counters.length && 'IntersectionObserver' in window && !reduce) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) { return; }
        cio.unobserve(e.target);
        var el = e.target, end = parseFloat(el.getAttribute('data-count')) || 0, t0 = null;
        var step = function (t) { if (!t0) { t0 = t; } var p = Math.min((t - t0) / 1200, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) { requestAnimationFrame(step); } };
        requestAnimationFrame(step);
      });
    });
    counters.forEach(function (el) { cio.observe(el); });
  }

  // Header gets a glass background once the page scrolls.
  var header = d.querySelector('.kit-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Broken images reveal the designed gradient behind them instead of a broken icon.
  [].forEach.call(d.querySelectorAll('img'), function (img) {
    var mark = function () { img.classList.add('kit-broken'); };
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) { mark(); }
    img.addEventListener('error', mark);
  });

  // Menu tabs: <div class="kit-tabs"> with .kit-tabs__tab buttons (aria-controls) and .kit-tabs__panel sections.
  [].forEach.call(d.querySelectorAll('.kit-tabs'), function (box) {
    var tabs = [].slice.call(box.querySelectorAll('.kit-tabs__tab'));
    var select = function (tab) {
      tabs.forEach(function (t) {
        var on = t === tab, panel = d.getElementById(t.getAttribute('aria-controls'));
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        if (panel) { panel.hidden = !on; }
      });
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') { return; }
        var n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        select(n); n.focus();
      });
    });
    if (tabs.length) { select(tabs[0]); }
  });

  // Mobile action bar: reserve space at the bottom of the page.
  if (d.querySelector('.kit-actionbar')) { d.body.classList.add('kit-has-actionbar'); }
})();
