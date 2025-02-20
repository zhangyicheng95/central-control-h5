import { history, Outlet, useLocation, useOutletContext } from '@umijs/max';
import {
  TransportQRcodeOutline,
} from 'antd-mobile-icons';
import type { TabBarItemProps } from 'antd-mobile/es/components/tab-bar';
import { useCallback, useContext, useEffect, useState } from 'react';
import { TabBarContext } from '@/layouts';
import styles from './index.less';

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

  return (
    <div className={styles['tab-bar-layout']}>
      <div className='flex-box-column container-warp'>
        <div className='view-warp'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
