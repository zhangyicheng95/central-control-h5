import { TabBarContext } from '@/layouts';
import { history } from '@umijs/max';
import { Badge, List, Switch } from 'antd-mobile';
import {
  PayCircleOutline,
  SetOutline,
  UnorderedListOutline,
} from 'antd-mobile-icons';
import { useCallback, useContext, useState } from 'react';
import regionLight from '@/assets/images/tab/regionLight.svg';
import styles from './index.less';

export default () => {

  return (
    <div className={`flex-box-column glass-block ${styles.region}`}>
      <div className="flex-box region-title">
        <div className="flex-box region-title-text">
          <img src={regionLight} alt="" className="region-title-text-icon" />
          <span className="region-title-text-text">区域管理</span>
        </div>
      </div>
    </div>
  );
};
