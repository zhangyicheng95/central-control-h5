import {
  Avatar,
  Badge,
  DotLoading,
  List,
  NavBar,
  PullToRefresh,
  Space,
} from 'antd-mobile';
import {
  AlipayCircleFill,
  AntOutline,
  BankcardOutline,
  CheckShieldOutline,
  ContentOutline,
  CouponOutline,
  FileOutline,
  FireFill,
  GiftOutline,
  HandPayCircleOutline,
  HistogramOutline,
  KoubeiFill,
  MoreOutline,
  PayCircleOutline,
  PieOutline,
  ReceiptOutline,
  SetOutline,
  UserCircleOutline,
} from 'antd-mobile-icons';
import styles from './index.less';
import { useState } from 'react';
import { sleep } from 'antd-mobile/es/utils/sleep';

export default () => {

  return (
    <div className={styles.account}>
      个人
    </div>
  );
};
