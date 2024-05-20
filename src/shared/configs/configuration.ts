export default () => ({
  MONGO_URL: process.env.MONGO_URI || 'mongodb://localhost/customerdb',
});
