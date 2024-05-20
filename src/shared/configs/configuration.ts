export default () => ({
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost/customerdb',
});
