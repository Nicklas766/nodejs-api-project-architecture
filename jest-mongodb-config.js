module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '5.0.3', // note: it caused issues when 4.0.3
      skipMD5: true,
    },
    instance: {},
    autoStart: false,
  },
};
