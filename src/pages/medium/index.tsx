import { history } from '@umijs/max';
import styles from './index.less';
import { useEffect, useState } from 'react';
import mediumLight from '@/assets/images/tab/mediumLight.svg';
import icon1 from '@/assets/images/medium/medium.png';
import { guid } from '@/utils/utils';
import { getMediumList } from '@/services/api';
import { Toast } from 'antd-mobile';

export default () => {

  const [lightingList, setLightingList] = useState<any[]>([
    {
      name: '互动连接屏自定义设备1',
      key: 'medium1',
    },
    {
      name: '互动连接屏自定义设备2',
      key: 'medium2',
    },
    {
      name: '互动连接屏自定义设备3',
      key: 'medium3',
    },
    {
      name: '互动连接屏自定义设备4',
      key: 'medium4',
    },
    {
      name: '互动连接屏自定义设备5',
      key: 'medium5',
    },
    {
      name: '互动连接屏自定义设备6',
      key: 'medium6',
    },
    {
      name: '互动连接屏自定义设备7',
      key: 'medium7',
    },
    {
      name: '互动连接屏自定义设备8',
      key: 'medium8',
    }
  ]);

  useEffect(() => {
    getMediumList().then((res: any) => {
      if (res?.code === 200) {
        setLightingList((prev: any) => prev.map((item: any) => ({ ...item, id: guid() })))
      } else {
        Toast.show({
          icon: 'fail',
          content: res.message,
        });
      }
    });
  }, []);

  return (
    <div className={`flex-box-column glass-block ${styles.medium}`}>
      <div className="flex-box-justify-between medium-title">
        <div className="flex-box medium-title-text">
          <img src={mediumLight} alt="" className="medium-title-text-icon" />
          <span className="medium-title-text-text">媒体管理</span>
        </div>
      </div>
      <div className="flex-box medium-content">
        {
          (lightingList || [])?.map((medium: any, index: number) => {
            const { name, key, id } = medium;
            return (
              <div
                className="glass-block medium-item"
                key={`medium-item-${index}`}
                onClick={() => {
                  history.push(`/tab-bar/medium/${id}`);
                }}
              >
                <div className="flex-box-center medium-item-icon-box">
                  <img
                    src={icon1} alt=""
                    className="medium-item-icon-box-icon"
                    style={key?.indexOf('power') > -1 ? { width: '40%' } : {}}
                  />
                </div>
                <div className="medium-item-name">
                  {name}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};
