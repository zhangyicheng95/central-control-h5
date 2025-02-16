import { TabBarContext } from '@/layouts';
import { useParams } from 'umi';
import { history } from '@umijs/max';
import { NavBar, ProgressBar, ProgressCircle, Result, Segmented, Slider, Space, Toast } from 'antd-mobile';
import { useContext, useEffect, useMemo, useState } from 'react';
import styles from './index.less';
import { getMediumDetail } from '@/services/api';
import backIcon from '@/assets/images/medium/back.svg';
import playIcon from '@/assets/images/medium/play.svg';
import pauseIcon from '@/assets/images/medium/pause.svg';
import forwardIcon from '@/assets/images/medium/forward.svg';
import reloadIcon from '@/assets/images/medium/reload.svg';
import fullIcon from '@/assets/images/medium/full.svg';
import { getFormattedDuration } from '@/utils/utils';

export default () => {
  const params = useParams();
  const id = params.id;
  const [tab, setTab] = useState('1');
  const [mediumDetail, setMediumDetail] = useState<any>({});
  const [activeItem, setActiveItem] = useState<any>({});
  const [playStatus, setPlayStatus] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  // 右侧不同类型
  const segmentedOptions = [
    {
      label: '视频',
      value: '1',
    },
    {
      label: '图片',
      value: '2',
    },
    {
      label: '屏保',
      value: '3',
    },
    {
      label: '网页',
      value: '4',
    },
  ];
  // 返回上一层
  const back = () => {
    history.back()
  };
  const getMediumDetailData = (type: string) => {
    getMediumDetail({ id, type }).then((res: any) => {
      if (res?.code === 200) {
        setMediumDetail(res?.data || []);
      }
    });
  };
  // 进入获取详情
  useEffect(() => {
    if (!id) return;
    getMediumDetailData('1');
  }, [id]);
  // 当前播放的item
  const currentItem: any = useMemo(() => {
    const video: any = document.getElementById(`video-${activeItem?.id}`);
    return video;
  }, [activeItem?.id])

  return (
    <div className={`flex-box-column glass-block ${styles['medium-detail']}`}>
      <div className="flex-box medium-detail-header">
        <div className="medium-detail-header-title" onClick={back}>
          {mediumDetail.name}
        </div>
        <div className="flex-box glass-block medium-detail-header-right">
          {
            (segmentedOptions || []).map((item: any) => {
              const { label, value } = item;
              return <div
                className={`medium-detail-header-right-item ${tab === value ? 'medium-detail-header-right-item-active' : ''}`}
                key={`medium-detail-header-right-item-${value}`}
                onClick={() => {
                  setTab(value);
                  getMediumDetailData(value);
                }}
              >
                {label}
              </div>
            })
          }
        </div>
      </div>
      <div className="flex-box medium-detail-content">
        {
          (mediumDetail?.list || [])?.map((item: any, index: number) => {
            const { id, name, url } = item;
            return <div
              className={`glass-block medium-detail-content-item ${activeItem?.id === id ? 'medium-detail-content-item-active' : ''}`}
              key={`medium-detail-content-item-${index}`}
              onClick={() => {
                // 暂停正在播放的
                currentItem?.pause();
                // 设置当前播放
                const video: any = document.getElementById(`video-${id}`);
                if (video) {
                  video.play();
                  setPlayStatus(true);
                };
                // 设置播放的item
                setActiveItem(item);
                setCurrentTime(0);
              }}
            >
              <div className="medium-detail-content-item-icon-box">
                <video
                  src={url}
                  id={`video-${id}`}
                  // controls loop muted playsInline
                  onTimeUpdate={() => {
                    if (!currentItem?.duration) {
                      return;
                    };
                    const currentTime = currentItem.currentTime;
                    setCurrentTime(currentTime);
                  }}
                  className='medium-detail-content-item-icon-box-video'
                />
              </div>
              <div className="medium-detail-content-item-name">
                {name}
              </div>
            </div>
          })
        }
      </div>
      <div className="flex-box glass-block medium-detail-footer">
        <div className="flex-box medium-detail-footer-left">
          <div className="medium-detail-footer-left-item">
            <img src={backIcon} alt="back" onClick={() => {
              if (!currentItem?.duration) {
                return;
              };
              const currentTime = currentItem.currentTime;
              currentItem.currentTime = currentTime - 10;
            }} />
          </div>
          <div className="medium-detail-footer-left-item">
            <img
              src={playStatus ? pauseIcon : playIcon} alt="play"
              onClick={() => {
                if (!currentItem?.duration) {
                  return;
                };
                if (currentItem.paused) {
                  currentItem.play();
                  setPlayStatus(true);
                } else {
                  currentItem.pause();
                  setPlayStatus(false);
                }
              }}
            />
          </div>
          <div className="medium-detail-footer-left-item">
            <img src={forwardIcon} alt="forward" onClick={() => {
              if (!currentItem?.duration) {
                return;
              };
              const currentTime = currentItem.currentTime;
              currentItem.currentTime = currentTime + 10;
            }} />
          </div>
        </div>
        <div className="flex-box medium-detail-footer-center">
          <div className="medium-detail-footer-center-time">
            {!!currentTime ? getFormattedDuration(currentTime) : '00:00:00'}
          </div>
          <Slider
            disabled={!currentItem?.duration}
            defaultValue={!!currentItem?.duration ? (currentTime / currentItem?.duration) : 0}
            onAfterChange={(value: any) => {
              const duration = currentItem?.duration;
              const time = duration * value / 100;
              currentItem.currentTime = time;
              setCurrentTime(time);
            }}
          />
          <div className="medium-detail-footer-center-time">
            {!!currentItem?.duration ? getFormattedDuration(currentItem?.duration) : '00:00:00'}
          </div>
        </div>
        <div className="flex-box medium-detail-footer-right">
          <div className="medium-detail-footer-right-item">
            <img src={reloadIcon} alt="reload" onClick={() => {
              if (!currentItem?.duration) {
                return;
              };
              currentItem.currentTime = 0;
              currentItem.play();
              setPlayStatus(true);
            }} />
          </div>
          <div className="medium-detail-footer-right-item">
            <img src={fullIcon} alt="full" onClick={() => {
              if (!currentItem?.duration) {
                return;
              };
              if (currentItem.requestFullscreen) {
                currentItem.requestFullscreen();
              } else if (currentItem.mozRequestFullScreen) {
                currentItem.mozRequestFullScreen();
              } else if (currentItem.webkitRequestFullscreen) {
                currentItem.webkitRequestFullscreen();
              } else if (currentItem.msRequestFullscreen) {
                currentItem.msRequestFullscreen();
              }
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};
