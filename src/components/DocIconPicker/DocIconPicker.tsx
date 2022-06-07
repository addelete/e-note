import { Tabs, Popover, Button } from 'antd';
import { useCallback } from 'react';
import store from '@/store';
import { EmojiPicker } from '../EmojiPicker';
import { DocIcon } from '../DocIcon';
import { MyIcon } from '../MyIcon';
import './DocIconPicker.less';

const { TabPane } = Tabs;

export function DocIconPicker() {
  const iconData = store.useSelector((state) => state.docs.editingDoc?.iconData);
  const docsDispatchers = store.useModelDispatchers('docs');

  const setEmoji = useCallback((emoji: string) => {
    docsDispatchers.updateEditingDoc({
      updator: (draft) => {
        draft.iconData = {
          type: 'emoji',
          data: emoji,
        };
      },
      updateDocTree: true,
    });
  }, []);

  const clearIcon = useCallback(() => {
    docsDispatchers.updateEditingDoc({
      updator: (draft) => {
        draft.iconData = undefined;
      },
    });
  }, []);

  return (
    <div className="DocIconPicker">
      <Popover
        trigger="click"
        placement="bottomLeft"
        arrowPointAtCenter
        content={
          <div className="DocIconPickerPanel">
            <Tabs
              defaultActiveKey="emoji"
              tabBarExtraContent={{
                right: (
                  <div className="iconButton bgGray" onClick={clearIcon}>
                    <MyIcon type="icon-delete" />
                  </div>
                ),
              }}
            >
              <TabPane tab="表情" key="emoji">
                <EmojiPicker
                  onChange={setEmoji}
                />
              </TabPane>
              <TabPane tab="控件" key="widget">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="图片" key="image">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </div>
        }
      >
        {iconData ? (
          <div className="DocIconPicker__icon">
            <DocIcon data={iconData} size={70} />
          </div>
        ) : (
          <Button
            icon={<MyIcon type="icon-smile" />}
            type="dashed"
          >
            设置图标
          </Button>
        )}
      </Popover >
    </div >
  );
}
