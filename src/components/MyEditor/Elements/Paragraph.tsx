
import type { MyElementProps } from '../MyElement';

export function Paragraph({ children }: MyElementProps) {
  return (
    <div className="Paragraph">
      {children}
    </div>
  );
}
