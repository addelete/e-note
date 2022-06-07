declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.json' {
  const value: any;
  export default value;
}

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type DocIconType =
  | {
    type: 'emoji' | 'image';
    data: string;
  }
  | {
    type: 'widget';
    data: any;
  };

interface DocType {
  id: string;
  title?: string;
  iconData?: DocIconType;
  cover?: {
    mediaId: string;
    positionY: number; // 偏移比例
  };
  content?: OutputData;
}

interface DocTreeType {
  key: string;
  children: DocTree[];
  title?: string;
  iconData?: DocIconType;
}

interface DeletedDocTreeType {
  docTree: DocTreeType;
  deletedAt: number;
  parentKey: string;
}

interface MediaBlobType {
  type: 'image' | 'video';
  blob: Blob;
  width: number;
  height: number;
}

interface MediaMeta {
  type: 'image' | 'video';
  id: string;
  createdAt: string;
  width: number;
  height: number;
}

interface PreferencesType {
  layout: {
    collapsed: boolean;
    theme: 'light' | 'dark';
  };
}

declare let __TAURI__: any;

