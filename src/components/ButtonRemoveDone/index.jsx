import useLocalStorage from '@/hooks/useLocalStorage';

import RemoveDoneIcon from '@/assets/remove_done.svg'

import './ButtonRemoveDone.styles.css';
export default function ButtonRemoveDone({ chapter_id, onRemove }) {
    const { setItem } = useLocalStorage('chapters_readed');
    const lastChapter = useLocalStorage('last_chapter');

    const handleClick = () => {
        setItem(prev => {
            if (lastChapter.getItem() == chapter_id) lastChapter.clear(); 
            return prev.filter(x=>x!=chapter_id)
        });
        onRemove();
    };

    return (
        <button onClick={handleClick} className='button-remove-done'>
            <img src={RemoveDoneIcon} alt='remove done icon' />
        </button>
    );
}