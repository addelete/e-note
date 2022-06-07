import { Button } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { pexels } from '@/utils/pexels';
import { MyMedia } from '@/utils/myMedia';
import { MyIcon } from '../MyIcon';
import './DocCoverSelect.less';
import store from '@/store';


const DocCoverSelect = () => {
  const cover = store.useSelector((state) => state.docs.editingDoc?.cover);
  const docsDispatchers = store.useModelDispatchers('docs');

  const [isAdjusting, setIsAdjusting] = useState(false);
  const [coverViewWidth, setCoverViewWidth] = useState(window.innerWidth - 300);
  const [movePositionY, setMovePositionY] = useState(0);
  const [genCoverLoading, setGenCoverLoading] = useState(false);

  const mouseDown = useRef<boolean>(false);
  const mouseMoveY = useRef<number>(0);
  const coverNode: React.LegacyRef<HTMLDivElement> = useRef(null);

  const [coverImage, setCoverImage] = useState<{
    url: string;
    height: number;
    width: number;
  }>();


  useEffect(() => {
    (async () => {
      if (cover?.mediaId) {
        const _coverImage = await MyMedia.getImage(cover.mediaId);
        setCoverImage(_coverImage || undefined);
      } else {
        setCoverImage(undefined);
      }
    })();
  }, [cover?.mediaId]);

  useEffect(() => {
    const calcCoverViewWidth = () => {
      setTimeout(() => {
        if (coverNode.current) {
          setCoverViewWidth(coverNode.current.getBoundingClientRect().width);
        }
      }, 100);
    };
    window.addEventListener('resize', calcCoverViewWidth);
    calcCoverViewWidth();
    return () => window.removeEventListener('resize', calcCoverViewWidth);
  }, []);

  const bgStyle = useMemo<React.CSSProperties | undefined>(() => {
    if (cover && coverImage) {
      const positionY = Math.min(100, Math.max(0, (cover.positionY + movePositionY) * 100));
      return {
        backgroundImage: `url('${coverImage.url}')`,
        backgroundPositionY: `${positionY.toFixed(2)}%`,
      };
    } else {
      return undefined;
    }
  }, [cover, coverImage, movePositionY]);

  const coverViewHeight = useMemo(() => {
    if (coverImage) {
      return coverViewWidth * coverImage.height / coverImage.width;
    } else {
      return 100;
    }
  }, [
    coverImage, coverViewWidth,
  ]);

  const setCover = useCallback((mediaId: string, positionY = 0.2) => {
    docsDispatchers.updateEditingDoc({
      updator: (draft) => {
        draft.cover = {
          mediaId,
          positionY,
        };
      },
    });
  }, []);

  const genCover = useCallback(async () => {
    setGenCoverLoading(true);
    const { url } = await pexels.genCoverPhoto();
    const id = await MyMedia.downloadAndSaveImage(url);
    setCover(id);
    setGenCoverLoading(false);
  }, []);

  const moveCover = useCallback((e: any) => {
    if (mouseDown.current) {
      mouseMoveY.current -= e.movementY * 1.6;
      setMovePositionY(mouseMoveY.current / coverViewHeight);
    }
  }, [coverViewHeight]);

  const saveAdjust = useCallback(() => {
    if (cover) {
      docsDispatchers.updateEditingDoc({
        updator: (draft) => {
          if (draft.cover) {
            draft.cover.positionY = Math.min(1, Math.max(0, cover.positionY + movePositionY));
          }
        },
      });
      mouseMoveY.current = 0;
      setMovePositionY(0);
      setIsAdjusting(false);
    }
  }, [cover, movePositionY]);

  const cancelAdjust = useCallback(() => {
    mouseMoveY.current = 0;
    setMovePositionY(0);
    setIsAdjusting(false);
  }, []);

  const removeCover = useCallback(() => {
    docsDispatchers.updateEditingDoc({
      updator: (draft) => {
        draft.cover = undefined;
      },
    });
  }, []);

  const exist = useMemo(() => !!cover, [cover]);

  return (
    <div className="DocCoverSelect" ref={coverNode}>
      {exist ? (
        <div className={clsx('DocCoverSelect__exist', { showButtons: isAdjusting })} style={bgStyle}>
          {isAdjusting ? (
            <div
              className="DocCoverSelect__exist__adjustingBox"
              onMouseMove={moveCover}
              onMouseDown={() => {
                mouseDown.current = true;
              }}
              onMouseUp={() => {
                mouseDown.current = false;
              }}
              onMouseLeave={() => {
                mouseDown.current = false;
              }}
            ><span className="tips">上下拖动图片以调整位置</span>
            </div>
          ) : null}
          <div className="DocCoverSelect__exist__buttons">
            {isAdjusting ? (
              <Button.Group>
                <Button size="small" onClick={saveAdjust}>保存</Button>
                <Button size="small" onClick={cancelAdjust}>取消</Button>
              </Button.Group>
            ) : (
              <Button.Group>
                <Button size="small" >更换</Button>
                <Button size="small" onClick={() => setIsAdjusting(true)}>调整</Button>
                <Button size="small" onClick={removeCover}>移除</Button>
              </Button.Group>
            )}
          </div>
        </div>
      ) : (
        <div className="DocCoverSelect__empty">
          <Button
            className="DocCoverSelect__empty__button"
            type="dashed"
            icon={<MyIcon type="icon-image" />}
            onClick={genCover}
            loading={genCoverLoading}
          >设置题图
          </Button>
        </div>
      )}
    </div>
  );
};

export { DocCoverSelect };
