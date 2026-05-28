import { useState } from 'react'
import useWindowSize from '@/hooks/useWindowSize'
import ChapterListLink from '@/components/ChapterListLink'

import ExpandMoreIcon from '@/assets/expand_more.svg'
import MenuIcon from '@/assets/menu.svg'
import MenuCloseIcon from '@/assets/menu_close.svg'

import './ChapterList.styles.css'

export default function ChapterList({ length, noCollapse }: { length: number; noCollapse: boolean }) {
    const { width } = useWindowSize()

    const isTablet = width > 768 && width < 1024

    const [tabClosed, setTabClosed] = useState(false)
    const isOpenTab = noCollapse || !isTablet || !tabClosed

    const [open, setOpen] = useState(false)
    const isOpen = noCollapse || open || width > 1024

    const handleClick = () => {
        if (noCollapse) return
        setOpen(prev => !prev)
    }

    const handleClickTab = () => {
        setTabClosed(prev => !prev)
    }

    return (
        <div className='wrapper'>
            {!noCollapse && isTablet && (
                <img
                    onClick={handleClickTab}
                    className='icon-tab'
                    src={isOpenTab ? MenuCloseIcon : MenuIcon}
                    alt='icon'
                />
            )}
            <div className={isOpenTab ? 'chapter-list open' : 'chapter-list'}>
                <div onClick={handleClick} className='header'>
                    <span>Liste des chapitres</span>
                    {!noCollapse && (
                        <img className='icon' src={ExpandMoreIcon} alt='icon' />
                    )}
                </div>
                <ul className={isOpen ? 'content open' : 'content'}>
                    {new Array(length).fill(0).map((_, i) => (
                        <ChapterListLink index={i} key={i} />
                    ))}
                </ul>
            </div>
        </div>
    )
}