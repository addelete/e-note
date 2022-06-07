import { CustomEditor } from '@/slate';
import { Tooltip } from 'antd';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Editor, Transforms, Text, Range } from 'slate';
import { useFocused, useSlate } from 'slate-react';
import { MyIcon } from '../MyIcon';
import './MyHoveringToolbar.less';

const toggleFormat = (editor: CustomEditor, format: string) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true },
  );
};

const isFormatActive = (editor: CustomEditor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[format] === true,
    mode: 'all',
  });
  return !!match;
};

const FormatButton = ({ format, icon, tips }) => {
  const editor = useSlate();
  return (
    <Tooltip title={tips} placement="top">
      <div
        className={clsx('formatButton', { isActive: isFormatActive(editor, format) })}
        onClick={(event) => {
          event.preventDefault();
          toggleFormat(editor, format);
        }}
      >
        {icon}
      </div>
    </Tooltip>
  );
};


export const MyHoveringToolbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useSlate();
  const inFocus = useFocused();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style');
      return;
    }

    const domSelection = window.getSelection() as Selection;
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = '1';
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight - 4}px`;
    el.style.left = `${rect.left +
      window.pageXOffset -
      el.offsetWidth / 2 +
      rect.width / 2}px`;
  });

  return ReactDOM.createPortal(
    <div ref={ref} className="MyHoveringToolbar" onMouseDown={(e) => e.preventDefault()}>
      <FormatButton format="bold" icon={<MyIcon type="icon-bold" />} tips="加粗" />
      <FormatButton format="italic" icon={<MyIcon type="icon-italic" />} tips="斜体" />
      <FormatButton format="underlined" icon={<MyIcon type="icon-underline" />} tips="下划线" />
      <FormatButton format="strikethrough" icon={<MyIcon type="icon-strikethrough" />} tips="删除线" />
      <FormatButton format="code" icon={<MyIcon type="icon-code" />} tips="行内代码" />
      <FormatButton format="superscript" icon={<MyIcon type="icon-superscript" />} tips="上标" />
      <FormatButton format="subscript" icon={<MyIcon type="icon-subscript" />} tips="下标" />
      <FormatButton format="color" icon={<MyIcon type="icon-font-colors" />} tips="颜色" />
    </div>,
    document.body,
  );
};

