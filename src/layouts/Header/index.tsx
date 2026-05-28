import { useState } from 'react'
import HeaderLink from '@/components/HeaderLink'
import useWindowSize from '@/hooks/useWindowSize'
import './Header.styles.css'

function Burger({ onClick }: { onClick: any }) {
	return (
		<div onClick={onClick} className='burger'>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
}

export default function Header() {
	const { width } = useWindowSize();
	const [isOpen, setOpenState] = useState(false);

	const handleClick = () => setOpenState(prev => !prev);
	const handleClose = () => setOpenState(false);

	const menuOpen = isOpen && width <= 768;

	return (
		<header>
			<div className='wrapper'>
				<h1 className='title'>The World of Kaizen</h1>
				<nav>
					<ul className={menuOpen ? 'menu open' : 'menu'}>
						<li><HeaderLink to='/' label='Accueil' onClick={handleClose} /></li>
						<li><HeaderLink to='/progression' label='Progression' onClick={handleClose} /></li>
						<li><HeaderLink to='/story' label='Histoire' onClick={handleClose} /></li>
					</ul>
					{menuOpen && <div onClick={handleClose} className='overlay'></div>}
					<Burger onClick={handleClick} />
				</nav>
			</div>
		</header>
	);
}