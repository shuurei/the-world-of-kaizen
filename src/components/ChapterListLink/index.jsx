import { useState, useEffect } from 'react'
import { NavLink, useLocation} from 'react-router-dom'
import useLocalStorage from '@/hooks/useLocalStorage'
import './ChapterListLink.styles.css'
export default function ChapterListLink({ index }) {
    const { pathname } = useLocation();
    const lastChapter = useLocalStorage('last_chapter');
    const { getItem, setItem } = useLocalStorage('chapters_readed');
    const [isReaded, setIsReaded] = useState(false);


    const handleClick = () => {
        if (!getItem()) setItem(() => []);
        if (!getItem()?.includes(index)) setIsReaded(() => {
            setItem(prev => [...new Set(prev), index]);
            return true
        });
        lastChapter.setItem(() => index);
        document.querySelector('main').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    }

    useEffect(() => {
        if (!getItem()) setItem(() => []);
        setIsReaded(() => getItem()?.includes(index));
    }, [pathname]);

    return (
        <NavLink onClick={handleClick} className={isReaded ? 'chapter-list-link readed' : 'chapter-list-link'} to={`/story/${(index == 0) ? 'prologue' : `chapter_${index}`}`}>{(index == 0) ? 'PROLOGUE' : `CHAPITRE ${index}`}</NavLink>
    )
}