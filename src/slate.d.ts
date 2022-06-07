// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
// import { HistoryEditor } from 'slate-history';

export type CustomEditor = BaseEditor & ReactEditor;

export interface ParagraphElement {
  type: 'paragraph';
  children: CustomText[];
}

export interface HeadingElement {
  type: 'heading';
  level: number;
  children: CustomText[];
}

export interface BlockquoteElement {
  type: 'blockquote';
  children: CustomText[];
}

export interface UnorderedListElement {
  type: 'unorderedList';
  children: CustomText[];
}

export interface OrderedListElement {
  type: 'orderedList';
  children: CustomText[];
}

export interface CodeElement {
  type: 'code';
  language: string;
  children: CustomText[];
}

export interface NoticeElement {
  type: 'notice';
  children: CustomText[];
}

export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | BlockquoteElement
  | UnorderedListElement
  | OrderedListElement
  | CodeElement
  | NoticeElement;

export interface FormattedText {
  text: string;
  bold?: true;
  italic?: true;
  code?: true;
  underline?: true;
  strikethrough?: true;
  superscript?: true;
  subscript?: true;
  color?: string;
  backgroundColor?: string;
}

export type CustomText = FormattedText;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
