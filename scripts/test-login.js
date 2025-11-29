// Basic login success test
async function testLogin() {
  try {
    const email = `login-test-${Date.now()}@example.com`;
    const password = 'Test123456';

    // 1) Register a user first
    const regRes = await fetch('http://localhost:3000/api/dang-ky', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, confirmPassword: password, name: 'Login User' }),
    });
    const regData = await regRes.json().catch(() => ({}));
    if (!regRes.ok) {
      console.error('✗ Registration failed before login test:', regData);
      return;
    }

    // 2) Attempt login
    const res = await fetch('http://localhost:3000/api/dang-nhap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ identifier: email, password }),
    });

    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Response:', JSON.stringify(data, null, 2));

    if (res.ok) {
      console.log('\n✓ Login successful!');
    } else {
      console.log('\n✗ Login failed:', data.message);
    }
  } catch (err) {
    console.error('✗ Request failed:', err.message);
  }
}

testLogin();
