// import { invoke } from '@tauri-apps/api/tauri';
import localforage from 'localforage';

export class DB {
  static async setItem(key: string, value: any) {
    // return invoke('set_item', { key, value: JSON.stringify({ time: new Date().getTime(), value }) });
    console.log('setItem', key, value);
    await localforage.setItem(key, { time: new Date().getTime(), value });
    return true;
  }

  static async getItem<T>(key: string, defaultValue: any = null): Promise<T> {
    // try {
    //   const jsonValue = await invoke('get_item', { key }) as string;
    //   const value = JSON.parse(jsonValue).value;
    //   return value;
    // } catch (err) {
    //   return Promise.resolve(defaultValue);
    // }

    return (
      (((await localforage.getItem(key)) as any) || {}).value || defaultValue
    );
  }

  static async getMedia(id: string): Promise<MediaBlobType | null> {
    return await localforage.getItem(id);
  }

  static async setMedia(id: string, value: MediaBlobType) {
    return await localforage.setItem(id, value);
  }
}
