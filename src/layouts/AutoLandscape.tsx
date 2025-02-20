import React, { Fragment, useEffect } from 'react';

const AutoLandscape = (props: any) => {
    const { children } = props;
    useEffect(() => {
        const handleOrientationChange = () => {
            const isPortrait = window.matchMedia("(orientation: portrait)").matches;
            const htmlElement = document.documentElement;

            // 检查浏览器是否支持全屏 API
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {  // 针对 Firefox
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {  // 针对 Chrome、Safari 和 Opera
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {  // 针对 IE/Edge
                document.documentElement.msRequestFullscreen();
            }

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

        // 请求全屏
        document.documentElement?.requestFullscreen?.()?.then?.(() => {
            // Use type assertion since lock() is available but TypeScript doesn't recognize it
            (screen?.orientation as any)?.lock?.('landscape')?.catch?.(() => {
                // Silently handle errors if orientation lock fails
                console.warn('Failed to lock screen orientation');
            });
        }).catch(() => {
            // Handle if fullscreen request fails
            console.warn('Failed to enter fullscreen mode');
        });

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