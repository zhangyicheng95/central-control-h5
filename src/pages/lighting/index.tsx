import {
  Avatar,
  Badge,
  DotLoading,
  List,
  NavBar,
  PullToRefresh,
  Space,
  Switch,
  Toast,
} from 'antd-mobile';
import styles from './index.less';
import { useEffect, useState } from 'react';
import lightLight from '@/assets/images/tab/lightingLight.svg';
import lightingOn from '@/assets/images/lighting/lightingOn.png';
import lightingOff from '@/assets/images/lighting/lightingOff.png';
import powerOn from '@/assets/images/lighting/powerOn.svg';
import powerOff from '@/assets/images/lighting/powerOff.svg';

import { getLightingList, postAllLighting, postItemLighting } from '@/services/api';

export default () => {

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
        // Toast.show({
        //   icon: 'fail',
        //   content: res.message,
        // })
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
    <div className={`flex-box-column glass-block ${styles.lighting}`}>
      <div className="flex-box-justify-between lighting-title">
        <div className="flex-box lighting-title-text">
          <img src={lightLight} alt="" className="lighting-title-text-icon" />
          <span className="lighting-title-text-text">设备管理</span>
          (<span style={{ color: '#1677ff' }}>
            {lightingList?.filter((i: any) => !!i.status)?.length}
          </span>/12个)
        </div>
        <div className="flex-box lighting-title-add">
          <span className="lighting-title-add-text">灯光全开</span>
          <Switch checked={lightingList.every((item: any) => item.status)} onChange={(e) => { handleAllSwitchChange(e) }} />
        </div>
      </div>
      <div className="flex-box lighting-content">
        {
          (lightingList || [])?.map((lighting: any, index: number) => {
            const { name, key, status } = lighting;
            return (
              <div
                className="flex-box-justify-between glass-block lighting-item"
                key={`lighting-item-${index}`}
              >
                <div className="flex-box-center lighting-item-icon-box">
                  <img
                    src={renderItemIcon(key, status)} alt=""
                    className="lighting-item-icon-box-icon"
                    style={key?.indexOf('power') > -1 ? { width: '40%' } : {}}
                  />
                </div>
                <div className="lighting-item-name">
                  {name}
                </div>
                <div className="lighting-item-status">
                  <Switch checked={status} onChange={(e) => { handleSwitchChange(key, e) }} />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};
