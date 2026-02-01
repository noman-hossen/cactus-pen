import { config } from 'dotenv';
config();

const testBackend = async () => {
  console.log('1. Checking environment...');
  console.log('HF_API_KEY exists:', !!process.env.HF_API_KEY);
  
  console.log('\n2. Testing backend endpoint...');
  try {
    const response = await fetch('https://cactus-pen.onrender.com/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Test',
        model: 'mistralai/Mistral-7B-Instruct-v0.3',
        max_tokens: 50
      })
    });
    
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
};

testBackend();