import { DB } from '@/utils/db';
import store from '@/store';

export interface PreferencesModelState {
  layout: {
    collapsed: boolean;
  };
}

const DEFAULT_PREFERENCES_STATE: PreferencesModelState = {
  layout: {
    collapsed: false,
  },
};

const PreferencesModel = {
  state: DEFAULT_PREFERENCES_STATE,
  reducers: {
    immerUpdateState(draft: PreferencesModelState, payload: (draft: PreferencesModelState) => void) {
      return payload(draft);
    },
  },
  effects: () => ({
    async initPreferencesFromDB() {
      const preferences = await DB.getItem('preferences') || DEFAULT_PREFERENCES_STATE;
      this.setState(preferences);
    },
    async updatePreferences(updator: (draft: PreferencesModelState) => void) {
      this.immerUpdateState(updator);
      const preferencesState = store.getModelState('preferences');
      await DB.setItem('preferences', preferencesState);
    },
  }),
};

export default PreferencesModel;
