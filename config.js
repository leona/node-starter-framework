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
    asset_dirs: {
        css: {
            dir: __public + 'css',
            build_dir: __public + 'css/build'
        },
        js: {
            dir: __public + 'js',
            build_dir: __public + 'js/build'
        }
    }
}