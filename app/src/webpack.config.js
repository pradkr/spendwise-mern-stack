module.exports = {
    resolve: {
        fallback: { 
            "path": require.resolve("path-browserify"),
            "url":  require.resolve("url/"),
            "zlib": require.resolve("browserify-zlib"),
            "util": require.resolve("util/"),
            "stream": require.resolve("stream-browserify"),
            "querystring": require.resolve("querystring-es3"),
            "http": require.resolve("stream-http")
     }
    }
}