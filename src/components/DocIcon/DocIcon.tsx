import './DocIcon.less';

interface DocIconProps {
  data: DocIconType;
  size?: number;
}

export function DocIcon({ data, size }: DocIconProps) {
  return (
    <div className="DocIcon">
      {data.type === 'emoji' ? (
        <div className="DocIcon__emoji" style={size ? { fontSize: size, lineHeight: 1 } : {}}>{data.data}</div>
      ) : null}
    </div>
  );
}
