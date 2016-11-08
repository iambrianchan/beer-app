 module.exports = {
     entry: './public/src/js/beer.js',
     output: {
         path: './public/bin',
         filename: 'app.bundle.js',
     },
     module: {
        loaders: [

            {
                test: /\.js$/, 
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.jsx$/, 
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
     }
 }