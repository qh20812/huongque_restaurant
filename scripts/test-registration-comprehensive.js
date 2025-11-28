// Comprehensive registration test suite
async function runAllTests() {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║   COMPREHENSIVE REGISTRATION FUNCTIONALITY TEST SUITE    ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  const results = {
    passed: 0,
    failed: 0,
    tests: []
  };

  const tests = [
    {
      name: '1. Valid registration with all fields',
      data: {
        email: `test-full-${Date.now()}@example.com`,
        password: 'Test123456',
        confirmPassword: 'Test123456',
        name: 'John Doe',
      },
      expectedStatus: 201,
      validate: (response, data) => {
        return data.user && 
               data.user.email && 
               data.user.name === 'John Doe' &&
               data.message === 'Đăng ký thành công';
      }
    },
    {
      name: '2. Valid registration without name',
      data: {
        email: `test-no-name-${Date.now()}@example.com`,
        password: 'Test123456',
        confirmPassword: 'Test123456',
      },
      expectedStatus: 201,
      validate: (response, data) => {
        return data.user && data.user.email;
      }
    },
    {
      name: '3. Invalid email format',
      data: {
        email: 'not-an-email',
        password: 'Test123456',
        confirmPassword: 'Test123456',
        name: 'Test User',
      },
      expectedStatus: 400,
      validate: (response, data) => {
        return data.message.includes('Email');
      }
    },
    {
      name: '4. Password too short (< 6 characters)',
      data: {
        email: `test-${Date.now()}@example.com`,
        password: '12345',
        confirmPassword: '12345',
        name: 'Test User',
      },
      expectedStatus: 400,
      validate: (response, data) => {
        return data.message.includes('Mật khẩu');
      }
    },
    {
      name: '5. Passwords do not match',
      data: {
        email: `test-${Date.now()}@example.com`,
        password: 'Test123456',
        confirmPassword: 'Different123',
        name: 'Test User',
      },
      expectedStatus: 400,
      validate: (response, data) => {
        return data.message.includes('không khớp');
      }
    },
    {
      name: '6. Duplicate email (register same email twice)',
      setup: async () => {
        const email = `duplicate-${Date.now()}@example.com`;
        // First registration
        await fetch('http://localhost:3000/api/dang-ky', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password: 'Test123456',
            confirmPassword: 'Test123456',
            name: 'First User',
          }),
        });
        return email;
      },
      data: async (setupResult) => ({
        email: setupResult,
        password: 'Test123456',
        confirmPassword: 'Test123456',
        name: 'Second User',
      }),
      expectedStatus: 409,
      validate: (response, data) => {
        return data.message.includes('đã được sử dụng');
      }
    },
  ];

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    try {
      console.log(`\n${'─'.repeat(60)}`);
      console.log(`TEST ${test.name}`);
      console.log('─'.repeat(60));

      let testData = test.data;
      
      // Run setup if exists
      if (test.setup) {
        const setupResult = await test.setup();
        if (typeof test.data === 'function') {
          testData = await test.data(setupResult);
        }
      }

      const response = await fetch('http://localhost:3000/api/dang-ky', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const data = await response.json();
      
      console.log(`Status: ${response.status} (Expected: ${test.expectedStatus})`);
      console.log(`Response: ${JSON.stringify(data, null, 2)}`);

      const statusMatch = response.status === test.expectedStatus;
      const validationPass = test.validate ? test.validate(response, data) : true;

      if (statusMatch && validationPass) {
        console.log('\n✅ TEST PASSED');
        results.passed++;
        results.tests.push({ name: test.name, status: 'PASSED' });
      } else {
        console.log('\n❌ TEST FAILED');
        if (!statusMatch) console.log(`   - Status mismatch`);
        if (!validationPass) console.log(`   - Validation failed`);
        results.failed++;
        results.tests.push({ name: test.name, status: 'FAILED' });
      }
    } catch (err) {
      console.log(`\n❌ TEST FAILED WITH ERROR: ${err.message}`);
      results.failed++;
      results.tests.push({ name: test.name, status: 'ERROR', error: err.message });
    }
  }

  // Print summary
  console.log('\n\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║                      TEST SUMMARY                         ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log(`\nTotal Tests: ${results.passed + results.failed}`);
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`\nSuccess Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);
  
  console.log('\n\nDetailed Results:');
  results.tests.forEach((test, index) => {
    const icon = test.status === 'PASSED' ? '✅' : '❌';
    console.log(`  ${icon} ${test.name}`);
  });

  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  if (results.failed === 0) {
    console.log('║          ✅ ALL TESTS PASSED SUCCESSFULLY! ✅            ║');
    console.log('║     Registration functionality is working properly!      ║');
  } else {
    console.log('║          ❌ SOME TESTS FAILED ❌                         ║');
    console.log('║     Please review the failed tests above               ║');
  }
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  process.exit(results.failed === 0 ? 0 : 1);
}

runAllTests();
