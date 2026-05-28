import { useEffect, useReducer } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import useLocalStorage from '@/hooks/useLocalStorage'
import './ChapterListLink.styles.css'

export default function ChapterListLink({ index }: { index: number }) {
    const { pathname } = useLocation()
    const lastChapter = useLocalStorage('last_chapter')
    const { getItem, setItem } = useLocalStorage('chapters_readed')

    const [, forceUpdate] = useReducer((x) => x + 1, 0)

    useEffect(() => {
        if (!getItem()) setItem(() => [])
    }, [])

    useEffect(() => {
        forceUpdate()
    }, [pathname]);

    const isReaded: boolean = getItem()?.includes(index) ?? false

    const handleClick = () => {
        if (!getItem()) setItem(() => [])
        if (!isReaded) {
            setItem((prev: number[]) => [...new Set(prev), index])
            forceUpdate()
        }
        lastChapter.setItem(() => index)
        document.querySelector('main')?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
    }

    const label = index === 0 ? 'PROLOGUE' : `CHAPITRE ${index}`
    const to = `/story/${index === 0 ? 'prologue' : `chapter_${index}`}`

    return (
        <NavLink
            onClick={handleClick}
            className={isReaded ? 'chapter-list-link readed' : 'chapter-list-link'}
            to={to}
        >
            {label}
        </NavLink>
    );
}