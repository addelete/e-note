import store from '@/store';
import { useEffect, useRef } from 'react';
import { MyEditor, MyEditorRef } from '../MyEditor';
import './DocEditor.less';


export function DocEditor() {
  const id = store.useSelector((state) => state.docs.editingDoc?.id);
  const docsDispatchers = store.useModelDispatchers('docs');

  const editorRef = useRef<MyEditorRef | null>(null);

  useEffect(() => {
    const content = store.getModelState('docs').editingDoc?.content;
    editorRef.current?.setContent(content);
  }, [id]);

  return (
    <div className="DocEditor">
      <MyEditor ref={editorRef} />
    </div>
  );
}

