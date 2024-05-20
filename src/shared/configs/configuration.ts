export default () => ({
  mongoUri: process.env.MONGO_URL || 'mongodb://localhost/customerdb',
});
