import { history } from '@umijs/max';
import {
  Button,
  Grid,
  Popover,
  Space,
  Swiper,
  Switch,
  Toast,
} from 'antd-mobile';
import { useEffect, useLayoutEffect, useState } from 'react';
import styles from './index.less';
import lightingOn from '@/assets/images/home/lightingOn.png';
import lightingOff from '@/assets/images/home/lightingOff.png';
import SceneOutline from '@/assets/images/home/scene.png';
import SettingOutline from '@/assets/images/home/setting.png';
import ThemeOutline from '@/assets/images/home/theme.png';
import ReloadOutline from '@/assets/images/home/reload.png';
import { postAllStatus, reStartServer } from '@/services/api';

export default function IndexPage() {

  const renderTabItemIcon = (name: string) => {
    switch (name) {
      case 'scene':
        return SceneOutline
      case 'setting':
        return SettingOutline
      case 'theme':
        return ThemeOutline
      case 'reload':
        return ReloadOutline
    }
  };

  useEffect(() => {
    const box = document.querySelector('.view-warp');
    if (!box) {
      window.location.reload();
    };
  }, []);

  return (
    <div className={`flex-box-justify-around ${styles.homeWarp}`}>
      <div className="flex-box-column home-box-left glass-block">
        <div className="home-box-left-title">
          整馆控制
        </div>
        <div className="flex-box home-box-left-content">
          {
            [{ title: '一键开馆', value: 1 }, { title: '一键关馆', value: 0 }]
              .map((item: any, index: number) => {
                const { title, value } = item;
                return (
                  <div
                    className={`flex-box-center glass-block-linear home-box-left-content-item ${value ? 'active' : ''}`}
                    key={`home-box-left-content-item-${index}`}
                    onClick={() => {
                      postAllStatus({ value }).then((res: any) => {
                        if (res?.code === 200) {
                          Toast.show({
                            icon: 'success',
                            content: '操作成功',
                          });
                        } else {
                          Toast.show({
                            icon: 'fail',
                            content: '操作失败',
                          });
                        }
                      });
                    }}
                  >
                    <img
                      src={!!value ? lightingOn : lightingOff} alt=""
                      className='home-box-left-content-item-icon'
                    />
                    {title}
                  </div>
                )
              })
          }
        </div>
      </div>
      <div className="flex-box-column home-box-right glass-block">
        <div className="home-box-right-title">
          系统控制
        </div>
        <div className="flex-box home-box-right-content">
          {
            [
              { title: '情景模式', key: 'scene', value: 0 }, { title: '设置中心', key: 'setting', value: 1 },
              { title: '切换主题', key: 'theme', value: 2 }, { title: '重启服务器', key: 'reload', value: 3 }
            ]
              .map((item: any, index: number) => {
                const { title, value, key } = item;
                return (
                  <div
                    className={`flex-box-center glass-block home-box-right-content-item`}
                    key={`home-box-right-content-item-${key}`}
                    onClick={() => {
                      if (key === 'reload') {
                        reStartServer({}).then((res: any) => {
                          if (res?.code === 200) {
                            Toast.show({
                              icon: 'success',
                              content: '重启成功',
                            });
                          } else {
                            Toast.show({
                              icon: 'fail',
                              content: '重启失败',
                            });
                          };
                        });
                      } else if (key === 'scene') {
                        history.push(`/tab-bar/index/${key}`);
                      } else if (key === 'setting') {
                        history.push(`/tab-bar/index/${key}`);
                      }
                    }}
                  >
                    <img src={renderTabItemIcon(key)} alt="" className='home-box-right-content-item-icon' />
                    {title}
                  </div>
                )
              })
          }
        </div>
      </div>
    </div>
  );
}
