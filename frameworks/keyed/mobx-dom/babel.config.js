const { join } = require('path');
module.exports = api => {
  const env = api.env();
  const esm = env === 'esm';

  return {
    plugins: [
      '@babel/plugin-syntax-jsx',
      join(__dirname, 'plugin.js'),
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { "loose" : true }],
      '@babel/plugin-transform-strict-mode'
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          modules: esm ? false : undefined,
          targets: { esmodules: esm },
        },
      ],
      [
        '@babel/preset-typescript',
        {
          jsxPragma: 'mbx',
        },
      ],
    ],
  };
};
