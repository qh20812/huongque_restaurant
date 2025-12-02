// Automated Node test for Set Menu CRUD and image checks
// Run with: node scripts/test-admin-quan-ly-set-menu.js

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

    // 2) Get list of dishes to use in set menu sections
    console.log('\n2) Fetch a list of available dishes');
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
        const payload = { name, slug, description: 'Auto-generated for set menu test', categoryId: 1, imageUrl: sampleImg1 };
        const cRes = await request({ hostname: 'localhost', port: 3000, path: '/api/admin/mon-an', method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: cookieHeader } }, JSON.stringify(payload));
        if (cRes.statusCode !== 200) throw new Error('Failed to create sample dish: ' + cRes.body);
        const created = JSON.parse(cRes.body).dish;
        dishes.push(created);
      }
    }

    // Collect at least 2 dish ids
    const dishIds = dishes.slice(0, 3).map((d) => d.id).filter(Boolean);
    if (dishIds.length < 2) throw new Error('Not enough dishes to create sections (need at least 2)');

    // 3) Create set menu
    console.log('\n3) Creating a set menu');
    const now = Date.now();
    const createPayload = {
      name: `Auto SetMenu ${now}`,
      slug: `auto-setmenu-${now}`,
      description: 'Automated set menu created by test',
      price: 899000,
      servesMin: 2,
      servesMax: 4,
      isActive: true,
      sections: [
        {
          name: 'Khai vị',
          order: 1,
          items: [
            { dishId: dishIds[0], notes: 'Không cay', quantity: 1 },
          ],
        },
        {
          name: 'Món chính',
          order: 2,
          items: [
            { dishId: dishIds[1], notes: '', quantity: 1 },
          ],
        },
      ],
    };

    const createRes = await request({ hostname: 'localhost', port: 3000, path: '/api/admin/set-menu', method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: cookieHeader } }, JSON.stringify(createPayload));
    if (createRes.statusCode !== 201) throw new Error('Create set menu failed: ' + createRes.body);
    const createJson = JSON.parse(createRes.body);
    if (!createJson.success || !createJson.data) throw new Error('Create set menu invalid response');
    const created = createJson.data;
    console.log('Created set menu id:', created.id, 'name:', created.name);

    // 4) Fetch set menu by id
    console.log('\n4) Fetching created set menu to verify sections and item dish images');
    const getRes = await request({ hostname: 'localhost', port: 3000, path: `/api/admin/set-menu/${created.id}`, method: 'GET', headers: { Cookie: cookieHeader } });
    if (getRes.statusCode !== 200) throw new Error('Get set menu failed: ' + getRes.body);
    const getJson = JSON.parse(getRes.body);
    const setMenuData = getJson.data;

    if (!setMenuData.sections || !setMenuData.sections.length) throw new Error('Set menu missing sections');
    console.log('Sections count:', setMenuData.sections.length);

    // verify dish images for each item
    async function verifyImageUrl(url) {
      if (!url) return false;
      if (String(url).startsWith('data:')) {
        return true; // data URL, considered OK
      }
      return new Promise((resolve) => {
        const isHttps = String(url).startsWith('https:');
        const lib = isHttps ? https : http;
        try {
          const r = lib.request(url, { method: 'GET' }, (res) => {
            const ok = res.statusCode && res.statusCode >= 200 && res.statusCode < 400 && (res.headers['content-type']||'').startsWith('image');
            res.resume();
            resolve(!!ok);
          });
          r.on('error', (e) => { console.warn('Image check error', e.message); resolve(false); });
          r.end();
        } catch (e) {
          console.warn('Image check exception', e && e.message);
          resolve(false);
        }
      });
    }

    for (const sec of setMenuData.sections) {
      for (const item of sec.items || []) {
        const dish = item.dish;
        if (dish && dish.imageUrl) {
          console.log('Checking image for dish', dish.name, dish.imageUrl);
          const ok = await verifyImageUrl(dish.imageUrl);
          if (!ok) console.warn('Image not reachable for dish', dish.name, dish.imageUrl);
          else console.log('Image ok for dish', dish.name);
        }
      }
    }

    // 5) Update set menu
    console.log('\n5) Updating set menu name and price');
    const updatedName = created.name + ' (Updated)';
    const updateRes = await request({ hostname: 'localhost', port: 3000, path: `/api/admin/set-menu/${created.id}`, method: 'PUT', headers: { 'Content-Type': 'application/json', Cookie: cookieHeader } }, JSON.stringify({ name: updatedName, price: 999000 }));
    if (updateRes.statusCode !== 200) throw new Error('Update set menu failed: ' + updateRes.body);
    const updateJson = JSON.parse(updateRes.body);
    console.log('Update response success', updateJson.success);

    const verifyAfterUpdateRes = await request({ hostname: 'localhost', port: 3000, path: `/api/admin/set-menu/${created.id}`, method: 'GET', headers: { Cookie: cookieHeader } });
    const verifyAfterUpdateJson = JSON.parse(verifyAfterUpdateRes.body);
    if (verifyAfterUpdateJson.data.name !== updatedName) throw new Error('Update verification failed for name');
    if (verifyAfterUpdateJson.data.price !== 999000) throw new Error('Update verification failed for price');
    console.log('Update verified OK');

    // 6) Delete set menu
    console.log('\n6) Deleting set menu');
    const delRes = await request({ hostname: 'localhost', port: 3000, path: `/api/admin/set-menu/${created.id}`, method: 'DELETE', headers: { Cookie: cookieHeader } });
    if (delRes.statusCode !== 200) throw new Error('Delete failed: ' + delRes.body);
    console.log('Delete response:', delRes.body);

    // verify deletion
    const afterDelRes = await request({ hostname: 'localhost', port: 3000, path: `/api/admin/set-menu/${created.id}`, method: 'GET', headers: { Cookie: cookieHeader } });
    if (afterDelRes.statusCode === 404) console.log('Verified deletion: 404 Not Found');
    else throw new Error('Set menu still exists after delete: ' + afterDelRes.body);

    console.log('\nSet menu CRUD test passed');
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
})();
