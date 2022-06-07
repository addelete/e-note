import store from '@/store';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import './DocTitle.less';

export function DocTitle() {
  const id = store.useSelector((state) => state.docs.editingDoc?.id);
  const docsDispatchers = store.useModelDispatchers('docs');

  const [_title, setTitle] = useState('');

  useEffect(() => {
    const title = store.getModelState('docs').editingDoc?.title;
    setTitle(title || '');
  }, [id]);

  const changeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    docsDispatchers.updateEditingDoc({
      updator: (draft) => {
        draft.title = newTitle;
      },
      updateDocTree: true,
    });
  };
  return (
    <div className="DocTitle">
      <Input.TextArea
        placeholder="新页面"
        value={_title}
        onChange={changeTitle}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        autoSize
      />
    </div>
  );
}
