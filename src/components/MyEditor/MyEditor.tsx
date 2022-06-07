import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import {
  createEditor,
  Descendant,
} from 'slate';
import { MyLeaf } from './MyLeaf';
import { MyElement } from './MyElement';
import { CustomEditor } from '@/slate';
import { MyHoveringToolbar } from './MyHoveringToolbar';
import './MyEditor.less';


export interface MyEditorRef {
  setContent: (content: string) => void;
}

export interface MyEditorProps {
  placeholder?: string;
}

// export const EMPTY_CONTENT: Descendant[] = [{ type: 'paragraph', children: [{ text: '' }] }];
export const EMPTY_CONTENT: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      { text: '外星文明的信号确实隐藏在宇宙微波背景辐射中，但是，原因并不是外星文明有保障自己生存和扩张的复杂阴谋，而是非常简单朴素的原因：通信效率。' },
    ],
  }];

export const MyEditor = forwardRef(({
  placeholder = '请输入内容…',
}: MyEditorProps, ref) => {
  const editor = useMemo(() => withReact(createEditor() as CustomEditor), []);

  const [initialValue, setInitialValue] = useState<Descendant[]>(EMPTY_CONTENT);
  useImperativeHandle(ref, () => ({
    setContent: (content?: Descendant[] | undefined) => {
      if (content) {
        editor.setValue(content);
        // setInitialValue(content);
        // console.log('setContent', content);
      }
    },
  }));

  return (
    <div className="MyEditor">
      <Slate editor={editor} value={initialValue}>
        <MyHoveringToolbar />
        <Editable
          // placeholder={placeholder}
          renderLeaf={(props) => <MyLeaf {...props} />}
          renderElement={(props) => <MyElement {...props} />}
        />
      </Slate>
    </div>
  );
});
