// Health endpoint that works for both GET and HEAD
app.get('/health', (c: any) => {
  // For HEAD requests, return empty body
  if (c.req.method === 'HEAD') {
    return c.body(null, 200);
  }
  // For GET requests, return minimal response
  return c.json({ status: 'ok' }, 200);
});

// Also explicitly handle HEAD method
app.all('/health', (c: any) => {
  if (c.req.method === 'HEAD') {
    return c.body(null, 200);
  }
  return c.json({ status: 'ok' }, 200);
});