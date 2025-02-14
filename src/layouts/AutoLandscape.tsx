import React, { Fragment, useEffect } from 'react';

const AutoLandscape = (props: any) => {
    const { children } = props;
    useEffect(() => {
        const handleOrientationChange = () => {
            const isPortrait = window.matchMedia("(orientation: portrait)").matches;
            const htmlElement = document.documentElement;

            if (isPortrait) {
                // 竖屏时设置旋转样式
                htmlElement.style.transform = 'rotate(90deg)';
                htmlElement.style.transformOrigin = 'center';
                htmlElement.style.width = '100vh';
                htmlElement.style.height = '100vw';
                htmlElement.style.position = 'absolute';
                htmlElement.style.top = '50%';
                htmlElement.style.left = '50%';
                htmlElement.style.marginTop = '-50vw';
                htmlElement.style.marginLeft = '-50vh';
            } else {
                // 横屏时恢复默认样式
                htmlElement.style.transform = 'none';
                htmlElement.style.width = '100%';
                htmlElement.style.height = '100%';
                htmlElement.style.position = 'static';
                htmlElement.style.top = 'auto';
                htmlElement.style.left = 'auto';
                htmlElement.style.marginTop = '0';
                htmlElement.style.marginLeft = '0';
            }
        };

        // 初始检查
        handleOrientationChange();

        // 监听设备方向变化
        const mediaQuery = window.matchMedia("(orientation: portrait)");
        mediaQuery.addEventListener('change', handleOrientationChange);

        // 组件卸载时移除监听
        return () => {
            mediaQuery.removeEventListener('change', handleOrientationChange);
        };
    }, []);

    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

export default AutoLandscape;