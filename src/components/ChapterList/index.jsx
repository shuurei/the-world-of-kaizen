import { useState, useEffect } from 'react';
import useWindowSize from '@/hooks/useWindowSize'
import ChapterListLink from '@/components/ChapterListLink'

import ExpandMoreIcon from '@/assets/expand_more.svg';
import MenuIcon from '@/assets/menu.svg';
import MenuCloseIcon from '@/assets/menu_close.svg';

import './ChapterList.styles.css'
export default function ChapterList({ length, noCollapse }) {
    const { width } = useWindowSize();
    const [isOpenTab, setIsOpenTab] = useState(noCollapse ?? (width <= 768 || !(width > 768 && width < 1024)));
    const [isOpen, setIsOpen] = useState(noCollapse ?? width > 768);

    useEffect(() => {
        if ((width < 768 || width > 1024) && !isOpenTab) {
            setIsOpenTab(() => {
                if (isOpen) setIsOpen(() => width > 1024)
                return true
            });
        }

        if (noCollapse && !isOpenTab) {
            setIsOpenTab(() => {
                if (isOpen) setIsOpen(() => true)
                return true
            });
        }
    }, [width]);

    const handleClick = () => {
        if (noCollapse) return;
        setIsOpen(prev => !prev);
    };

    const handleClickTab = () => {
        setIsOpenTab(prev => !prev);
    };

    return (
        <div className='wrapper'>
            {
                !noCollapse && ((width > 768) && (width < 1024)) && (<img onClick={handleClickTab} className='icon-tab' src={isOpenTab ? MenuCloseIcon : MenuIcon} alt='icon'></img>)
            }
            <div className={isOpenTab ? 'chapter-list open' : 'chapter-list'}>
                <div onClick={handleClick} className='header'>
                    <span>Liste des chapitres</span>
                    {
                        !noCollapse && (
                            <img className='icon' src={ExpandMoreIcon} alt='icon' />
                        )
                    }
                </div>
                <ul className={isOpen ? 'content open' : 'content'}>
                    {
                        new Array(length).fill(0).map((_, i)=> <ChapterListLink index={i} key={i} />)
                    }
                </ul>
            </div>
        </div>
    )
}