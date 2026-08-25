/* TrentApps demo chrome.
   Injected into every demo page so visitors always know what they're looking at
   and can get back to trentapps.com. Also owns the shared "reset this demo"
   control — each demo keeps its state under a localStorage key it declares via
   <script src="/demos/assets/demobar.js" data-demo="Name" data-keys="k1,k2">. */
(function () {
  var me = document.currentScript;
  var name = (me && me.getAttribute('data-demo')) || 'Demo';
  var keys = ((me && me.getAttribute('data-keys')) || '').split(',').filter(Boolean);

  var css = document.createElement('style');
  css.textContent = [
    '#ta-demobar{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;',
    'display:flex;align-items:center;gap:14px;flex-wrap:wrap;',
    'padding:9px max(14px,env(safe-area-inset-left)) calc(9px + env(safe-area-inset-bottom));',
    'background:#00112c;color:#dbe7f7;border-top:1px solid rgba(130,185,255,.22);',
    'font:500 13px/1.35 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;}',
    '#ta-demobar a{color:#8ed6ff;text-decoration:none;}',
    '#ta-demobar a:hover{text-decoration:underline;}',
    '#ta-demobar .ta-home{display:inline-flex;align-items:center;gap:7px;font-weight:600;color:#fff;}',
    '#ta-demobar .ta-home img{width:19px;height:19px;display:block;}',
    '#ta-demobar .ta-tag{border:1px solid rgba(130,185,255,.3);border-radius:99px;padding:2px 9px;',
    'font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#8ed6ff;}',
    '#ta-demobar .ta-what{color:#9fb6d8;font-weight:400;flex:1;min-width:180px;}',
    '#ta-demobar button{font:inherit;font-size:12px;font-weight:600;cursor:pointer;color:#dbe7f7;',
    'background:transparent;border:1px solid rgba(130,185,255,.3);border-radius:99px;padding:5px 12px;}',
    '#ta-demobar button:hover{border-color:#35c4ff;color:#35c4ff;}',
    '#ta-demobar .ta-cta{background:#35c4ff;color:#00112c;border-color:#35c4ff;}',
    '#ta-demobar .ta-cta:hover{filter:brightness(1.08);color:#00112c;}',
    'body{padding-bottom:var(--ta-demobar-h,64px);}',
    '@media(max-width:640px){#ta-demobar .ta-what{display:none}}'
  ].join('');
  document.head.appendChild(css);

  function build() {
    var bar = document.createElement('div');
    bar.id = 'ta-demobar';
    bar.setAttribute('role', 'complementary');
    bar.setAttribute('aria-label', 'TrentApps demo bar');
    bar.innerHTML =
      '<a class="ta-home" href="/demos/"><img src="/assets/trentapps-mark.png" alt="">trentapps</a>' +
      '<span class="ta-tag">Demo</span>' +
      '<span class="ta-what">' + name + ' is an invented business built to show what we can make for yours.</span>' +
      (keys.length ? '<button type="button" id="ta-reset">Reset demo data</button>' : '') +
      '<a class="ta-cta" href="mailto:maya@trentapps.com?subject=' +
      encodeURIComponent('Something like the ' + name + ' demo') +
      '" style="display:inline-block;text-decoration:none;font-size:12px;font-weight:600;' +
      'border-radius:99px;padding:6px 13px;background:#35c4ff;color:#00112c;">Build me one</a>';
    document.body.appendChild(bar);

    /* Publish the bar's real height so pages with their own fixed UI (drawers,
       sticky footers) can clear it instead of guessing at 64px. */
    function measure() {
      document.documentElement.style.setProperty('--ta-demobar-h', bar.offsetHeight + 'px');
    }
    measure();
    window.addEventListener('resize', measure, { passive: true });

    var reset = document.getElementById('ta-reset');
    if (reset) {
      reset.addEventListener('click', function () {
        keys.forEach(function (k) { try { localStorage.removeItem(k.trim()); } catch (e) {} });
        location.reload();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
