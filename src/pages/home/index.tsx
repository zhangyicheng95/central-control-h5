import { history } from '@umijs/max';
import {
  ActionSheet,
  Input,
  Mask,
  PullToRefresh,
  Toast,
} from 'antd-mobile';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.less';
import { Form, Modal, Select } from 'antd';
import { deleteVideoService, getDesktopService, getFilesListService, getTypeListService, getVideoListService, getVideoPlayService, postAddVideoService, putEditVideoService } from '@/services/api';
import { guid } from '@/utils/utils';
import AutoLandscape from '@/layouts/AutoLandscape';

export default function IndexPage() {
  const timerRef = useRef<any>(null);
  const [form] = Form.useForm();
  // 下拉选择静态资源列表
  const [filesList, setFilesList] = useState<any[]>([]);
  // 添加资源
  const [addVideo, setAddVideo] = useState(false);
  // 资源列表
  const [videoList, setVideoList] = useState<any[]>([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
  // 编辑资源
  const [editVisible, setEditVisible] = useState(false);
  // 操作资源
  const [actionVisible, setActionVisible] = useState(false);
  // 操作按钮
  const [actionVisible2, setActionVisible2] = useState(false);
  // 编辑资源
  const [editItem, setEditItem] = useState<any>({});
  // 切换按钮类型
  const [actionVisible3, setActionVisible3] = useState(false);
  // 按钮类型列表
  const [typeList, setTypeList] = useState<any[]>([]);
  // 当前按钮类型
  const [currentType, setCurrentType] = useState(0);

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
    getVideoListService({ group_id: currentType }).then((res: any) => {
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
  // 获取按钮类型列表
  const getTypeList = () => {
    getTypeListService().then((res: any) => {
      if (res?.code == 'SUCCESS') {
        setTypeList(res?.data || []);
      } else {
        Toast.show({
          content: res?.message || '获取按钮类型列表失败',
          icon: 'fail',
        });
      }
    });
  };
  useEffect(() => {
    getFilesList();
    getVideoList();
    getTypeList();
  }, []);
  // 关闭添加窗口
  const onAddVideoCancel = () => {
    setAddVideo(false);
    form.resetFields();
    setEditItem({});
  };
  // 添加资源
  const OnAddVideo = () => {
    form.validateFields().then((values) => {
      postAddVideoService({
        "group_id": 0,
        ...values,
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
  // 修改资源
  const onEditVideo = () => {
    form.validateFields().then((values) => {
      putEditVideoService(editItem?.id, {
        "group_id": 0,
        ...editItem,
        ...values,
      }).then((res: any) => {
        if (res?.code === 'SUCCESS') {
          getVideoList();
          onAddVideoCancel();
        } else {
          Toast.show({
            content: res?.message || '修改失败',
            icon: 'fail',
          });
        }
      });
    });
  };
  // 播放资源
  const onPlayVideo = (item: any) => {
    if (item?.file_name?.indexOf('.mp4') > -1) {
      history.push(`/home/video?id=${item?.id}&name=${item?.file_name}`);
    } else {
      getVideoPlayService({ button_id: item?.id, fullscreen: true }).then((res: any) => {
        if (res?.code === 'SUCCESS') {
          Toast.show({
            content: '播放成功',
            icon: 'SUCCESS',
          });
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
        onAddVideoCancel();
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
        form.setFieldsValue(editItem);
        setActionVisible(false);
      }
    },
    {
      text: '删除',
      key: 'delete',
      // description: '删除后数据不可恢复',
      danger: true,
      // bold: true,
      onClick: () => onDeleteVideo(editItem?.id),
    },
  ];
  const actions2: any[] = [
    {
      text: '管理按钮', key: 'edit', onClick: () => {
        setEditVisible(true);
        setActionVisible2(false);
      }
    },
    {
      text: '添加按钮',
      key: 'add',
      onClick: () => {
        setAddVideo(true);
        setActionVisible2(false);
      },
    },
  ];
  const actions3: any[] = useMemo(() => {
    return typeList?.map((item: any) => {
      return {
        text: item?.name,
        key: item?.id,
        onClick: () => {
          setCurrentType(item?.id);
          setActionVisible3(false);
        }
      };
    });
  }, [typeList]);
  useEffect(() => {
    getVideoList();
  }, [currentType]);

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
              getDesktopService();
            }}>
              <div className="home-top-btn-text">
                返回桌面
              </div>
            </div>
            <div className='flex-box-center home-top-btn home-top-title' onClick={() => {
              getDesktopService();
            }}>艺术馆数智系统</div>
            <div className="home-top-btn" onClick={() => {
              if (editVisible) {
                setEditVisible(false);
              } else {
                setActionVisible2(true);
              }
            }}>
              <div className="home-top-btn-text">
                {editVisible ? '完成' : '管理资源'}
              </div>
            </div>
          </div>
          <div className="flex-box home-content">
            <div
              className="home-content-item home-content-item-switch"
              onClick={(e: any) => {
                setActionVisible3(true);
              }}
            >
              <div className="home-content-item-text">
                类型: {typeList?.find((item: any) => item?.id == currentType)?.name || '切换'}
              </div>
            </div>
            {
              (videoList || [])?.map((item: any, index: number) => {
                const { id = guid(), url, name } = item;
                return <div
                  className="home-content-item"
                  key={`home-content-item-${index}`}
                  onClick={(e: any) => {
                    if (editVisible) {
                      setActionVisible(true);
                      setEditItem(item)
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
          visible={actionVisible}
          actions={actions}
          onClose={() => setActionVisible(false)}
        />
        <ActionSheet
          visible={actionVisible2}
          actions={actions2}
          onClose={() => setActionVisible2(false)}
        />
        <ActionSheet
          visible={actionVisible3}
          actions={actions3}
          onClose={() => setActionVisible3(false)}
        />
        {
          addVideo ?
            <Modal
              width="100%"
              // height="70%"
              wrapClassName="video-add-modal-content"
              open={addVideo}
              maskClosable={false}
              getContainer={false}
              destroyOnClose={true}
              centered
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
                    layout={'horizontal'}
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
                      name='group_id'
                      label='按钮类型'
                      rules={[{ required: true, message: '类型不能为空' }]}
                    >
                      <Select
                        placeholder='请选择按钮类型'
                        options={typeList?.map((item: any) => ({
                          value: item?.id,
                          label: item?.name,
                        }))}
                      />
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
                      if (editVisible) {
                        onEditVideo();
                      } else {
                        OnAddVideo();
                      }
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
