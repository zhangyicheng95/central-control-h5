import { parseParamsToUrl } from "@/utils/utils";
import { fetchGet, fetchPost, fetchPut, fetchDelete, upload, BASE_IP } from '@/utils/fetch';
import * as _ from 'lodash-es';

const V1 = '/api';
// 获取静态资源列表
export async function getFilesListService() {
    return fetchGet(`${V1}/files`);
};
// 获取视频列表
export async function getVideoListService(params: any) {
    return fetchGet(`${V1}/buttons?${parseParamsToUrl(params)}`);
};
// 添加视频
export async function postAddVideoService(params: any) {
    return fetchPost(`${V1}/buttons`, { body: params });
};
// 播放单个视频
export async function getVideoPlayService(params: any) {
    return fetchPost(`${V1}/command?${parseParamsToUrl(params)}`);
};
// 删除视频
export async function deleteVideoService(id: string) {
    return fetchDelete(`${V1}/buttons/${id}`);
};
// 修改视频
export async function putEditVideoService(id: string, params: any) {
    return fetchPut(`${V1}/buttons/${id}`, { body: params });
};
// 控制视频
export async function controlVideoService(action: string) {
    return fetchPost(`${V1}/video/control/${action}`);
};
// 返回桌面
export async function getDesktopService() {
    return fetchPost(`${V1}/video/return_to_desktop`);
};
// 获取按钮类型列表
export async function getTypeListService() {
    return fetchGet(`${V1}/button-groups`);
};
// 增加按钮类型
export async function postAddTypeService(params: any) {
    return fetchPost(`${V1}/button-groups`, { body: params });
};
// 删除按钮类型
export async function deleteTypeService(id: string) {
    return fetchDelete(`${V1}/button-groups/${id}`);
};
// 修改按钮类型
export async function putEditTypeService(id: string, params: any) {
    return fetchPut(`${V1}/button-groups/${id}`, { body: params });
};