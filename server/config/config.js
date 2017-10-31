if(process.env.NODE_ENV != 'production'){
  require('dotenv').config('../');
}

exports.DATABASE_URL = process.env.DATABASE_URL || ''
exports.DATABASE_HOST = process.env.DATABASE_HOST || 'localhost'
exports.DATABASE_NAME = process.env.DATABASE_NAME || 'postgres'
exports.PORT = process.env.PORT || 3000
exports.JWT_SECRET = process.env.JWT_SECRET || ''
exports.HOST = process.env.HOST || '0.0.0.0'