if(process.env.NODE_ENV != 'production'){
  require('dotenv').config('../');
}

exports.DATABASE_URL = process.env.DATABASE_URL || ''
exports.PORT = process.env.PORT || 3000
exports.JWT_SECRET = process.env.JWT_SECRET || ''
exports.HOST = process.env.HOST || '0.0.0.0'