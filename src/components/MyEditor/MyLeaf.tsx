import clsx from 'clsx';
import './MyLeaf.less';

export const MyLeaf = ({ attributes, children, leaf }) => {
  // if (leaf.bold) {
  //   // eslint-disable-next-line no-param-reassign
  //   children = <strong>{children}</strong>;
  // }

  // if (leaf.code) {
  //   children = <code>{children}</code>;
  // }

  // if (leaf.italic) {
  //   children = <em>{children}</em>;
  // }

  // if (leaf.underlined) {
  //   children = <u>{children}</u>;
  // }

  return (
    <span
      {...attributes}
      className={clsx({
        'text-bold': leaf.bold,
        'text-italic': leaf.italic,
        'text-underline': leaf.underlined,
        'text-code': leaf.code,
        'text-strikethrough': leaf.strikethrough,
        'text-superscript': leaf.superscript,
        'text-subscript': leaf.subscript,
      })}
      style={{
        color: leaf.color,
        backgroundColor: leaf.backgroundColor,
      }}
    >
      {children}
    </span>
  );
};
