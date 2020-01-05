const Env = use('Env')


const isDevelopment = function() {
  return Env.get('NODE_ENV', 'development') === 'development';
}

const isProduction = function() {
  return Env.get('NODE_ENV', 'development') === 'production';
}

module.exports = {
  isDevelopment, isProduction
}
