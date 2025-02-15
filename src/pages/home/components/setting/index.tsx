import { TabBarContext } from '@/layouts';
import { history } from '@umijs/max';
import { NavBar, ProgressCircle, Result, Space, Toast } from 'antd-mobile';
import { useContext } from 'react';

export default () => {
  const todo = useContext(TabBarContext);
  const back = () => {
    history.back()
  };

  return (
    <div>
      <NavBar back="返回" onBack={back}>
        设置中心
      </NavBar>

    </div>
  );
};
