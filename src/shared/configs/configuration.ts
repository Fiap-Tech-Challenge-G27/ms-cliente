export default () => ({
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost/customerdb',
});
