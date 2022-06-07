import { HeadingElement } from '@/slate';
import type { MyElementProps } from '../MyElement';
import './Heading.less';

export function Heading({ children, element }: MyElementProps) {
  return (
    <div className={`Heading${(element as HeadingElement).level}`}>
      {children}
    </div>
  );
}
