import { parseParamsToUrl } from "@/utils/utils";
import { fetchGet, fetchPost, fetchPut, fetchDelete, upload, BASE_IP } from '@/utils/fetch';
import * as _ from 'lodash-es';

// 添加视频
export async function postAddVideoService(params: any) {
    return fetchPost(`/item`, { body: params });
};

// 获取视频列表
export async function getVideoListService() {
    return fetchGet(`/item`);
};

// 播放单个视频
export async function getVideoPlayService(params: any) {
    return fetchPost(`/item/play`, { body: params });
};

// 删除视频
export async function deleteVideoService(params: any) {
    return fetchPost(`/item/delete`, { body: params });
};
