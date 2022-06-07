import { useCallback, useEffect, useState } from 'react';
import { Input, Tag } from 'antd';
import lodashThrottle from 'lodash/throttle';
import emojisData from '@/assets/emoji-data.json';
import { MyIcon } from '../MyIcon';
import './EmojiPicker.less';

interface EmojiType {
  unicode: string;
  name: string;
  emoticon: string[];
  tags: string[];
}

interface EmojiPickerProps {
  onChange: (emoji: string) => void;
}


export function EmojiPicker(props: EmojiPickerProps) {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState<EmojiType | undefined>();
  const [searchResult, setSearchResult] = useState<EmojiType[]>([]);

  const onSearch = useCallback((e) => {
    setSearch(e.target.value.trim());
  }, []);

  useEffect(() => {
    lodashThrottle(() => {
      if (!search) {
        setSearchResult([]);
        return;
      }
      const result = new Set<EmojiType>();
      const isExact = /^\//.test(search);
      let emoticon = '';
      if (isExact) {
        emoticon = search.slice(1);
      }
      for (let i = 0; i < emojisData.length; i++) {
        for (let j = 0; j < emojisData[i].children.length; j++) {
          if (isExact) {
            if (emojisData[i].children[j].emoticon.includes(emoticon)) {
              setSearchResult([emojisData[i].children[j]]);
              return;
            }
          } else {
            for (let k = 0; k < emojisData[i].children[j].tags.length; k++) {
              if (emojisData[i].children[j].tags[k].includes(search)) {
                result.add(emojisData[i].children[j]);
                continue;
              }
            }
          }
        }
      }
      setSearchResult([...result]);
    }, 200)();
  }, [search]);

  const renderEmoji = useCallback((emoji: EmojiType) => {
    return (
      <div
        key={emoji.unicode}
        className="EmojiPicker__panel__group__emojis__item"
        onMouseOver={() => setActive(emoji)}
        onMouseLeave={() => setActive(undefined)}
        onClick={() => props.onChange && props.onChange(emoji.unicode)}
      >
        {emoji.unicode}
      </div>
    );
  }, [setActive, props.onChange]);


  return (
    <div className="EmojiPicker">
      <div className="EmojiPicker__search">
        <Input prefix={<MyIcon type="icon-search" />} onChange={onSearch} />
      </div>

      <div className="EmojiPicker__panel">
        {!search ? emojisData.map((group) => {
          return (
            <div className="EmojiPicker__panel__group" key={group.order}>
              <div className="EmojiPicker__panel__group__title">{group.name}</div>
              <div className="EmojiPicker__panel__group__emojis">
                {group.children.map((emoji) => renderEmoji(emoji))}
              </div>
            </div>
          );
        }) : (
          <div className="EmojiPicker__panel__group">
            <div className="EmojiPicker__panel__group__emojis">
              {searchResult.map((emoji) => renderEmoji(emoji))}
            </div>
          </div>
        )}
      </div>
      <div className="EmojiPicker__preview">
        <div className="EmojiPicker__preview__emoji">
          {active ? active.unicode : '🤣'}
        </div>
        <div className="EmojiPicker__preview__infos">
          <div className="EmojiPicker__preview__infos__name">{active ? active.name : '表情名称'}</div>
          <div className="EmojiPicker__preview__infos__emoticons">
            {active ? active.emoticon.map((item) => <Tag key={item}>{item}</Tag>) : <Tag >精确搜索：/+短码</Tag>}
          </div>
        </div>
      </div>
    </div>
  );
}
