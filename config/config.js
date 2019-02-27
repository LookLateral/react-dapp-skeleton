const config = {
    stripe_test_secret_key: process.env.STRIPE_PW || "pk_test_yPaUf3r449i7Kg6HMUr71bLm",
    stripe_test_api_key: process.env.STRIPE_API_KEY || "pk_test_yPaUf3r449i7Kg6HMUr71bLm",
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "UparkH77@1209#v9z3rp74vk",
    mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || 'mongodb://mern:v9z3rp74vk@ds235243.mlab.com:35243/mern'
  }
  
  export default config
