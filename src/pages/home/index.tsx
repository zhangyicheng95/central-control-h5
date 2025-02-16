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
import powerOn from '@/assets/images/lighting/powerOn.svg';
import powerOff from '@/assets/images/lighting/powerOff.svg';
import { getLightingList, postAllLighting, postAllStatus, postItemLighting, reStartServer } from '@/services/api';
import Weather from '@/components/WeatherApp';

export default function IndexPage() {
  useEffect(() => {
    const box = document.querySelector('.view-warp');
    if (!box) {
      window.location.reload();
    };
  }, []);

  const [openStatus, setOpenStatus] = useState(0);

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

  const [lightingList, setLightingList] = useState<any[]>([
    {
      name: '入门灯光1',
      key: 'lighting1',
      status: true
    },
    {
      name: '入门灯光2',
      key: 'lighting2',
      status: false
    },
    {
      name: '入门灯光3',
      key: 'lighting3',
      status: true
    },
    {
      name: '入门灯光4',
      key: 'lighting4',
      status: false
    },
    {
      name: '入门灯光5',
      key: 'lighting5',
      status: true
    },
    {
      name: '入门灯光6',
      key: 'lighting6',
      status: false
    },
    {
      name: '入门灯光7',
      key: 'lighting7',
      status: true
    },
    {
      name: '入门灯光8',
      key: 'lighting8',
      status: false
    },
    {
      name: '电源1',
      key: 'power1',
      status: true
    },
    {
      name: '电源2',
      key: 'power2',
      status: false
    },
    {
      name: '电源3',
      key: 'power3',
      status: true
    },
    {
      name: '电源4',
      key: 'power4',
      status: false
    }
  ]);
  const renderItemIcon = (key: string, status: boolean) => {
    switch (key) {
      case 'lighting1':
        return status ? lightingOn : lightingOff
      case 'lighting2':
        return status ? lightingOn : lightingOff
      case 'lighting3':
        return status ? lightingOn : lightingOff
      case 'lighting4':
        return status ? lightingOn : lightingOff
      case 'lighting5':
        return status ? lightingOn : lightingOff
      case 'lighting6':
        return status ? lightingOn : lightingOff
      case 'lighting7':
        return status ? lightingOn : lightingOff
      case 'lighting8':
        return status ? lightingOn : lightingOff
      case 'power1':
        return status ? powerOn : powerOff
      case 'power2':
        return status ? powerOn : powerOff
      case 'power3':
        return status ? powerOn : powerOff
      case 'power4':
        return status ? powerOn : powerOff
    }
  };
  // 获取灯光列表
  useEffect(() => {
    getLightingList().then((res: any) => {
      if (res.code === 200) {
        setLightingList(res.data);
      } else {
        Toast.show({
          icon: 'fail',
          content: res.message,
        })
      };
    });
  }, []);
  // 设备全开
  const handleAllSwitchChange = (status: boolean) => {
    postAllLighting({ status }).then((res: any) => {
      if (res.code === 200) {
        setLightingList(lightingList.map((item) => ({ ...item, status: status })));
      } else {
        Toast.show({
          icon: 'fail',
          content: res.message,
        })
      }
    });
  };
  // 单个设备开关
  const handleSwitchChange = (key: string, status: boolean) => {
    postItemLighting({ key, status }).then((res: any) => {
      if (res.code === 200) {
        setLightingList(lightingList.map((item) => {
          if (item.key === key) {
            return { ...item, status: status }
          }
          return item
        }));
      } else {
        Toast.show({
          icon: 'fail',
          content: res.message,
        })
      }
    });
  };

  return (
    <div className={`flex-box-column ${styles.homeWarp}`}>
      <div className="home-box-weather">
        <Weather />
      </div>
      <div className="home-box-system">
        <div className="flex-box home-box-system-title">
          系统控制
        </div>
        <div className="flex-box-column home-box-system-content">
          <div className="flex-box home-box-system-content-top">
            {
              [
                { title: '情景模式', key: 'scene', value: 0 }, { title: '设置中心', key: 'setting', value: 1 },
                { title: '切换主题', key: 'theme', value: 2 }, { title: '重启服务器', key: 'reload', value: 3 }
              ]
                .map((item: any, index: number) => {
                  const { title, value, key } = item;
                  return (
                    <div
                      className={`flex-box-center glass-block home-box-system-content-top-item`}
                      key={`home-box-system-content-top-item-${key}`}
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
                      <img src={renderTabItemIcon(key)} alt="" className='home-box-system-content-top-item-icon' />
                      {title}
                    </div>
                  )
                })
            }
          </div>
          <div className="flex-box home-box-system-content-bottom">
            {
              [{ title: '一键开馆', value: 1 }, { title: '一键闭馆', value: 0 }]
                .map((item: any, index: number) => {
                  const { title, value } = item;
                  return (
                    <div
                      className={`flex-box-center glass-block-linear home-box-system-content-bottom-item ${value ? 'active' : ''}`}
                      key={`home-box-system-content-bottom-item-${index}`}
                      onClick={() => {
                        postAllStatus({ value }).then((res: any) => {
                          if (res.code === 200) {
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
                      <div className="flex-box-center home-box-system-content-bottom-item-icon-box">
                        <img
                          src={!!value ? lightingOn : lightingOff} alt=""
                          className='home-box-system-content-bottom-item-icon-box-icon'
                        />
                      </div>
                      {title}
                    </div>
                  )
                })
            }
          </div>
        </div>
      </div>
      <div className="flex-box-column home-box-lighting">
        <div className="flex-box-justify-between home-box-lighting-title">
          <span className="home-box-lighting-title-icon">
            灯光管理
            <span>
              (<span style={{ color: '#1677ff' }}>
                {lightingList?.filter((i: any) => !!i.status)?.length}
              </span>/12个)
            </span>
          </span>
          <div className="flex-box home-box-lighting-title-add">
            <span className="home-box-lighting-title-add-text">灯光全开</span>
            <Switch checked={lightingList.every((item: any) => item.status)} onChange={(e) => { handleAllSwitchChange(e) }} />
          </div>
        </div>
        <div className="flex-box-column home-box-lighting-content">
          {
            (lightingList || [])?.map((lighting: any, index: number) => {
              const { name, key, status } = lighting;
              return (
                <div
                  className="flex-box glass-block home-box-lighting-content-item"
                  key={`lighting-item-${index}`}
                >
                  <div className="flex-box home-box-lighting-content-item-left">
                    <div className="flex-box-center glass-block home-box-lighting-content-item-left-icon-box">
                      <img
                        src={renderItemIcon(key, status)} alt=""
                        className="home-box-lighting-content-item-left-icon-box-icon"
                        style={key?.indexOf('power') > -1 ? { width: '40%' } : {}}
                      />
                    </div>
                    <div className="home-box-lighting-content-item-left-name">
                      {name}
                    </div>
                  </div>
                  <div className="home-box-lighting-content-item-status">
                    <Switch checked={status} onChange={(e) => { handleSwitchChange(key, e) }} />
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}
