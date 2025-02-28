import { history } from '@umijs/max';
import {
  ActionSheet,
  Button,
  Grid,
  Input,
  Popover,
  PullToRefresh,
  Space,
  Swiper,
  Switch,
  Toast,
} from 'antd-mobile';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './index.less';
import btn2 from '@/assets/images/button/red-btn3.png';
import { Form, Modal, Select } from 'antd';
import { deleteVideoService, getFilesListService, getVideoInfoService, getVideoListService, getVideoPlayService, postAddVideoService } from '@/services/api';
import { guid } from '@/utils/utils';
import AutoLandscape from '@/layouts/AutoLandscape';

export default function IndexPage() {
  const timerRef = useRef<any>(null);
  const [form] = Form.useForm();
  const [filesList, setFilesList] = useState<any[]>([]);
  const [addVideo, setAddVideo] = useState(false);
  const [videoList, setVideoList] = useState<any[]>([]);
  const [actionVisible, setActionVisible] = useState<any>({});
  const [editVisible, setEditVisible] = useState(false);

  // 获取静态资源列表
  const getFilesList = () => {
    getFilesListService().then((res: any) => {
      if (res?.code == 'SUCCESS') {
        setFilesList(res?.data?.files || []);
      } else {
        Toast.show({
          content: res?.message || '获取静态资源列表失败',
          icon: 'fail',
        });
      }
    });
  };
  // 初始化获取已添加的资源列表
  const getVideoList = () => {
    getVideoListService().then((res: any) => {
      if (res?.code == 'SUCCESS') {
        setVideoList(res?.data || []);
      } else {
        Toast.show({
          content: res?.message || '获取资源列表失败',
          icon: 'fail',
        });
      }
    });
  };
  useEffect(() => {
    getFilesList();
    getVideoList();
  }, []);
  // 关闭添加窗口
  const onAddVideoCancel = () => {
    setAddVideo(false);
    form.resetFields();
  };
  // 添加资源
  const OnAddVideo = () => {
    form.validateFields().then((values) => {
      postAddVideoService({
        ...values,
        "group_id": 0
      }).then((res: any) => {
        if (res?.code == 'SUCCESS') {
          getVideoList();
          onAddVideoCancel();
        } else {
          Toast.show({
            content: res?.message || '添加失败',
            icon: 'fail',
          });
        };
      });
    });
  };
  // 播放资源
  const onPlayVideo = (item?: any) => {
    if (!item) {
      item = actionVisible;
    };
    if (item?.file_name?.indexOf('.mp4') > -1) {
      history.push(`/home/video?id=${item?.id}`);
    } else {
      getVideoPlayService({ button_id: item?.id, fullscreen: true }).then((res: any) => {
        if (res?.code === 'SUCCESS') {
          Toast.show({
            content: '播放成功',
            icon: 'SUCCESS',
          });
          setActionVisible({});
        } else {
          Toast.show({
            content: res?.message || '播放失败',
            icon: 'fail',
          });
        }
      });
    };
  };
  // 删除资源
  const onDeleteVideo = (id: string) => {
    deleteVideoService(id).then((res: any) => {
      if (res?.code === 'SUCCESS') {
        getVideoList();
        setActionVisible({});
      } else {
        Toast.show({
          content: res?.message || '删除失败',
          icon: 'fail',
        });
      }
    });
  };
  const actions: any[] = [
    {
      text: '编辑', key: 'edit', onClick: () => {
        setAddVideo(true);
        form.setFieldsValue(actionVisible);
        setActionVisible({});
      }
    },
    {
      text: '删除',
      key: 'delete',
      // description: '删除后数据不可恢复',
      danger: true,
      // bold: true,
      onClick: () => onDeleteVideo(actionVisible?.id),
    },
  ];

  return (
    <AutoLandscape>
      <div className={`flex-box-column ${styles.homeWarp}`}>
        <PullToRefresh
          onRefresh={async () => {
            getFilesList();
            getVideoList();
          }}
        >
          <div className="flex-box-justify-between home-top">
            <div className="home-top-btn" onClick={() => {
              setEditVisible(!editVisible);
            }}>
              <div className="home-top-btn-text">
                {editVisible ? '取消' : '管理按钮'}
              </div>
            </div>
            <div className="home-top-btn" onClick={() => {
              setAddVideo(true);
            }}>
              <div className="home-top-btn-text">
                添加资源
              </div>
            </div>
          </div>
          <div className="flex-box home-content">
            {
              (videoList || [])?.map((item: any, index: number) => {
                const { id = guid(), url, name } = item;
                return <div
                  className="home-content-item"
                  key={`home-content-item-${index}`}
                  onClick={(e: any) => {
                    if (editVisible) {
                      setActionVisible(item);
                    } else {
                      onPlayVideo(item);
                    }
                  }}
                >
                  <div className="home-content-item-text">
                    {name || `资源 ${index + 1}`}
                  </div>
                </div>
              })
            }
          </div>
        </PullToRefresh>
        <ActionSheet
          visible={!!actionVisible?.id}
          actions={actions}
          onClose={() => setActionVisible({})}
        />
        {
          addVideo ?
            <Modal
              width="90%"
              height="90%"
              wrapClassName="video-add-modal-content"
              centered
              open={addVideo}
              maskClosable={false}
              getContainer={false}
              destroyOnClose={true}
              closable={false}
              footer={null}
              onCancel={() => onAddVideoCancel()}
            >
              <div className="flex-box-column video-add-modal">
                <div className="video-add-modal-title">
                  <div className="flex-box-center video-add-modal-title-text">
                    添加资源
                  </div>
                </div>
                <div className="flex-box-center video-add-modal-content">
                  <Form
                    form={form}
                    layout={'vertical'}
                    scrollToFirstError
                  >
                    <Form.Item
                      name='name'
                      label='按钮名称'
                      rules={[{ required: true, message: '名称不能为空' }]}
                    >
                      <Input placeholder='请输入按钮名称' autoComplete="off" />
                    </Form.Item>
                    <Form.Item
                      name='file_name'
                      label='资源链接'
                      rules={[{ required: true, message: '链接不能为空' }]}
                    >
                      <Select
                        placeholder='请选择资源'
                        options={filesList?.map((item: any) => ({
                          value: item,
                          label: item,
                        }))}
                        getPopupContainer={(triggerNode: any) => {
                          return triggerNode?.parentNode || document.body;
                        }}
                      />
                    </Form.Item>
                  </Form>
                </div>
                <div className="flex-box-center video-add-modal-footer">
                  <div
                    className="flex-box-center video-add-modal-footer-btn1"
                    onClick={() => onAddVideoCancel()}
                  >
                    <div className="video-add-modal-footer-btn-text">
                      取消
                    </div>
                  </div>
                  <div
                    className="flex-box-center video-add-modal-footer-btn"
                    onClick={() => {
                      OnAddVideo();
                    }}
                  >
                    <div className="video-add-modal-footer-btn-text">
                      提交
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
            : null
        }
      </div >
    </AutoLandscape>
  );
}
