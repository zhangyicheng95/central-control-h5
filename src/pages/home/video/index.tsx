import { history } from '@umijs/max';
import {
  Toast,
} from 'antd-mobile';
import { useEffect, useRef, useState } from 'react';
import styles from './index.less';
import { controlVideoService, getVideoPlayService } from '@/services/api';
import { GetQueryObj } from '@/utils/utils';
import AutoLandscape from '@/layouts/AutoLandscape';
import {
  CaretRightFilled,
  PauseOutlined,
  XFilled,
  ReloadOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import { BASE_IP } from '@/utils/fetch';

export default function VideoPage() {
  const params: any = !!location.search
    ? GetQueryObj(location.search)
    : !!location.href
      ? GetQueryObj(location.href)
      : {};
  const id = params?.['id'];
  const name = params?.['file_name'];
  const webSocketRef = useRef<any>(null);
  const isPlaying = useRef(true);
  const [videoSrc, setVideoSrc] = useState('');

  const connectWebSocket = () => {
    if (webSocketRef.current) {
      webSocketRef.current.close();
      webSocketRef.current = null;
    };
    webSocketRef.current = new WebSocket(`ws://${BASE_IP}/api/ws/video-stream`);
    webSocketRef.current.onopen = () => {
      console.log('WebSocket 连接成功');
    };
    webSocketRef.current.onmessage = (event: any) => {
      try {
        if (isPlaying.current) {
          const data = JSON.parse(event.data);
          setVideoSrc(data.image);
        }
      } catch (error) {
        console.log('WebSocket 收到消息:', error);
      }
    };
    webSocketRef.current.onclose = () => {
      webSocketRef.current = null;
    };
    webSocketRef.current.onerror = (error: any) => {
      console.log('WebSocket 连接错误:', error);
    };
  };
  const initPlayVideo = () => {
    getVideoPlayService({ button_id: id, fullscreen: process.env.NODE_ENV !== 'development' }).then((res: any) => {
      if (res?.code === 'SUCCESS') {
        isPlaying.current = true;
        connectWebSocket();
      } else {
        Toast.show({
          content: res?.message || '播放失败',
          icon: 'fail',
        });
      }
    });
  }
  useEffect(() => {
    initPlayVideo();

    return () => {
      onStopVideo();
    }
  }, [id]);
  const goBack = () => {
    history.back();
  };
  const onPlayVideo = () => {
    if (webSocketRef.current) {
      controlVideoService('play').then((res: any) => {
        if (res?.code === 'SUCCESS') {
          isPlaying.current = true;
        } else {
          Toast.show({
            content: res?.message || '播放失败',
            icon: 'fail',
          });
        }
      });
    } else {
      initPlayVideo();
    }
  };
  const onPauseVideo = () => {
    controlVideoService('pause').then((res: any) => {
      if (res?.code === 'SUCCESS') {
        isPlaying.current = false;
      } else {
        Toast.show({
          content: res?.message || '暂停失败',
          icon: 'fail',
        });
      }
    });
  };
  const onStopVideo = () => {
    controlVideoService('stop').then((res: any) => {
      if (res?.code === 'SUCCESS') {
        isPlaying.current = false;
        webSocketRef.current?.close();
      } else {
        Toast.show({
          content: res?.message || '停止失败',
          icon: 'fail',
        });
      }
    });
  };
  const onReloadVideo = () => {
    controlVideoService('stop').then((res: any) => {
      if (res?.code === 'SUCCESS') {
        initPlayVideo();
      }
    });
  };

  return (
    <AutoLandscape>
      <div className={`flex-box-column ${styles.videoWarp}`}>
        <div className="video-box-top">
          <div className="video-box-top-back">
            {/* <div className="video-box-top-back-text" onClick={() => goBack()}>
              返 回
            </div> */}
            {name}
          </div>
        </div>
        <div className="flex-box video-box-content">
          {
            isPlaying.current ?
              <img src={`data:image/jpeg;base64,${videoSrc}`} alt="" />
              : null
          }
        </div>
        <div className="flex-box-center video-box-footer">
          <div className="flex-box-center video-box-footer-item back-btn" onClick={() => goBack()}>
            <LeftOutlined />
            <div className="video-box-footer-item-text">返回</div>
          </div>
          {
            [
              {
                type: 'play',
                text: '播放',
                onClick: () => {
                  onPlayVideo();
                }
              },
              {
                type: 'pause',
                text: '暂停',
                onClick: () => {
                  onPauseVideo();
                }
              },
              {
                type: 'stop',
                text: '停止',
                onClick: () => {
                  onStopVideo();
                }
              },
              {
                type: 'reload',
                text: '刷新',
                onClick: () => {
                  onReloadVideo();
                }
              },
            ]?.map((item: any, index: number) => {
              const { type, text, onClick } = item;
              return (
                <div
                  key={index}
                  className="flex-box-center video-box-footer-item" onClick={onClick}
                >
                  {
                    type === 'play' ? <CaretRightFilled /> :
                      type === 'pause' ? <PauseOutlined /> :
                        type === 'stop' ? <XFilled /> :
                          type === 'reload' ? <ReloadOutlined /> :
                            null
                  }
                  <div
                    className="video-box-footer-item-text"
                  >{item.text}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    </AutoLandscape>
  );
}

const colorTransform: any = {
  'play': 'red',
  'pause': 'blue',
  'stop': 'green',
  'reload': 'yellow',
}