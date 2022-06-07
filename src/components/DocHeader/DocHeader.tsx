import store from '@/store';
import { Tooltip } from 'antd';
import { useCallback } from 'react';
import { DocIcon } from '../DocIcon';
import { MyIcon } from '../MyIcon';
import './DocHeader.less';

export function DocHeader() {
  const title = store.useSelector((state) => state.docs.editingDoc?.title);
  const iconData = store.useSelector((state) => state.docs.editingDoc?.iconData);
  const collapsed = store.useSelector((state) => state.preferences.layout.collapsed);
  const preferencesDispatchers = store.useModelDispatchers('preferences');

  const unCollapsed = useCallback(() => {
    preferencesDispatchers.updatePreferences((draft) => {
      draft.layout.collapsed = false;
    });
  }, []);

  return (
    <div className="DocHeader" data-tauri-drag-region>
      {collapsed ? (
        <div className="iconButton" onClick={unCollapsed}>
          <MyIcon type="icon-toggle-right" />
        </div>
      ) : null}
      <div className="DocHeader__title" >
        {iconData && <span className="DocHeader__title__icon"><DocIcon data={iconData} /></span>}
        <span>{title}</span>
      </div>
      <div className="DocHeader__buttons">
        <Tooltip title="编辑锁定" placement="bottom">
          <div className="iconButton bgGray">
            <MyIcon type="icon-lock" />
          </div>
        </Tooltip>
        <Tooltip title="星标" placement="bottom">
          <div className="iconButton bgGray">
            <MyIcon type="icon-star" />
          </div>
        </Tooltip>
        <Tooltip title="导出" placement="bottom">
          <div className="iconButton bgGray">
            <MyIcon type="icon-export" />
          </div>
        </Tooltip>
        <Tooltip title="打印" placement="bottom">
          <div className="iconButton bgGray">
            <MyIcon type="icon-printer" />
          </div>
        </Tooltip>
        <Tooltip title="页面配置" placement="bottomRight">
          <div className="iconButton bgGray">
            <MyIcon type="icon-control" />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
