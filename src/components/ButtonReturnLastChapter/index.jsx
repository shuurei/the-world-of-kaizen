import { NavLink } from 'react-router-dom'
import useLocalStorage from '@/hooks/useLocalStorage'
import './ButtonReturnLastChapter.styles.css'
export default function ButtonReturnLastChapter() {
    const { getItem } = useLocalStorage('last_chapter');

    const handleClick = () => {
        document.querySelector('main').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    };

    return (
        <NavLink onClick={handleClick} to={`/story/${getItem() === 0 ? 'prologue' : `chapter_${getItem()}`}`} className='button-last-chapter'>Continuer à lire le chapitre - #{getItem()}</NavLink>
    )
}
