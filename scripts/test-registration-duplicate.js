// Test registration with duplicate email
async function testDuplicateRegistration() {
  try {
    const email = `duplicate-test@example.com`;
    
    console.log('=== Test 1: First registration ===');
    const response1 = await fetch('http://localhost:3000/api/dang-ky', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password: 'Test123456',
        confirmPassword: 'Test123456',
        name: 'First User',
      }),
    });

    const data1 = await response1.json();
    console.log('Status:', response1.status);
    console.log('Response:', JSON.stringify(data1, null, 2));
    
    if (response1.ok) {
      console.log('✓ First registration successful!\n');
    } else {
      console.log('✗ First registration failed (might already exist)\n');
    }

    console.log('=== Test 2: Duplicate registration (should fail) ===');
    const response2 = await fetch('http://localhost:3000/api/dang-ky', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password: 'Test123456',
        confirmPassword: 'Test123456',
        name: 'Second User',
      }),
    });

    const data2 = await response2.json();
    console.log('Status:', response2.status);
    console.log('Response:', JSON.stringify(data2, null, 2));
    
    if (response2.status === 409) {
      console.log('\n✓ Duplicate email correctly rejected!');
    } else if (!response2.ok) {
      console.log('\n✗ Registration failed but with wrong status code');
    } else {
      console.log('\n✗ Duplicate email was incorrectly accepted!');
    }
  } catch (err) {
    console.error('✗ Request failed:', err.message);
  }
}

testDuplicateRegistration();
