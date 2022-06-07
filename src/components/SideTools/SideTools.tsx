import { Tooltip } from 'antd';
import { MyIcon } from '../MyIcon';
import './SideTools.less';

export function SideTools() {
  return (
    <div className="SideTools">
      <Tooltip title="打开搜索面板" placement="bottomLeft">
        <div className="iconButton">
          <MyIcon type="icon-search" />
        </div>
      </Tooltip>
      <Tooltip title="查看页面关系" placement="bottomLeft">
        <div className="iconButton">
          <MyIcon type="icon-connection" />
        </div>
      </Tooltip>
      <Tooltip title="导入" placement="bottomLeft">
        <div className="iconButton">
          <MyIcon type="icon-import" />
        </div>
      </Tooltip>
      <Tooltip title="切换至深色模式" placement="bottomRight">
        <div className="SideTools__right iconButton">
          <MyIcon type="icon-moon" />
        </div>
      </Tooltip>
      <Tooltip title="打开设置面板" placement="bottomRight">
        <div className="iconButton">
          <MyIcon type="icon-settings" />
        </div>
      </Tooltip>
    </div>
  );
}
