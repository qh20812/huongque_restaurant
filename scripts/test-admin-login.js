// Simple Node test to verify admin login and access to /admin
// Run with: node scripts/test-admin-login.js

const http = require('http');

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, body: data });
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

(async () => {
  try {
    // 1) Login
    const loginRes = await request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/api/dang-nhap',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      JSON.stringify({ identifier: 'admin@huongque.vn', password: 'Admin123' })
    );

    if (loginRes.statusCode !== 200) {
      console.error('Login failed:', loginRes.statusCode, loginRes.body);
      process.exit(1);
    }

    const setCookie = loginRes.headers['set-cookie'];
    const cookieHeader = Array.isArray(setCookie) ? setCookie.join('; ') : setCookie;
    if (!cookieHeader || !cookieHeader.includes('hq_token=')) {
      console.error('No hq_token cookie returned');
      process.exit(1);
    }

    console.log('Login OK, cookie received');

    // 2) Access /admin with cookie (middleware should allow)
    const adminRes = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/admin',
      method: 'GET',
      headers: {
        Cookie: cookieHeader,
      },
    });

    if (adminRes.statusCode === 200) {
      console.log('Access /admin OK');
      console.log('TEST PASS');
      process.exit(0);
    } else if (adminRes.statusCode >= 300 && adminRes.statusCode < 400) {
      console.error('Unexpected redirect when accessing /admin:', adminRes.statusCode, adminRes.headers.location);
      process.exit(1);
    } else {
      console.error('Access /admin failed:', adminRes.statusCode);
      process.exit(1);
    }
  } catch (err) {
    console.error('Test encountered error:', err);
    process.exit(1);
  }
})();
