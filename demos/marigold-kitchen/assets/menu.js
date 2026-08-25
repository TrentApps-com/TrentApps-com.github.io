/* Marigold Kitchen demo — shared menu data + order helpers.
   The ordering page and the kitchen display (KDS) both share the same
   BroadcastChannel + localStorage conventions so an order placed on /order
   appears live on /staff with no backend. This mirrors the production
   order→KDS pattern (client-side BroadcastChannel + localStorage). */
(function (global) {
  var CHANNEL = 'ta-marigold-orders';
  var STORE_KEY = 'ta-marigold-orders-board';

  // Fictional menu. Everything here is invented for the demo — no real prices,
  // no real business. Prices are in dollars.
  var MENU = [
    { cat: 'Starters', items: [
      { id: 'flatbread',   name: 'Marigold Flatbread',   price: 9,  desc: 'Whipped ricotta, hot honey, charred scallion.', tags: ['veg'] },
      { id: 'garden-soup', name: 'Garden Tomato Soup',    price: 7,  desc: 'Slow-roasted tomato, basil oil, grilled bread.', tags: ['veg'] },
      { id: 'brussels',    name: 'Crispy Brussels',       price: 8,  desc: 'Maple, chili crunch, lemon.', tags: ['veg','gf'] }
    ]},
    { cat: 'Mains', items: [
      { id: 'roast-chicken', name: 'Sunday Roast Chicken', price: 19, desc: 'Half chicken, pan jus, smashed potatoes.', tags: ['gf'] },
      { id: 'risotto',       name: 'Wild Mushroom Risotto', price: 17, desc: 'Carnaroli, parmesan, thyme.', tags: ['veg','gf'] },
      { id: 'harvest-bowl',  name: 'Harvest Grain Bowl',    price: 14, desc: 'Farro, roasted squash, kale, tahini.', tags: ['veg','vegan'] },
      { id: 'steak-frites',  name: 'Skirt Steak Frites',    price: 24, desc: 'Chimichurri, hand-cut fries.', tags: ['gf'] }
    ]},
    { cat: 'Handhelds', items: [
      { id: 'burger',        name: 'The Marigold Burger',   price: 15, desc: 'Two patties, aged cheddar, house sauce.', tags: [] },
      { id: 'crispy-chx',    name: 'Crispy Chicken Sandwich', price: 13, desc: 'Buttermilk-fried, slaw, pickles.', tags: [] }
    ]},
    { cat: 'Sides', items: [
      { id: 'fries',  name: 'Hand-cut Fries',  price: 5, desc: 'Sea salt, herb aioli.', tags: ['veg'] },
      { id: 'greens', name: 'Seasonal Greens', price: 6, desc: 'Lemon vinaigrette.', tags: ['veg','vegan','gf'] }
    ]},
    { cat: 'Drinks', items: [
      { id: 'lemonade',  name: 'House Lemonade', price: 4, desc: 'Fresh-squeezed.', tags: ['veg','vegan','gf'] },
      { id: 'cold-brew', name: 'Cold Brew',      price: 4, desc: 'Local roaster.', tags: ['veg','vegan','gf'] },
      { id: 'ipa',       name: 'Local IPA',      price: 7, desc: 'Rotating draft.', tags: [] }
    ]},
    { cat: 'Sweets', items: [
      { id: 'cookie', name: 'Brown Butter Cookie', price: 4, desc: 'Warm, sea salt.', tags: ['veg'] },
      { id: 'crisp',  name: 'Seasonal Fruit Crisp', price: 8, desc: 'Oat crumble, vanilla cream.', tags: ['veg'] }
    ]}
  ];

  var BY_ID = {};
  MENU.forEach(function (g) { g.items.forEach(function (it) { BY_ID[it.id] = it; }); });

  function money(n) { return '$' + Number(n).toFixed(2); }

  function loadBoard() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
    catch (_) { return []; }
  }
  function saveBoard(board) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(board)); } catch (_) {}
  }

  global.Marigold = {
    CHANNEL: CHANNEL,
    STORE_KEY: STORE_KEY,
    MENU: MENU,
    BY_ID: BY_ID,
    money: money,
    loadBoard: loadBoard,
    saveBoard: saveBoard
  };
})(window);
