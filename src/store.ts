// src/store.ts
import { createStore } from 'ice';

import docs, { DocsModelState } from './models/docs';
import preferences, { PreferencesModelState } from './models/preferences';

const store = createStore({
  docs,
  preferences,
});

export default {
  ...store,
  useSelector: (store as any).useSelector as <T>(func: (state: {
    docs: DocsModelState;
    preferences: PreferencesModelState;
  }) => T) => T,
};
