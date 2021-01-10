module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/i,
                loader: 'css-loader',
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};

new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
});