import { useEffect } from 'react';
import { SideTree } from '@/components/SideTree';
import { DocEditor } from '@/components/DocEditor';
import { DocHeader } from '@/components/DocHeader';
import { SideHeader } from '@/components/SideHeader';
import { SideTools } from '@/components/SideTools';
import { DocInfo } from '@/components/DocInfo/DocInfo';
import clsx from 'clsx';
import './index.less';
import store from '@/store';
import { SideFooter } from '@/components/SideFooter/SideFooter';
import { DocTitle } from '@/components/DocTitle';


export default function IndexPage() {
  const collapsed = store.useSelector((state) => state.preferences.layout.collapsed);
  const hasEditingDoc = store.useSelector((state) => !!state.docs.editingDoc);
  const { initDocTreeAndEditingDocFromDB } = store.useModelDispatchers('docs');
  const { initPreferencesFromDB } = store.useModelDispatchers('preferences');

  useEffect(() => {
    initPreferencesFromDB();
    initDocTreeAndEditingDocFromDB();
  }, []);

  return (
    <div className={clsx('IndexPage', { collapsed })}>
      <div className="IndexPage__sidebar" data-tauri-drag-region>
        <SideHeader />
        <SideTools />
        <SideTree />
        <SideFooter />
      </div>
      <div className="IndexPage__main">
        {hasEditingDoc ? (<DocHeader />) : null}
        {hasEditingDoc ? (
          <div className="IndexPage__main__scrollView">
            <DocInfo />
            <DocTitle />
            <DocEditor />
          </div>
        ) : null}
      </div>
    </div>
  );
}
