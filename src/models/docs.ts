import { DB } from '@/utils/db';
import store from '@/store';
import { genIdV1 } from '@/utils/genId';

export interface DocsModelState {
  docTree: DocTreeType;
  deletedDocTrees: DeletedDocTreeType[];
  editingDoc: DocType | null;
}

const getFromTreeById = (docTree: DocTreeType, docId: string): DocTreeType | null => {
  if (docTree.key === docId) {
    return docTree;
  }
  for (let i = 0; i < docTree.children.length; i++) {
    const _docTree = getFromTreeById(docTree.children[i], docId);
    if (_docTree) {
      return _docTree;
    }
  }
  return null;
};

const getParentFromTreeById = (docTree: DocTreeType, docId: string): DocTreeType | null => {
  const result = docTree.children.find((child) => child.key === docId);
  if (result) {
    return docTree;
  }
  for (let i = 0; i < docTree.children.length; i++) {
    const _docTree = getParentFromTreeById(docTree.children[i], docId);
    if (_docTree) {
      return _docTree;
    }
  }
  return null;
};

const DEFAULT_MODEL_STATE: DocsModelState = {
  docTree: {
    key: 'ROOT',
    children: [],
  },
  deletedDocTrees: [],
  editingDoc: null,
};

export default {
  state: DEFAULT_MODEL_STATE,
  reducers: {
    immerUpdateState(draft: DocsModelState, payload: (draft: DocsModelState) => void) {
      return payload(draft);
    },
  },
  effects: () => ({
    async initDocTreeAndEditingDocFromDB() {
      const docTree = await DB.getItem<DocTreeType>('docTree', DEFAULT_MODEL_STATE.docTree);
      this.setState({ docTree });
      const newEditingDocId = docTree.children.find((child) => !child.deletedAt)?.key;
      this.activeDoc(newEditingDocId);
      const deletedDocTrees = await DB.getItem<DeletedDocTreeType[]>(
        'deletedDocTrees',
        DEFAULT_MODEL_STATE.deletedDocTrees,
      );
      this.setState({ deletedDocTrees });
    },
    async activeDoc(docId: string) {
      const editingDoc = docId ? await DB.getItem<DocType>(`doc:${docId}`, { id: docId }) : null;
      this.setState({ editingDoc });
    },

    async createDoc(parentId: string) {
      const docTree = {
        key: genIdV1(),
        children: [],
      };
      this.immerUpdateState((draft: DocsModelState) => {
        const parent = getFromTreeById(draft.docTree, parentId) as DocTreeType;
        parent.children.push(docTree);
        draft.editingDoc = { id: docTree.key };
      });
      const docsState = store.getModelState('docs');
      await DB.setItem('docTree', docsState.docTree);
      await DB.setItem(`doc:${docTree.key}`, docsState.editingDoc);
    },

    async deleteDoc(docId: string) {
      this.immerUpdateState((draft: DocsModelState) => {
        const parentDocTree = getParentFromTreeById(draft.docTree, docId) as DocTreeType;
        const index = parentDocTree.children.findIndex((child) => child.key === docId);
        const currentDocTree = parentDocTree.children[index] as DocTreeType;
        const deletedDoc = {
          docTree: currentDocTree,
          parentKey: parentDocTree.key,
          deletedAt: Date.now(),
        };
        draft.deletedDocTrees.push(deletedDoc);
        parentDocTree.children.splice(index, 1);
      });
      const docsState = store.getModelState('docs');
      await DB.setItem('docTree', docsState.docTree);
      await DB.setItem('deletedDocTrees', docsState.deletedDocTrees);
      if (docsState.editingDoc && docsState.editingDoc.id === docId) {
        const newEditingDocId = docsState.docTree.children.find((child) => !child.deletedAt)?.key;
        this.activeDoc(newEditingDocId || '');
      }
    },

    async updateEditingDoc({
      updator,
      updateDocTree = false,
    }: {
      updator: (draft: DocType) => void;
      updateDocTree?: boolean;
    }) {
      this.immerUpdateState((draft: DocsModelState) => {
        if (draft.editingDoc) {
          updator(draft.editingDoc as DocType);
        }
      });
      {
        const docsState = store.getModelState('docs');
        await DB.setItem(`doc:${(docsState.editingDoc as DocType).id}`, docsState.editingDoc);
      }
      if (updateDocTree) {
        {
          const docsState = store.getModelState('docs');
          this.immerUpdateState((draft: DocsModelState) => {
            const parent = getFromTreeById(draft.docTree, (docsState.editingDoc as DocType).id) as DocTreeType;
            parent.title = (docsState.editingDoc as DocType).title;
            parent.iconData = (docsState.editingDoc as DocType).iconData;
          });
        }
        {
          const docsState = store.getModelState('docs');
          await DB.setItem('docTree', docsState.docTree);
        }
      }
    },
  }),
};
