import type { MyElementProps } from '../MyElement';
import './Blockquote.less';

export function Blockquote({ children }: MyElementProps) {
  return (
    <div className="Blockquote">
      {children}
    </div>
  );
}
