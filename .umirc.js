export default {
  plugins: [
    ['umi-plugin-dva', { immer: true }],  
    ['umi-plugin-routes',
    {
      exclude: [
        /model\.(j|t)sx?$/,
        /service\.(j|t)sx?$/,
        /models\//,
        /components\//,
        /services\//,
        /chart\/Container\.js$/,
      ],
    },]
  ],
  hashHistory: true,
};