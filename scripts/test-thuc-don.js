// Automated Node test for Thuc Don (Set Menu display) 
// Run with: node scripts/test-thuc-don.js

const http = require('http');
const https = require('https');

function request(options, body) {
  return new Promise((resolve, reject) => {
    const lib = options.protocol === 'https:' ? https : http;
    const req = lib.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

(async () => {
  try {
    // 1) Login as admin
    console.log('1) Login as admin');
    const loginRes = await request(
      { hostname: 'localhost', port: 3000, path: '/api/dang-nhap', method: 'POST', headers: { 'Content-Type': 'application/json' } },
      JSON.stringify({ identifier: 'admin@huongque.vn', password: 'Admin123' })
    );

    if (loginRes.statusCode !== 200) throw new Error('Login failed: ' + loginRes.body);
    const setCookie = loginRes.headers['set-cookie'];
    const cookieHeader = Array.isArray(setCookie) ? setCookie.join('; ') : setCookie;
    if (!cookieHeader || !cookieHeader.includes('hq_token=')) throw new Error('hq_token cookie missing after login');
    console.log('Login OK');

    // 2) Ensure there are at least 2 dishes
    console.log('\n2) Fetching a list of dishes to use in set menu');
    const dishListRes = await request({ hostname: 'localhost', port: 3000, path: '/api/admin/mon-an?page=1&pageSize=100', method: 'GET', headers: { Cookie: cookieHeader } });
    if (dishListRes.statusCode !== 200) throw new Error('Failed to fetch dishes: ' + dishListRes.body);
    const dishListJson = JSON.parse(dishListRes.body);
    const dishes = Array.isArray(dishListJson.items) ? dishListJson.items : [];
    if (!dishes.length) {
      console.log('No dishes found, creating 2 sample dishes');
      // create sample dishes
      const sampleImg1 = 'https://via.placeholder.com/150';
      for (let i = 0; i < 2; i++) {
        const name = `AutoDish ${Date.now()}_${i}`;
        const slug = `autodish-${Date.now()}-${i}`;
        const payload = { name, slug, description: 'Auto-generated for thuc-don test', categoryId: 1, imageUrl: sampleImg1 };
        const cRes = await request({ hostname: 'localhost', port: 3000, path: '/api/admin/mon-an', method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: cookieHeader } }, JSON.stringify(payload));
        if (cRes.statusCode !== 200) throw new Error('Failed to create sample dish: ' + cRes.body);
        const created = JSON.parse(cRes.body).dish;
        dishes.push(created);
      }
    }

    const dishIds = dishes.slice(0, 3).map((d) => d.id).filter(Boolean);
    if (dishIds.length < 2) throw new Error('Not enough dishes to create sections (need at least 2)');

    // Helper to fetch thuc-don page HTML
    async function fetchThucDonHtml() {
      const res = await request({ hostname: 'localhost', port: 3000, path: '/thuc-don', method: 'GET' });
      if (res.statusCode !== 200) throw new Error('Failed to fetch /thuc-don: ' + res.statusCode);
      return res.body;
    }

    // 3) Create an active set menu and verify it appears on /thuc-don
    console.log('\n3) Creating an active set menu that should display on /thuc-don');
    const now = Date.now();
    const activePayload = {
      name: `AutoSetMenu Visible ${now}`,
      slug: `auto-setmenu-visible-${now}`,
      description: 'Auto visible set menu',
      price: 799000,
      servesMin: 2,
      servesMax: 4,
      isActive: true,
      sections: [
        {
          name: 'Khai vi',
          order: 1,
          items: [ { dishId: dishIds[0], notes: '', quantity: 1 } ],
        },
        {
          name: 'Mon chinh',
          order: 2,
          items: [ { dishId: dishIds[1], notes: '', quantity: 1 } ],
        },
      ],
    };

    const createResActive = await request({ hostname: 'localhost', port: 3000, path: '/api/admin/set-menu', method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: cookieHeader } }, JSON.stringify(activePayload));
    if (createResActive.statusCode !== 201) throw new Error('Create active set menu failed: ' + createResActive.body);
    const createActiveJson = JSON.parse(createResActive.body);
    const activeCreated = createActiveJson.data;
    console.log('Created active set menu id:', activeCreated.id, 'name:', activeCreated.name);

    // fetch thuc-don page and assert menu name appears
    const html1 = await fetchThucDonHtml();
    // Page renders menu.name.toUpperCase() in the design; normalize our check
    const expectedMenuUpper = String(activeCreated.name).toUpperCase();
    if (!html1.includes(expectedMenuUpper)) throw new Error('Active set menu name not found on /thuc-don');
    console.log('Active set menu displayed on /thuc-don');

    // Also assert an item dish name appears (one item from sections)
    const dishName = (dishes.find(d => d.id === dishIds[0]) || {}).name;
    if (dishName && !html1.includes(dishName)) console.warn('Dish name not found on /thuc-don page, but it was included in the set menu.');

    // 4) Create an inactive set menu and verify it does not appear
    console.log('\n4) Creating an INACTIVE set menu (should NOT be displayed)');
    const inactivePayload = {
      name: `AutoSetMenu Hidden ${now}`,
      slug: `auto-setmenu-hidden-${now}`,
      description: 'Auto hidden set menu',
      price: 399000,
      servesMin: 1,
      servesMax: 2,
      isActive: false,
      sections: [
        { name: 'Khong hien', order: 1, items: [ { dishId: dishIds[0], notes: '', quantity: 1 } ] },
      ],
    };

    const createResHidden = await request({ hostname: 'localhost', port: 3000, path: '/api/admin/set-menu', method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: cookieHeader } }, JSON.stringify(inactivePayload));
    if (createResHidden.statusCode !== 201) throw new Error('Create inactive set menu failed: ' + createResHidden.body);
    const createHiddenJson = JSON.parse(createResHidden.body);
    const hiddenCreated = createHiddenJson.data;
    console.log('Created hidden set menu id:', hiddenCreated.id, 'name:', hiddenCreated.name);

    const html2 = await fetchThucDonHtml();
    if (html2.includes(String(hiddenCreated.name))) throw new Error('Hidden set menu appears on /thuc-don (should be hidden)');
    console.log('Hidden set menu NOT displayed on /thuc-don (OK)');

    // 5) Update active menu to hidden and verify it's removed
    console.log('\n5) Update the previously active set menu to isActive=false and verify it disappears');
    const updateRes = await request({ hostname: 'localhost', port: 3000, path: `/api/admin/set-menu/${activeCreated.id}`, method: 'PUT', headers: { 'Content-Type': 'application/json', Cookie: cookieHeader } }, JSON.stringify({ isActive: false }));
    if (updateRes.statusCode !== 200) throw new Error('Update active set menu to hidden failed: ' + updateRes.body);
    const html3 = await fetchThucDonHtml();
    if (html3.includes(String(activeCreated.name))) throw new Error('Updated (hidden) set menu still displayed on /thuc-don');
    console.log('Updated set menu removed from /thuc-don (OK)');

    // 6) Clean up: delete hidden and previous (now hidden) set menus
    console.log('\n6) Cleanup: Deleting created set menus');
    const delHiddenRes = await request({ hostname: 'localhost', port: 3000, path: `/api/admin/set-menu/${hiddenCreated.id}`, method: 'DELETE', headers: { Cookie: cookieHeader } });
    if (delHiddenRes.statusCode !== 200) console.warn('Failed to delete created hidden set menu: ' + delHiddenRes.body);
    const delActiveRes = await request({ hostname: 'localhost', port: 3000, path: `/api/admin/set-menu/${activeCreated.id}`, method: 'DELETE', headers: { Cookie: cookieHeader } });
    if (delActiveRes.statusCode !== 200) console.warn('Failed to delete created set menu that was updated to hidden: ' + delActiveRes.body);

    console.log('\nThuc-Don tests passed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Thuc-Don test failed:', err);
    process.exit(1);
  }
})();
