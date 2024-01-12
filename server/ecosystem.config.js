module.exports = {
  apps: [
    {
      name: 'server',
      script: './app.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
      env_cron_restart: '0 0 * * *',
    },
  ],
};
