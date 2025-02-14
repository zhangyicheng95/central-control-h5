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
import {
  AddCircleOutline,
  AntOutline,
  DownOutline,
  FolderOutline,
  ReceivePaymentOutline,
  RightOutline,
  ScanningOutline,
  SearchOutline,
  TravelOutline,
  UploadOutline,
  UserContactOutline,
} from 'antd-mobile-icons';
import { useLayoutEffect, useState } from 'react';
import styles from './index.less';

export default function IndexPage() {
  const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac'];
  const items = colors.map((color, index) => (
    <Swiper.Item key={index}>
      <div
        className={styles.content}
        style={{ background: color }}
        onClick={() => {
          Toast.show(`你点击了卡片 ${index + 1}`);
        }}
      >
        {index + 1}
      </div>
    </Swiper.Item>
  ));
  const [enableDarkMode, setEnableDarkMode] = useState(false);

  useLayoutEffect(() => {
    document.documentElement.setAttribute(
      'data-prefers-color-scheme',
      enableDarkMode ? 'dark' : 'light',
    );
  }, [enableDarkMode]);

  return (
    <div className={styles.homeWarp}>
      <div className={styles.adWarp}>
        <Swiper autoplay={true} loop={true}>
          {items}
        </Swiper>
      </div>
      <div>
        <Space wrap>
          <Button
            onClick={() => {
              Toast.show({
                icon: 'success',
                content: '保存成功',
              });
            }}
          >
            成功
          </Button>
          <Button
            onClick={() => {
              Toast.show({
                icon: 'fail',
                content: '名称已存在',
              });
            }}
          >
            失败
          </Button>
          <Button
            onClick={() => {
              Toast.show({
                icon: 'loading',
                content: '加载中…',
              });
            }}
          >
            加载中
          </Button>
          <Button
            onClick={() => {
              Toast.show({
                content: '上传中',
                icon: <UploadOutline />,
              });
            }}
          >
            自定义图标
          </Button>
        </Space>
      </div>
      <div>
        <Space align="center">
          <div>Dark Mode</div>
          <Switch
            checked={enableDarkMode}
            onChange={(v) => {
              setEnableDarkMode(v);
            }}
          />
        </Space>
      </div>
    </div>
  );
}
