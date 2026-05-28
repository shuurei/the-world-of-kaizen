import { NavLink } from 'react-router-dom'
import useLocalStorage from '@/hooks/useLocalStorage'
import './ButtonNextChapter.styles.css'
export default function ButtonNextChapter({ chapter_id }) {
    const { setItem, getItem } = useLocalStorage('chapters_readed');
    const lastChapter = useLocalStorage('last_chapter');

    const handleClick = () => {
        if (!getItem()) setItem(() => []);
        if (!getItem().includes(chapter_id - 1)) setItem((prev) => [...new Set(prev), chapter_id - 1])
        lastChapter.setItem(() => chapter_id);
        document.querySelector('main').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    }

    return (
        <NavLink onClick={handleClick} to={`/story/chapter_${chapter_id}`} className='button-next-chapter'>Lire le prochain chapitre - #{chapter_id}</NavLink>
    )
}
