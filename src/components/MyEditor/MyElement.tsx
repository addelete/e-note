import { useMemo } from 'react';
import { Menu, Dropdown } from 'antd';
import { Element, Path, Transforms } from 'slate';
import { useSlate, ReactEditor } from 'slate-react';
import { CustomEditor } from '@/slate';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { MyIcon } from '../MyIcon';
import { getContentRender } from './Elements';
import './MyElement.less';


const elementMenuItems: ItemType[] = [
  { key: 'copy', label: '复制', icon: <MyIcon type="icon-copy" />, className: 'MyElement__dropdown__menuItem' },
  {
    key: 'transform',
    label: '转换为',
    icon: <MyIcon type="icon-retweet" />,
    className: 'MyElement__dropdown__menuItem',
    children: [
      { key: 'transform:paragraph', label: '文本', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-text" /> },
      { key: 'transform:blockquote', label: '引用', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-quote" /> },
      { key: 'transform:header-1', label: '主标题', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-header-1" /> },
      { key: 'transform:header-2', label: '大标题', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-header-2" /> },
      { key: 'transform:header-3', label: '中标题', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-header-3" /> },
      { key: 'transform:header-4', label: '小标题', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-header-4" /> },
      { key: 'transform:unorderedList', label: '无序列表', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-unorderedlist" /> },
      { key: 'transform:orderedList', label: '有序列表', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-orderedlist" /> },
      { key: 'transform:todoList', label: '待办列表', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-todo-list" /> },
      { key: 'transform:code', label: '代码', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-code" /> },
      { key: 'transform:notice', label: '滚动公告', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-notice" /> },
    ],
  },
  { key: 'color', label: '颜色', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-font-colors" /> },
  { key: 'align', label: '对齐', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-align-center" /> },
  {
    type: 'divider',
  },
  { key: 'delete', label: '删除', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-delete" /> },
];

const emptyElementMenuItems: ItemType[] = [
  { key: 'add:paragraph', label: '文本', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-text" /> },
  { key: 'add:blockquote', label: '引用', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-quote" /> },
  {
    key: 'header',
    label: '标题',
    className: 'MyElement__dropdown__menuItem',
    icon: <MyIcon type="icon-header" />,
    children: [
      { key: 'add:header-1', label: '主标题', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-header-1" /> },
      { key: 'add:header-2', label: '大标题', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-header-2" /> },
      { key: 'add:header-3', label: '中标题', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-header-3" /> },
      { key: 'add:header-4', label: '小标题', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-header-4" /> },
    ],
  },
  {
    key: 'list',
    label: '列表',
    className: 'MyElement__dropdown__menuItem',
    icon: <MyIcon type="icon-unorderedlist" />,
    children: [
      { key: 'add:unorderedList', label: '无序列表', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-unorderedlist" /> },
      { key: 'add:orderedList', label: '有序列表', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-orderedlist" /> },
      { key: 'add:todoList', label: '待办列表', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-todo-list" /> },
    ],
  },
  { key: 'add:code', label: '代码', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-code" /> },
  { key: 'add:notice', label: '滚动公告', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-notice" /> },
  { type: 'divider' },
  { key: 'add:image', label: '图片', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-image" /> },
  { key: 'add:video', label: '视频', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-video" /> },
  { key: 'add:radio', label: '音频', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-radio" /> },
  {
    key: 'web',
    label: '网络媒体',
    className: 'MyElement__dropdown__menuItem',
    icon: <MyIcon type="icon-play-circle" />,
    children: [
      { key: 'add:music163', label: '网易云音乐', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-music163" /> },
      { key: 'add:bilibili', label: 'bilibili', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-bilibili" /> },
      { key: 'add:qqvideo', label: '腾讯视频', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-qqvideo" /> },
      { key: 'add:youku', label: '优酷视频', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-youku" /> },
      { key: 'add:iqiyi', label: '爱奇艺视频', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-iqiyi" /> },
      { key: 'add:ixigua', label: '西瓜视频', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-ixigua" /> },
      { key: 'add:ifream', label: '嵌入内容', className: 'MyElement__dropdown__menuItem', icon: <MyIcon type="icon-code" /> },
    ],
  },
];

function transformToHeader(editor: CustomEditor, path: Path, level: number, element: Element): void {
  Transforms.setNodes(
    editor,
    { type: 'heading', level, children: element.children },
    { at: path },
  );
}

export interface MyElementProps {
  children: React.ReactNode;
  element: Element;
}

const getPopupContainer = () => {
  let ele = document.getElementById('my-element-dropdown-container');
  if (!ele) {
    ele = document.createElement('div');
    ele.id = 'my-element-dropdown-container';
    document.body.appendChild(ele);
  }
  return ele;
};

export const MyElement = ({ children, element }: MyElementProps) => {
  const isEmpty = !(element.children[0].text);
  const editor = useSlate() as CustomEditor;

  const handleClickMenu = ({ key }: MenuInfo) => {
    const path = ReactEditor.findPath(editor, element);
    switch (key) {
      case 'copy':
        console.log('TODO: copy');
        break;
      case 'transform:paragraph':
        Transforms.setNodes(
          editor,
          { type: 'paragraph', children: element.children },
          { at: path },
        );
        break;
      case 'transform:blockquote':
        Transforms.setNodes(
          editor,
          { type: 'blockquote', children: element.children },
          { at: path },
        );
        break;
      case 'transform:header-1':
        transformToHeader(editor, path, 1, element);
        break;
      case 'transform:header-2':
        transformToHeader(editor, path, 2, element);
        break;
      case 'transform:header-3':
        transformToHeader(editor, path, 3, element);
        break;
      case 'transform:header-4':
        transformToHeader(editor, path, 4, element);
        break;
      case 'transform:unorderedList':
        Transforms.setNodes(
          editor,
          { type: 'unorderedList', children: element.children },
          { at: path },
        );
        break;

      default:
    }
  };

  const ContentRender = useMemo(() => {
    return getContentRender(element.type);
  }, [element.type]);

  return (
    <div className="MyElement" >
      <div className="MyElement__buttons" contentEditable={false}>
        <Dropdown
          className="MyElement__dropdown"
          overlay={(
            <Menu
              items={isEmpty ? emptyElementMenuItems : elementMenuItems}
              onClick={handleClickMenu}
            />
          )}
          placement="bottomLeft"
          arrow={{ pointAtCenter: true }}
          trigger={['click']}
          getPopupContainer={() => getPopupContainer()}
        >
          <div className="MyElement__iconButton">
            <MyIcon type={isEmpty ? 'icon-plus' : 'icon-menu-dots'} />
          </div>
        </Dropdown>
      </div>
      {ContentRender ? (
        <ContentRender element={element}>
          {children}
        </ContentRender>
      ) : children}
    </div>
  );
};
