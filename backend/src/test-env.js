// test-env.js
console.log("Testing environment variables...");
console.log("PORT:", process.env.PORT);
console.log("HF_API_KEY present:", !!process.env.HF_API_KEY);
console.log("HF_API_KEY (first 4 chars):", process.env.HF_API_KEY?.substring(0, 4) + "...");