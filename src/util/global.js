(function() {
    const originComponent = Component;
    // let isShareIndexPage = false; // 是否是分享首页进来

    Component = function Component(vueOptions) {
        const page = vueOptions.methods,
            originLoad = page?.onLoad;

        if (originLoad) {
            // 如果是通过二维码或分享进入，则需要格式化通用数据
            page.onLoad = async function() {
                const params = arguments;
                if (params && params.length > 0) {
                    try {
                        // 全局处理部分

                        originLoad && originLoad.apply(this, params);
                    } catch {
                        originLoad && originLoad.apply(this, params);
                    }
                }

            };
        }

        originComponent(vueOptions);
    };
}());
