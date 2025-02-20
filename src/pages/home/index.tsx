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
import { Form, Modal } from 'antd';
import { deleteVideoService, getVideoListService, getVideoPlayService, postAddVideoService } from '@/services/api';
import { guid } from '@/utils/utils';

export default function IndexPage() {
  const timerRef = useRef<any>(null);
  const [form] = Form.useForm();
  const [addVideo, setAddVideo] = useState(false);
  const [videoList, setVideoList] = useState<any[]>([
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
  ]);
  const [actionVisible, setActionVisible] = useState('');

  // 初始化获取已添加的视频列表
  const getVideoList = () => {
    getVideoListService().then((res: any) => {
      if (res?.code === '200') {
        setVideoList(res?.data || []);
      } else {
        Toast.show({
          content: res?.message || '获取视频列表失败',
          icon: 'fail',
        });
      }
    });
  }
  useEffect(() => {
    getVideoList();
  }, []);
  // 关闭添加窗口
  const onAddVideoCancel = () => {
    setAddVideo(false);
    form.resetFields();
  };
  // 添加视频
  const OnAddVideo = () => {
    form.validateFields().then((values) => {
      postAddVideoService(values).then((res: any) => {
        if (res?.code === '200') {
          setVideoList(res?.data || []);
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
  // 播放视频
  const onPlayVideo = (id: string) => {
    getVideoPlayService({ id }).then((res: any) => {
      console.log(res);
      if (res?.code === '200') {
        Toast.show({
          content: '播放成功',
          icon: 'success',
        });
      } else {
        Toast.show({
          content: res?.message || '播放失败',
          icon: 'fail',
        });
      }
    });
  };
  // 删除视频
  const onDeleteVideo = (id: string) => {
    deleteVideoService({ id }).then((res: any) => {
      if (res?.code === '200') {
        getVideoList();
      } else {
        Toast.show({
          content: res?.message || '删除失败',
          icon: 'fail',
        });
      }
    });
  }
  const actions: any[] = [
    { text: '播放此视频', key: 'play', onClick: () => onPlayVideo(actionVisible) },
    {
      text: '删除',
      key: 'delete',
      description: '删除后数据不可恢复',
      danger: true,
      bold: true,
      onClick: () => onDeleteVideo(actionVisible),
    },
  ]

  return (
    <div className={`flex-box-column ${styles.homeWarp}`}>
      <PullToRefresh
        onRefresh={async () => {
          getVideoList();
        }}
      >
        <div className="flex-box-justify-end home-top">
          <div className="home-top-btn" onClick={() => {
            setAddVideo(true);
          }}>
            <div className="home-top-btn-text">
              添加视频
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
                onClick={() => setActionVisible(id)}
              >
                <div className="home-content-item-text">
                  {name || `视频 ${index + 1}`}
                </div>
              </div>
            })
          }
        </div>
      </PullToRefresh>
      <ActionSheet
        visible={!!actionVisible}
        actions={actions}
        onClose={() => setActionVisible('')}
      />
      {
        addVideo ?
          <Modal
            width="90vw"
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
                  请添加视频
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
                    label='视频名称'
                    rules={[{ required: true, message: '名称不能为空' }]}
                  >
                    <Input placeholder='请输入视频名称' />
                  </Form.Item>
                  <Form.Item
                    name='url'
                    label='视频链接'
                    rules={[{ required: true, message: '链接不能为空' }]}
                  >
                    <Input placeholder='请输入视频链接' />
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
  );
}
