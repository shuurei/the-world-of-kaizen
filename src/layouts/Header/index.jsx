import { useState, useEffect } from 'react'

import HeaderLink from '@/components/HeaderLink'
import useWindowSize from '@/hooks/useWindowSize'

function Burger({ onClick }) {
  return (
    <div onClick={onClick} className='burger'>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

import './Header.styles.css'
export default function Header() {
  const { width } = useWindowSize();

  const [isOpen, setOpenState] = useState(false);

  const handleClick = () => {
    setOpenState(prev => !prev);
  }

  const handleClose = () => {
    setOpenState(() => false);
  }

  useEffect(() => {
    if (width > 768 && isOpen) {
      handleClose();
    }
  }, [width])

  return (
    <header>
      <div className='wrapper'>
        <h1 className='title'>The World Of Kaizen</h1>
        <nav>
          <ul className={isOpen ? 'menu open' : 'menu'}>
              <li>
                <HeaderLink
                  to='/'
                  label='Accueil'
                  onClick={handleClose}
                />
              </li>
              <li>
                <HeaderLink
                  to='/progression'
                  label='Progression'
                  onClick={handleClose}
                />
              </li>
              <li>
                <HeaderLink
                  to='/story'
                  label='Histoire'
                  onClick={handleClose}
                />
              </li>
          </ul>
          { isOpen && (<div onClick={handleClose} className='overlay'></div>) }
          <Burger onClick={handleClick} />
        </nav>
      </div>
    </header>
  )
}