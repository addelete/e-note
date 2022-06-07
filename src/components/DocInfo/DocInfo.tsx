import { Divider } from 'antd';
import { DocCoverSelect } from '../DocCoverSelect';
import { DocIconPicker } from '../DocIconPicker';
import './DocInfo.less';

export function DocInfo() {
  return (
    <div className="DocInfo">
      <div className="DocInfo__cover">
        <DocCoverSelect />
      </div>
      <div className="DocInfo__icon">
        <Divider className="DocInfo__icon__divider" dashed />
        <div className="DocInfo__icon__picker">
          <DocIconPicker />
        </div>
      </div>
    </div>
  );
}
