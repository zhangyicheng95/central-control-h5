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
import deviceLight from '@/assets/images/tab/deviceLight.svg';
import conditioner from '@/assets/images/device/conditioner.svg';
import { getDeviceList, postAllDevice, postItemDevice } from '@/services/api';

export default () => {

  const [deviceList, setDeviceList] = useState<any[]>([
    {
      name: '沉浸式投影联动1',
      key: 'conditioner1',
      status: true
    },
    {
      name: '沉浸式投影联动2',
      key: 'conditioner2',
      status: false
    },
    {
      name: '沉浸式投影联动3',
      key: 'conditioner3',
      status: true
    },
    {
      name: '企业介绍一体机1',
      key: 'integratedMachine1',
      status: false
    },
    {
      name: '企业介绍一体机2',
      key: 'integratedMachine2',
      status: true
    },
    {
      name: '55寸一体机',
      key: 'integratedMachine55',
      status: false
    },
    {
      name: '65寸一体机',
      key: 'integratedMachine65',
      status: true
    },
    {
      name: '移屏联动1',
      key: 'mobileScreen1',
      status: false
    },
    {
      name: '移屏联动2',
      key: 'mobileScreen2',
      status: true
    },
    {
      name: '移屏联动3',
      key: 'mobileScreen3',
      status: false
    },
    {
      name: '大屏魔镜拼接屏',
      key: 'magicMirror',
      status: true
    },
    {
      name: 'LED数据大屏',
      key: 'LEDScreen',
      status: false
    }
  ]);
  const renderItemIcon = (key: string) => {
    switch (key) {
      case 'conditioner1':
        return conditioner
      case 'conditioner2':
        return conditioner
      case 'conditioner3':
        return conditioner
      case 'integratedMachine1':
        return conditioner
      case 'integratedMachine2':
        return conditioner
      case 'integratedMachine55':
        return conditioner
      case 'integratedMachine65':
        return conditioner
      case 'mobileScreen1':
        return conditioner
      case 'mobileScreen2':
        return conditioner
      case 'mobileScreen3':
        return conditioner
      case 'magicMirror':
        return conditioner
      case 'LEDScreen':
        return conditioner
    }
  };
  // 获取设备列表
  useEffect(() => {
    getDeviceList().then((res: any) => {
      if (res.code === 200) {
        setDeviceList(res.data);
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
    postAllDevice({ status }).then((res: any) => {
      if (res.code === 200) {
        setDeviceList(deviceList.map((item) => ({ ...item, status: status })));
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
    postItemDevice({ key, status }).then((res: any) => {
      if (res.code === 200) {
        setDeviceList(deviceList.map((item) => {
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
    <div className={`flex-box-column glass-block ${styles.device}`}>
      <div className="flex-box-justify-between device-title">
        <div className="flex-box device-title-text">
          <img src={deviceLight} alt="" className="device-title-text-icon" />
          <span className="device-title-text-text">设备管理</span>
          (<span style={{ color: '#1677ff' }}>
            {deviceList?.filter((i: any) => !!i.status)?.length}
          </span>/12个)
        </div>
        <div className="flex-box device-title-add">
          <span className="device-title-add-text">设备全开</span>
          <Switch checked={deviceList.every((item: any) => item.status)} onChange={(e) => { handleAllSwitchChange(e) }} />
        </div>
      </div>
      <div className="flex-box device-content">
        {
          (deviceList || [])?.map((device: any, index: number) => {
            const { name, key, status } = device;
            return (
              <div
                className="flex-box-justify-between glass-block device-item"
                key={`device-item-${index}`}
              >
                <div className="flex-box-center device-item-icon-box">
                  <img
                    src={renderItemIcon(key)} alt=""
                    className="device-item-icon-box-icon"
                    style={key?.indexOf('power') > -1 ? { width: '40%' } : {}}
                  />
                </div>
                <div className="device-item-name">
                  {name}
                </div>
                <div className="device-item-status">
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
