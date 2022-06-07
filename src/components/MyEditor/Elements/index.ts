import upperFirst from 'lodash/upperFirst';
import React from 'react';
import type { MyElementProps } from '../MyElement';
import { Paragraph } from './Paragraph';
import { Heading } from './Heading';
import { Blockquote } from './Blockquote';


export function getContentRender(type: string): React.FC<MyElementProps> | null {
  return {
    Paragraph,
    Heading,
    Blockquote,
  }[upperFirst(type)] as React.FC<MyElementProps> || null;
}
