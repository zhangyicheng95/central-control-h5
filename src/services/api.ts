import { parseParamsToUrl } from "@/utils/utils";
import { fetchGet, fetchPost, fetchPut, fetchDelete, upload, BASE_IP } from '@/utils/fetch';
import * as _ from 'lodash-es';

//主页
// 重启服务器
export async function reStartServer(params: any) {
    return fetchPost(`/reStart`, { body: params });
};
// 设备
// 设备列表
export async function getDeviceList() {
    return fetchGet(`/list`);
};
// 设备全开
export async function postAllDevice(params: any) {
    return fetchPost(`/all`, { body: params });
};
// 单个设备开关
export async function postItemDevice(params: any) {
    return fetchPost(`/item`, { body: params });
};
// 灯光
// 灯光列表
export async function getLightingList() {
    return fetchGet(`/list`);
};
// 灯光全开
export async function postAllLighting(params: any) {
    return fetchPost(`/all`, { body: params });
};
// 单个灯光开关
export async function postItemLighting(params: any) {
    return fetchPost(`/item`, { body: params });
};
// 媒体
// 媒体列表
export async function getMediumList() {
    return fetchGet(`/list`);
};
// 媒体详情
export async function getMediumDetail(params: any) {
    // return fetchPost(`/item`, { body: params });
    return new Promise((resolve, reject) => {
        resolve({
            code: 200,
            data: {
                id: '123',
                name: '互动连接屏自定义设备1',
                list: [
                    {
                        id: '123',
                        name: '视频名称',
                        type: '1',
                        url: 'https://v.jgvogel.cn/40b7ac1e6695486ab1b5cdf0f18061c8/5fff45d59527495a90cec7c324b0b8c5-3764b8141e0befbc736d86eb4d1371b9-fd.mp4',
                    },
                    {
                        id: '124',
                        name: '视频名称',
                        type: '1',
                        url: 'https://v.jgvogel.cn/40b7ac1e6695486ab1b5cdf0f18061c8/5fff45d59527495a90cec7c324b0b8c5-3764b8141e0befbc736d86eb4d1371b9-fd.mp4',
                    },
                    {
                        id: '125',
                        name: '视频名称',
                        type: '1',
                        url: 'https://v.jgvogel.cn/40b7ac1e6695486ab1b5cdf0f18061c8/5fff45d59527495a90cec7c324b0b8c5-3764b8141e0befbc736d86eb4d1371b9-fd.mp4',
                    },
                    {
                        id: '126',
                        name: '视频名称',
                        type: '1',
                        url: 'https://v.jgvogel.cn/40b7ac1e6695486ab1b5cdf0f18061c8/5fff45d59527495a90cec7c324b0b8c5-3764b8141e0befbc736d86eb4d1371b9-fd.mp4',
                    },
                    {
                        id: '127',
                        name: '视频名称',
                        type: '1',
                        url: 'https://v.jgvogel.cn/40b7ac1e6695486ab1b5cdf0f18061c8/5fff45d59527495a90cec7c324b0b8c5-3764b8141e0befbc736d86eb4d1371b9-fd.mp4',
                    },
                    {
                        id: '128',
                        name: '视频名称',
                        type: '1',
                        url: 'https://v.jgvogel.cn/40b7ac1e6695486ab1b5cdf0f18061c8/5fff45d59527495a90cec7c324b0b8c5-3764b8141e0befbc736d86eb4d1371b9-fd.mp4',
                    },
                    {
                        id: '129',
                        name: '视频名称',
                        type: '1',
                        url: 'https://v.jgvogel.cn/40b7ac1e6695486ab1b5cdf0f18061c8/5fff45d59527495a90cec7c324b0b8c5-3764b8141e0befbc736d86eb4d1371b9-fd.mp4',
                    },
                    {
                        id: '120',
                        name: '视频名称',
                        type: '1',
                        url: 'https://v.jgvogel.cn/40b7ac1e6695486ab1b5cdf0f18061c8/5fff45d59527495a90cec7c324b0b8c5-3764b8141e0befbc736d86eb4d1371b9-fd.mp4',
                    },
                    {
                        id: '123',
                        name: '视频名称',
                        type: '1',
                        url: 'https://v.jgvogel.cn/40b7ac1e6695486ab1b5cdf0f18061c8/5fff45d59527495a90cec7c324b0b8c5-3764b8141e0befbc736d86eb4d1371b9-fd.mp4',
                    },
                    {
                        id: '124',
                        name: '视频名称',
                        type: '1',
                        url: 'https://v.jgvogel.cn/40b7ac1e6695486ab1b5cdf0f18061c8/5fff45d59527495a90cec7c324b0b8c5-3764b8141e0befbc736d86eb4d1371b9-fd.mp4',
                    },
                    {
                        id: '125',
                        name: '视频名称',
                        type: '1',
                        url: 'https://v.jgvogel.cn/40b7ac1e6695486ab1b5cdf0f18061c8/5fff45d59527495a90cec7c324b0b8c5-3764b8141e0befbc736d86eb4d1371b9-fd.mp4',
                    },
                    {
                        id: '126',
                        name: '视频名称',
                        type: '1',
                        url: 'https://v.jgvogel.cn/40b7ac1e6695486ab1b5cdf0f18061c8/5fff45d59527495a90cec7c324b0b8c5-3764b8141e0befbc736d86eb4d1371b9-fd.mp4',
                    },
                    {
                        id: '127',
                        name: '视频名称',
                        type: '1',
                        url: 'https://v.jgvogel.cn/40b7ac1e6695486ab1b5cdf0f18061c8/5fff45d59527495a90cec7c324b0b8c5-3764b8141e0befbc736d86eb4d1371b9-fd.mp4',
                    },
                    {
                        id: '128',
                        name: '视频名称',
                        type: '1',
                        url: 'https://v.jgvogel.cn/40b7ac1e6695486ab1b5cdf0f18061c8/5fff45d59527495a90cec7c324b0b8c5-3764b8141e0befbc736d86eb4d1371b9-fd.mp4',
                    },
                    {
                        id: '129',
                        name: '视频名称',
                        type: '1',
                        url: 'https://v.jgvogel.cn/40b7ac1e6695486ab1b5cdf0f18061c8/5fff45d59527495a90cec7c324b0b8c5-3764b8141e0befbc736d86eb4d1371b9-fd.mp4',
                    },
                    {
                        id: '120',
                        name: '视频名称',
                        type: '1',
                        url: 'https://v.jgvogel.cn/40b7ac1e6695486ab1b5cdf0f18061c8/5fff45d59527495a90cec7c324b0b8c5-3764b8141e0befbc736d86eb4d1371b9-fd.mp4',
                    }
                ]
            }
        });
    })
};