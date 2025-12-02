// Script to test admin dish management (add / read / update / delete) and verify image
// Run with: node scripts/test-admin-quan-ly-mon-an.js

const http = require('http');
const https = require('https');

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = (options.protocol === 'https:' ? https : http).request(options, (res) => {
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
    console.log('1) Logging in as admin');
    const loginRes = await request(
      { hostname: 'localhost', port: 3000, path: '/api/dang-nhap', method: 'POST', headers: { 'Content-Type': 'application/json' } },
      JSON.stringify({ identifier: 'admin@huongque.vn', password: 'Admin123' })
    );

    if (loginRes.statusCode !== 200) {
      console.error('Login failed', loginRes.statusCode, loginRes.body);
      process.exit(1);
    }

    const setCookie = loginRes.headers['set-cookie'];
    const cookieHeader = Array.isArray(setCookie) ? setCookie.join('; ') : setCookie;
    if (!cookieHeader || !cookieHeader.includes('hq_token=')) {
      console.error('No hq_token cookie');
      process.exit(1);
    }

    console.log('Login OK');

    console.log('\n2) Fetching categories for categoryId');
    const catRes = await request({ hostname: 'localhost', port: 3000, path: '/api/admin/danh-muc', method: 'GET', headers: { Cookie: cookieHeader } });
    if (catRes.statusCode !== 200) throw new Error('Failed to fetch categories: ' + catRes.body);
    const catJson = JSON.parse(catRes.body);
    const categoryId = catJson.items && catJson.items.length ? catJson.items[0].id : null;
    if (!categoryId) throw new Error('No category available for testing');
    console.log('Using categoryId:', categoryId);

    // Step: Create dish
    const sampleImg = 'https://via.placeholder.com/150';
    const createPayload = {
      name: `Test Dish ${Date.now()}`,
      slug: `test-dish-${Date.now()}`,
      description: 'Test dish for automated script',
      categoryId,
      imageUrl: sampleImg,
      isActive: true,
    };

    console.log('\n3) Creating a new dish');
    const createRes = await request(
      { hostname: 'localhost', port: 3000, path: '/api/admin/mon-an', method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: cookieHeader } },
      JSON.stringify(createPayload)
    );

    if (createRes.statusCode !== 200) {
      console.error('Create dish failed', createRes.statusCode, createRes.body);
      process.exit(1);
    }

    const createJson = JSON.parse(createRes.body);
    if (!createJson.success || !createJson.dish) {
      console.error('Create response invalid', createRes.body);
      process.exit(1);
    }

    const createdDish = createJson.dish;
    console.log('Created dish:', createdDish.id, createdDish.name);

    // 4) Fetch by id and verify
    console.log('\n4) Fetching created dish by id to verify');
    const getRes = await request({ hostname: 'localhost', port: 3000, path: `/api/admin/mon-an/${createdDish.id}`, method: 'GET', headers: { Cookie: cookieHeader } });
    if (getRes.statusCode !== 200) throw new Error('Failed to fetch dish by id: ' + getRes.body);
    const getJson = JSON.parse(getRes.body);
    if (!getJson.success || !getJson.data) throw new Error('Fetch dish response invalid');

    console.log('Dish details verified:', getJson.data.name, getJson.data.imageUrl);

    // 5) Test image loading
    const imgUrl = getJson.data.imageUrl;
    async function verifyImage(url) {
      if (!url) return false;
      if (url.startsWith('data:')) {
        console.log('Image is data URL, length:', url.length);
        return true;
      }
      // Basic HTTP HEAD to check status
      return new Promise((resolve) => {
        const isHttps = url.startsWith('https:');
        const lib = isHttps ? https : http;
        const req = lib.request(url, { method: 'GET' }, (res) => {
          const ok = res.statusCode && res.statusCode >= 200 && res.statusCode < 400 && (res.headers['content-type']||'').startsWith('image');
          console.log(`Image request status ${res.statusCode}, content-type: ${res.headers['content-type']}`);
          res.resume();
          resolve(!!ok);
        });
        req.on('error', (e) => { console.error('Image request failed', e.message); resolve(false); });
        req.end();
      });
    }

    const imageOk = await verifyImage(imgUrl);
    if (!imageOk) {
      console.error('Image URL invalid or not reachable:', imgUrl);
      // Continue test to allow cleanup
    } else {
      console.log('Image verified OK');
    }

    // 6) Update dish
    console.log('\n5) Updating the dish');
    const newName = createdDish.name + ' (Updated)';
    const newImg = 'https://via.placeholder.com/200';
    const updateRes = await request(
      { hostname: 'localhost', port: 3000, path: `/api/admin/mon-an/${createdDish.id}`, method: 'PUT', headers: { 'Content-Type': 'application/json', Cookie: cookieHeader } },
      JSON.stringify({ name: newName, imageUrl: newImg })
    );
    if (updateRes.statusCode !== 200) {
      console.error('Update failed:', updateRes.statusCode, updateRes.body);
      process.exit(1);
    }
    const updateJson = JSON.parse(updateRes.body);
    console.log('Update response:', updateJson);

    // Verify update
    const getRes2 = await request({ hostname: 'localhost', port: 3000, path: `/api/admin/mon-an/${createdDish.id}`, method: 'GET', headers: { Cookie: cookieHeader } });
    const getJson2 = JSON.parse(getRes2.body);
    if (getJson2.data.name !== newName) {
      console.error('Update verification failed. Expected name', newName, 'got', getJson2.data.name);
      process.exit(1);
    }
    console.log('Update verified OK. New name:', getJson2.data.name);

    // Verify new image
    const imageOk2 = await verifyImage(getJson2.data.imageUrl);
    if (!imageOk2) console.warn('Updated image not reachable or invalid:', getJson2.data.imageUrl);
    else console.log('Updated image OK');

    // 7) Delete dish
    console.log('\n6) Deleting the dish');
    const delRes = await request({ hostname: 'localhost', port: 3000, path: `/api/admin/mon-an/${createdDish.id}`, method: 'DELETE', headers: { Cookie: cookieHeader } });
    if (delRes.statusCode !== 200) {
      console.error('Delete failed:', delRes.statusCode, delRes.body);
      process.exit(1);
    }
    console.log('Delete response:', delRes.body);

    // 8) Verify deletion
    const getRes3 = await request({ hostname: 'localhost', port: 3000, path: `/api/admin/mon-an/${createdDish.id}`, method: 'GET', headers: { Cookie: cookieHeader } });
    if (getRes3.statusCode === 404) {
      console.log('Verified dish deletion: 404 Not Found');
    } else {
      console.error('Dish still exists after delete:', getRes3.statusCode, getRes3.body);
      process.exit(1);
    }

    console.log('\nAll CRUD tests passed');
    process.exit(0);
  } catch (err) {
    console.error('Test failed with error:', err);
    process.exit(1);
  }
})();
