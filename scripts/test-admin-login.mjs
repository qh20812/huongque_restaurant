// ESM test to verify admin login and access to /admin
// Run with: node scripts/test-admin-login.mjs

async function main() {
  // 1) Login
  const loginRes = await fetch('http://localhost:3000/api/dang-nhap', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: 'admin@huongque.vn', password: 'Admin123' }),
    redirect: 'manual',
  });

  if (loginRes.status !== 200) {
    const text = await loginRes.text();
    console.error('Login failed:', loginRes.status, text);
    process.exit(1);
  }

  const setCookie = loginRes.headers.get('set-cookie');
  if (!setCookie || !setCookie.includes('hq_token=')) {
    console.error('No hq_token cookie returned');
    process.exit(1);
  }

  console.log('Login OK, cookie received');
  
  // Extract just the token value from set-cookie header
  const tokenMatch = setCookie.match(/hq_token=([^;]+)/);
  if (!tokenMatch) {
    console.error('Could not extract token from cookie');
    process.exit(1);
  }
  const token = tokenMatch[1];
  console.log('Token extracted:', token.substring(0, 20) + '...');

  // 2) Access /admin with cookie (use simple cookie format)
  const adminRes = await fetch('http://localhost:3000/admin', {
    headers: { Cookie: `hq_token=${token}` },
    redirect: 'manual',
  });

  if (adminRes.status === 200) {
    console.log('Access /admin OK');
    console.log('TEST PASS');
    process.exit(0);
  } else if (adminRes.status >= 300 && adminRes.status < 400) {
    console.error('Unexpected redirect when accessing /admin:', adminRes.status, adminRes.headers.get('location'));
    process.exit(1);
  } else {
    console.error('Access /admin failed:', adminRes.status);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Test encountered error:', err);
  process.exit(1);
});
