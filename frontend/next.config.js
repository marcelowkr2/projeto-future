module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8000/api/:path*', // URL do backend
        },
      ];
    },
  };

  module.exports = {
    reactStrictMode: true,
    webpackDevMiddleware: config => {
      config.watchOptions = {
        poll: 1000, // Verifica as mudanças a cada 1 segundo
        aggregateTimeout: 300, // Espera 300ms para o próximo evento
      };
      return config;
    },
  };
  