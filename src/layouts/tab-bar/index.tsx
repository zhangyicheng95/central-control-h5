import { history, Outlet, useLocation, useOutletContext } from '@umijs/max';
import { TabBar } from 'antd-mobile/2x';
import {
  AlipayCircleFill,
  AppOutline,
  MessageFill,
  TransportQRcodeOutline,
  UnorderedListOutline,
  UserOutline,
  AppstoreOutline,
} from 'antd-mobile-icons';
import type { TabBarItemProps } from 'antd-mobile/es/components/tab-bar';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TabBarContext } from '@/layouts';
import styles from './index.less';
import homeLight from '@/assets/images/tab/homeLight.svg';
import homeDark from '@/assets/images/tab/homeDark.svg';
import deviceLight from '@/assets/images/tab/deviceLight.svg';
import deviceDark from '@/assets/images/tab/deviceDark.svg';
import lightLight from '@/assets/images/tab/lightingLight.svg';
import lightDark from '@/assets/images/tab/lightingDark.svg';
import mediumLight from '@/assets/images/tab/mediumLight.svg';
import mediumDark from '@/assets/images/tab/mediumDark.svg';
import regionLight from '@/assets/images/tab/regionLight.svg';
import regionDark from '@/assets/images/tab/regionDark.svg';

export default ({ routes }: { routes: any[] }) => {
  const [tabs, setTabs] = useState<TabBarItemProps[] | any[]>([]);
  const [activeKey, setActiveKey] = useState<string>('');
  const { pathname } = useLocation();
  const tabBarContext = useContext<any>(TabBarContext);
  const props = useOutletContext();

  useEffect(() => {
    if (routes) {
      const _tabs = (routes || [])
        .filter((x: any) => !!x.icon)
        .map((_route: any) => {
          const badgeKey = _route.badgeKey;
          // @ts-ignore
          const badge =
            tabBarContext?.items?.[badgeKey as string] || _route.badge;
          return {
            key: (_route.path || '').replace('/', ''),
            tabIndex: (_route.path || '').replace('/', ''),
            title: _route.title,
            icon: _route.icon,
            badge: badge,
          };
        });
      if (pathname) {
        setActiveKey(pathname.replace('/', ''));
      } else {
        setActiveKey(_tabs[0].key);
      }
      setTabs(_tabs);
    }
  }, [props, pathname, tabBarContext?.items]);

  const renderTabItemIcon = useCallback((name: string, active: boolean) => {
    switch (name) {
      case 'home':
        return active ? <img src={homeDark} alt="light" className='tab-item-icon' /> : <img src={homeLight} alt="light" className='tab-item-icon' />;
      case 'device':
        return active ? <img src={deviceDark} alt="light" className='tab-item-icon' /> : <img src={deviceLight} alt="light" className='tab-item-icon' />;
      case 'lighting':
        return active ? <img src={lightDark} alt="light" className='tab-item-icon' /> : <img src={lightLight} alt="light" className='tab-item-icon' />;
      case 'medium':
        return active ? <img src={mediumDark} alt="light" className='tab-item-icon' /> : <img src={mediumLight} alt="light" className='tab-item-icon' />;
      case 'region':
        return active ? <img src={regionDark} alt="light" className='tab-item-icon' /> : <img src={regionLight} alt="light" className='tab-item-icon' />;
      default:
        return '';
    }
  }, []);

  return (
    <div className={styles['tab-bar-layout']}>
      <div className='flex-box-column container-warp'>
        <div className="flex-box glass-block header-box">
          <div style={{ flex: 1 }}>
            <div className="header-title">
              馆+ 中控管理系统
            </div>
            <div className="header-sub-title">
              CENTRAL CONTROL SYSTEM
            </div>
          </div>
          <div className="flex-box header-status">
            <TransportQRcodeOutline />
            在线
          </div>
        </div>
        <div className='view-warp'>
          <Outlet />
        </div>
      </div>
      <div className={`flex-box glass-block tab-box`}>
        {
          tabs.map((item: any) => {
            const { title, key, icon } = item;
            return <div
              className={`flex-box-center tab-item ${activeKey?.indexOf(key) > -1 ? 'tab-item-active' : ''}`}
              key={`tab-item-${key}`}
              onClick={() => {
                setActiveKey(key);
                history.replace('/' + key);
              }}
            >
              {renderTabItemIcon(icon, activeKey === key)}
              {title}
              {
                activeKey?.indexOf(key) > -1 ?
                  <div className="trapezoid"></div>
                  : null
              }
            </div>
          })
        }
      </div>
    </div>
  );
};
