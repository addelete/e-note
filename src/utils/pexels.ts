import { message } from 'antd';
import { DB } from './db';

const genCoverUrl = '/collections/xnbve91';

class Pexels {
  apiKey?: string;
  natureTotal = 0;

  constructor() {
    this.loadApiKey();
  }

  async loadApiKey() {
    this.apiKey = await DB.getItem<string>('config:pexels:apiKey');

    if (!this.apiKey) {
      if (process.env.NODE_ENV === 'development') {
        const env = await import('../../.env');
        this.apiKey = env.default.pexels.apiKey;
        await DB.setItem('config:pexels:apiKey', this.apiKey);
      }
    }
    const data = await this.http(genCoverUrl);
    this.natureTotal = data.total_results / data.per_page;
  }

  checkApiKey() {
    if (!this.apiKey) {
      message.warning('请先设置Pexels服务的API KEY');
      throw new Error('Pexels API KEY not found');
    }
  }

  async http(url: string, options?: any) {
    this.checkApiKey();
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', this.apiKey as string);
    const res = await fetch(`https://api.pexels.com/v1${url}`, {
      headers,
      ...options,
    });
    const data = await res.json();
    return data;
  }

  async genCoverPhoto() {
    const data = await this.http(`${genCoverUrl}?page=${Math.floor(Math.random() * this.natureTotal)}`);
    const index = Math.floor(Math.random() * data.media.length);
    return {
      url: data.media[index].src.large2x,
    };
  }
}

export const pexels = new Pexels();
