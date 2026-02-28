import app from './main';

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console -- startup info
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  // eslint-disable-next-line no-console -- startup info
  console.log(`📚 Swagger docs on http://localhost:${PORT}/docs`);
});
