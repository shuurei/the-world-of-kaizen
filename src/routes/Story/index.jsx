import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';

import CHAPTERS from '@/data/chapters.json'
import ChapterList from '@/components/ChapterList'
import ButtonNextChapter from '@/components/BtnNextChapter';
import useLocalStorage from '@/hooks/useLocalStorage'

import './Story.styles.css'
import ButtonReturnLastChapter from '@/components/ButtonReturnLastChapter';
import ButtonRemoveDone from '../../components/ButtonRemoveDone';

export default function Story() {
  const { chapterId } = useParams();
  let chapter = chapterId.split('_');
  chapter[0] = chapter[0].toLowerCase();
  let chapter_id = chapter[1];
  chapter_id = chapter = chapter[0] === 'prologue' ? 0 : chapter[0] === 'chapter' && chapter_id != 0 ? chapter_id : undefined;
  chapter = CHAPTERS[chapter];

  const lastChapter = useLocalStorage('last_chapter');
  const { getItem } = useLocalStorage('chapters_readed');

  const [isRemoved, setRemovedState] = useState(getItem()?.includes(+chapter_id));

  const { pathname } = useLocation();

  useEffect(() => {
    handleCheckIsRemoved()
  }, [pathname]);

  const handleCheckIsRemoved = () => {
    setRemovedState(() => getItem()?.includes(+chapter_id));
  }

  return (
    <div className='story'>
      {
        !chapter && (
          <div className='presentation'>
            <h2 className='title'>L'histoire de The World Of Kaizen</h2>        
            <p className='description'>Après s'être réveillé, Aeshki se retrouve face à un nouveau monde mystérieux, baigné dans une lumière écarlate menaçante. Guidé par une curiosité ardente pour son environnement, il se lance courageusement dans son tout premier voyage en direction d'un village baptisé Trunk. Ainsi débute son aventure, où chaque pas le rapproche de la découverte de secrets enfouis et de dangers insoupçonnés. Sa première quête ? Protéger ce village, une mission périlleuse qui le plongera au cœur de mystères insondables.</p>
          </div>
        )
      }
      {
        !!lastChapter.getItem() && (lastChapter.getItem() !== +chapter_id) && <ButtonReturnLastChapter />
      }
      <ChapterList noCollapse={!chapter} length={CHAPTERS.length} />
      {
        chapter && (
          <div className='page-content'>
            <div className='page'>
              <Markdown>{chapter.content.join('\n\n')}</Markdown>
            </div>
            <div className='btns'>
              {
                isRemoved && (
                  <ButtonRemoveDone
                    chapter_id={+chapter_id}
                    onRemove={handleCheckIsRemoved}
                  />
                )
              }
              {
                (chapter_id != (CHAPTERS.length - 1)) && (
                  <ButtonNextChapter
                    chapter_id={+chapter_id + 1}
                    focusElement='page'
                  />
                )
              }
            </div>
          </div>
        )
      }
    </div>
  )
}