/* 
 * 2022/4/28 20:18
 * author: xxx
 * @description:
 */
const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#ace' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
 
