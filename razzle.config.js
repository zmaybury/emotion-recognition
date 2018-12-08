
module.exports = {
    modify: (config, { target, dev }, webpack) => {
      // do something to config

      config.plugins = Object.assign(config.plugins, {
        name: 'typescript',
        options: {
          useBabel: true,
          useEslint: true, // ignored if `useBabel` is false
          tsLoader: {
            transpileOnly: true,
            experimentalWatchApi: true,
          },
          forkTsChecker: {
            tsconfig: './tsconfig.json',
            tslint: './tslint.json',
            watch: './src',
            typeCheck: true,
          },
        },
      });
  
      config.node = {  
        child_process: 'empty',
        fs: 'empty',
        path: 'empty'
      };
      return config;
    },
  };