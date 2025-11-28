// Test registration validation
async function testValidation() {
  const tests = [
    {
      name: 'Invalid email format',
      data: {
        email: 'invalid-email',
        password: 'Test123456',
        confirmPassword: 'Test123456',
        name: 'Test User',
      },
      expectedStatus: 400,
    },
    {
      name: 'Password too short',
      data: {
        email: 'test-short@example.com',
        password: '12345',
        confirmPassword: '12345',
        name: 'Test User',
      },
      expectedStatus: 400,
    },
    {
      name: 'Passwords do not match',
      data: {
        email: 'test-mismatch@example.com',
        password: 'Test123456',
        confirmPassword: 'Test123457',
        name: 'Test User',
      },
      expectedStatus: 400,
    },
    {
      name: 'Valid registration',
      data: {
        email: `test-valid-${Date.now()}@example.com`,
        password: 'Test123456',
        confirmPassword: 'Test123456',
        name: 'Test User',
      },
      expectedStatus: 201,
    },
  ];

  console.log('Running validation tests...\n');
  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      console.log(`=== ${test.name} ===`);
      const response = await fetch('http://localhost:3000/api/dang-ky', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(test.data),
      });

      const data = await response.json();
      console.log('Status:', response.status);
      console.log('Response:', JSON.stringify(data, null, 2));

      if (response.status === test.expectedStatus) {
        console.log(`✓ Test passed!\n`);
        passed++;
      } else {
        console.log(`✗ Test failed! Expected status ${test.expectedStatus}, got ${response.status}\n`);
        failed++;
      }
    } catch (err) {
      console.error(`✗ Test failed with error: ${err.message}\n`);
      failed++;
    }
  }

  console.log('='.repeat(50));
  console.log(`Summary: ${passed} passed, ${failed} failed`);
  console.log('='.repeat(50));
}

testValidation();
