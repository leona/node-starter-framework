module.exports = {
    site: {
        title: 'Starter framework',
        page_title: 'Starter framework',
        sub_dir: '/'
    },
    env: 'dev',
    error_msg: {
        404: 'Sorry, but that page doesn\'t exist.'
    },
    max_age: 2592000000,
    asset_host: 'static.example.com:80',
    asset_exts: ['.jpg', '.png', '.gif', '.css', '.js'],
    asset_dirs: {
        scss: {
            dir: __public + 'css',
            build_dir: __public + 'css/build'
        },
        js: {
            dir: __public + 'js',
            build_dir: __public + 'js/build'
        }
    }
}