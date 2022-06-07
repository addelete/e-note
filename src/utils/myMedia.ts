import moment from 'moment';
import { ArrayBuffer } from 'spark-md5';
import { DB } from './db';


export class MyMedia {
  static async downloadAndSaveImage(url: string): Promise<string> {
    const res = await fetch(url);
    const data = await res.arrayBuffer();
    const spark = new ArrayBuffer();
    spark.append(data);
    const id = spark.end(false);
    const media = await DB.getMedia(`media:${id}`);
    if (!media) {
      const blob = new Blob([data]);
      const _url = window.URL.createObjectURL(blob);
      const { width, height } = await MyMedia.getImageDimensions(_url);
      await DB.setMedia(`media:${id}`, {
        type: 'image',
        width,
        height,
        blob,
      });

      const medias = (await DB.getItem<MediaMeta[]>('medias')) || [];
      medias.unshift({
        type: 'image',
        id,
        width,
        height,
        createdAt: (moment() as moment.Moment).toLocaleString(),
      });
      await DB.setItem('medias', medias);
    }
    return id;
  }

  static async getImage(id: string) {
    const image = await DB.getMedia(`media:${id}`);
    if (image) {
      const url = window.URL.createObjectURL(image.blob);
      return {
        url,
        width: image.width,
        height: image.height,
      };
    } else {
      return null;
    }
  }

  static async getImageDimensions(url: string): Promise<{
    width: number;
    height: number;
  }> {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = url;
      image.onload = function () {
        resolve({
          width: image.width,
          height: image.height,
        });
      };
    });
  }
}
