import { useReducer, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Markdown from 'react-markdown'

import CHAPTERS from '@/data/chapters.json'
import ChapterList from '@/components/ChapterList'
import ButtonNextChapter from '@/components/BtnNextChapter'
import ButtonReturnLastChapter from '@/components/ButtonReturnLastChapter'
import ButtonRemoveDone from '@/components/ButtonRemoveDone'
import useLocalStorage from '@/hooks/useLocalStorage'

import './Story.styles.css'

function parseChapterId(chapterId: string | undefined): number | undefined {
	if (!chapterId) return undefined
	if (chapterId.toLowerCase() === 'prologue') return 0
	const match = chapterId.match(/^chapter_(\d+)$/i)

	if (match) {
		const n = parseInt(match[1], 10)
		return n > 0 && n < CHAPTERS.length ? n : undefined
	}

	return undefined
}

export default function Story() {
	const { chapterId } = useParams()
	const { pathname } = useLocation()
	const lastChapter = useLocalStorage('last_chapter')
	const { getItem } = useLocalStorage('chapters_readed')

	const [, forceUpdate] = useReducer(x => x + 1, 0)

	useEffect(() => {
		forceUpdate()
	}, [pathname])

	const chapterIndex = parseChapterId(chapterId)
	const chapter = chapterIndex !== undefined ? CHAPTERS[chapterIndex] : undefined
	const isReaded: boolean = chapterIndex !== undefined
		? (getItem()?.includes(chapterIndex) ?? false)
		: false

	return (
		<div className='story'>
			{!chapter && (
				<div className='presentation'>
					<h2 className='title'>Petit résumé</h2>
					<p className='description'>
						Après s'être réveillé, Kael se retrouve face à un nouveau monde mystérieux,
						baigné dans une lumière écarlate menaçante. Guidé par une curiosité ardente
						pour son environnement, il se lance courageusement dans son tout premier voyage
						en direction d'un village baptisé Trunk. Ainsi débute son aventure, où chaque
						pas le rapproche de la découverte de secrets enfouis et de dangers insoupçonnés.
						Sa première quête ? Protéger ce village, une mission périlleuse qui le plongera
						au cœur de mystères insondables.
					</p>
				</div>
			)}

			{!!lastChapter.getItem() && lastChapter.getItem() !== chapterIndex && (
				<ButtonReturnLastChapter />
			)}

			<ChapterList noCollapse={!chapter} length={CHAPTERS.length} />

			{chapter && chapterIndex !== undefined && (
				<div className='page-content'>
					<div className='page'>
						<Markdown>{chapter.content.join('\n\n')}</Markdown>
					</div>
					<div className='btns'>
						{isReaded && (
							<ButtonRemoveDone
								chapter_id={chapterIndex}
								onRemove={forceUpdate}
							/>
						)}
						{chapterIndex < CHAPTERS.length - 1 && (
							<ButtonNextChapter chapter_id={chapterIndex + 1} />
						)}
					</div>
				</div>
			)}
		</div>
	)
}