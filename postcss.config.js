module.exports = ({files, options, env}) => ({
    plugins: {
        "postcss-import": {},
        "postcss-cssnext": {
            features: {
                autoprefixer: true
            }
        }, //Gives a warning about autoprefixer. Cssnano comes with a autoprefixer but isn't used with preset: default
        "postcss-reporter": {}
    }
});
