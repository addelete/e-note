import store from '@/store';
import { Badge } from 'antd';
import { MyIcon } from '../MyIcon';
import './SideFooter.less';

export function SideFooter() {
  const deletedDocCount = store.useSelector((state) => state.docs.deletedDocTrees.length);
  return (
    <div className="SideFooter">
      <div className="SideFooter__wastebasketBtn">
        <MyIcon type="icon-delete" />
        <span>废纸篓</span>
        <div className="SideFooter__wastebasketBtn__count">
          <Badge count={deletedDocCount} />
        </div>
      </div>
    </div>
  );
}
