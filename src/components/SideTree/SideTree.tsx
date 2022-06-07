
import store from '@/store';
import { Tooltip, Tree, Menu, Dropdown, Typography } from 'antd';
import { useCallback, useState } from 'react';
import { DocIcon } from '../DocIcon';
import { MyIcon } from '../MyIcon';
import './SideTree.less';


export function SideTree() {
  const docTree = store.useSelector((state) => state.docs.docTree);
  const editingDocKey = store.useSelector((state) => state.docs.editingDoc?.id);
  const docsDispatchers = store.useModelDispatchers('docs');

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const onSelect = useCallback((keys: React.Key[], info: any) => {
    docsDispatchers.activeDoc(info.node.key);
  }, []);

  const onExpand = (newExpandedKeys: string[]) => {
    setExpandedKeys(newExpandedKeys);
  };

  const addDoc = useCallback(async (parentId = 'ROOT') => {
    await docsDispatchers.createDoc(parentId);
  }, []);

  const activeDoc = useCallback(async (parentId = 'ROOT') => {
    await docsDispatchers.activeDoc(parentId);
  }, []);

  const deleteDoc = useCallback(async (docId) => {
    await docsDispatchers.deleteDoc(docId);
  }, []);

  const renderMenus = (docId: string) => (
    <Menu
      items={[
        { key: 'add', label: '新建子页面', icon: <MyIcon type="icon-plus" /> },
        { key: 'copy', label: '复制为新页面', icon: <MyIcon type="icon-copy" /> },
        { type: 'divider' },
        { key: 'open', label: '打开到右侧', icon: <MyIcon type="icon-open" /> },
        { key: 'rename', label: '重命名', icon: <MyIcon type="icon-edit-square" /> },
        { key: 'move', label: '移动到页面下', icon: <MyIcon type="icon-tree" /> },
        { key: 'insert', label: '嵌入到页面内', icon: <MyIcon type="icon-indent" /> },
        { type: 'divider' },
        { key: 'discard', label: '丢入废纸篓', icon: <MyIcon type="icon-delete" /> },
      ]}
      onClick={async (e) => {
        e.domEvent.stopPropagation();
        switch (e.key) {
          case 'add':
            await addDoc(docId);
            setExpandedKeys([...expandedKeys, docId]);
            break;
          case 'copy':
            // copyDoc(docId);
            break;
          case 'open':
            activeDoc(docId);
            break;
          case 'discard':
            deleteDoc(docId);
            break;
          default:
            break;
        }
      }}
    />
  );

  return (
    <div className="SideTree">
      <div className="SideTree__header">
        <div className="SideTree__header__title">所有页面</div>
        <div className="SideTree__header__buttons">
          <Tooltip title="新增页面" placement="bottomRight">
            <div className="iconButton" onClick={() => addDoc('ROOT')}>
              <MyIcon type="icon-plus" />
            </div>
          </Tooltip>
          <Tooltip title="折叠到顶层" placement="bottomRight">
            <div className="iconButton">
              <MyIcon type="icon-batchfolding" />
            </div>
          </Tooltip>
        </div>
      </div>

      <Tree.DirectoryTree
        selectedKeys={editingDocKey ? [editingDocKey] : []}
        expandAction={false}
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        treeData={docTree.children}
        blockNode
        titleRender={(node) => (
          <Dropdown
            overlay={renderMenus(node.key as string)}
            trigger={['contextMenu']}
          >
            <Typography.Text ellipsis>{node.title || '新页面'}</Typography.Text>
          </Dropdown>
        )}
        icon={({ data, expanded }: any) => {
          if (data.iconData) {
            return <DocIcon data={data.iconData} />;
          }
          if (!data.children || data.children.length === 0) {
            return <MyIcon type="icon-document" />;
          }
          if (expanded) {
            return <MyIcon type="icon-opened_folder" />;
          }
          return <MyIcon type="icon-folder" />;
        }}
      />
    </div>
  );
}
