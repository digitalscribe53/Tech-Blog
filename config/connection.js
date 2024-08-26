const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

const databaseUrl = process.env.DATABASE_URL || process.env.DB_URL;

console.log('Attempting to connect to database...');
console.log('Database URL is set:', !!databaseUrl);
if (databaseUrl) {
  console.log('Database URL (first 10 characters):', databaseUrl.substring(0, 10) + '...');
}

if (databaseUrl) {
  try {
    console.log('Parsing Database URL...');
    sequelize = new Sequelize(databaseUrl, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: console.log
    });
    console.log('Sequelize instance created successfully');
  } catch (error) {
    console.error('Failed to create Sequelize instance:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    if (error.parent) {
      console.error('Parent error:', error.parent);
    }
    process.exit(1);
  }
} else {
  console.error('Database URL is not set. Attempting to use individual environment variables...');
  // Local development configuration using environment variables
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      port: process.env.DB_PORT,
      logging: console.log
    }
  );
}

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;