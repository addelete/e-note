import store from '@/store';
import { Tooltip } from 'antd';
import { useCallback } from 'react';
import { MyIcon } from '../MyIcon';
import './SideHeader.less';

export function SideHeader() {
  const preferencesDispatchers = store.useModelDispatchers('preferences');

  const handleCollapsed = useCallback(() => {
    preferencesDispatchers.updatePreferences((draft) => {
      draft.layout.collapsed = true;
    });
  }, []);

  return (
    <div className="SideHeader">
      <Tooltip title="折叠边栏" placement="bottomRight">
        <div className="SideHeader__right iconButton" onClick={handleCollapsed}>
          <MyIcon type="icon-toggle-left" />
        </div>
      </Tooltip>
    </div>
  );
}
