// Test registration endpoint
async function testRegistration() {
  try {
    const timestamp = Date.now();
    const email = `test+${timestamp}@example.com`;
    const response = await fetch('http://localhost:3000/api/dang-ky', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password: 'Test123456',
        confirmPassword: 'Test123456',
        name: 'Test User',
      }),
    });

    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('\n✓ Registration successful!');
    } else {
      console.log('\n✗ Registration failed:', data.error);
    }
  } catch (err) {
    console.error('✗ Request failed:', err.message);
  }
}

testRegistration();
