// Comprehensive login test suite
async function runLoginTests() {
  console.log('Running login tests...');
  const results = { passed: 0, failed: 0 };

  // Utility to register a user
  async function registerUser(email, password, name = 'User') {
    const res = await fetch('http://localhost:3000/api/dang-ky', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, confirmPassword: password, name }),
    });
    const data = await res.json().catch(() => ({}));
    return { res, data };
  }

  const tests = [
    {
      name: 'Valid login with email',
      run: async () => {
        const email = `login-ok-${Date.now()}@example.com`;
        const password = 'Test123456';
        await registerUser(email, password, 'Login OK');
        const res = await fetch('http://localhost:3000/api/dang-nhap', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
          body: JSON.stringify({ identifier: email, password })
        });
        const data = await res.json();
        return { ok: res.status === 200 && data?.message?.includes('Đăng nhập thành công'), res, data };
      }
    },
    {
      name: 'Invalid email (not existing)',
      run: async () => {
        const res = await fetch('http://localhost:3000/api/dang-nhap', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
          body: JSON.stringify({ identifier: 'not-exists@example.com', password: 'Test123456' })
        });
        const data = await res.json();
        return { ok: res.status === 401, res, data };
      }
    },
    {
      name: 'Wrong password',
      run: async () => {
        const email = `login-wrong-${Date.now()}@example.com`;
        await registerUser(email, 'Correct123', 'Wrong PW');
        const res = await fetch('http://localhost:3000/api/dang-nhap', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
          body: JSON.stringify({ identifier: email, password: 'Incorrect123' })
        });
        const data = await res.json();
        return { ok: res.status === 401, res, data };
      }
    },
    {
      name: 'Missing identifier',
      run: async () => {
        const res = await fetch('http://localhost:3000/api/dang-nhap', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
          body: JSON.stringify({ password: 'Test123456' })
        });
        const data = await res.json();
        return { ok: res.status === 400, res, data };
      }
    },
    {
      name: 'Missing password',
      run: async () => {
        const res = await fetch('http://localhost:3000/api/dang-nhap', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
          body: JSON.stringify({ identifier: 'abc@example.com' })
        });
        const data = await res.json();
        return { ok: res.status === 400, res, data };
      }
    },
    {
      name: 'Cookie set on success',
      run: async () => {
        const email = `login-cookie-${Date.now()}@example.com`;
        const password = 'Test123456';
        await registerUser(email, password, 'Cookie');
        const res = await fetch('http://localhost:3000/api/dang-nhap', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
          body: JSON.stringify({ identifier: email, password })
        });
        const data = await res.json();
        const setCookie = res.headers.get('set-cookie') || res.headers.get('Set-Cookie');
        const ok = res.status === 200 && setCookie && setCookie.includes('hq_token');
        return { ok, res, data };
      }
    },
  ];

  for (const t of tests) {
    try {
      const { ok, res, data } = await t.run();
      console.log(`\n=== ${t.name} ===`);
      console.log('Status:', res.status);
      console.log('Response:', JSON.stringify(data, null, 2));
      if (ok) { console.log('✓ Test passed'); results.passed++; }
      else { console.log('✗ Test failed'); results.failed++; }
    } catch (err) {
      console.log(`\n=== ${t.name} ===`);
      console.log('✗ Test error:', err.message);
      results.failed++;
    }
  }

  console.log('\nSummary:', results.passed, 'passed,', results.failed, 'failed');
  process.exit(results.failed === 0 ? 0 : 1);
}

runLoginTests();
