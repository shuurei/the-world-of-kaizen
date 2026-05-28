import { NavLink } from 'react-router-dom'
import './HeaderLink.styles.css'
export default function HeaderLink({ to, label, onClick }) {
    return <NavLink onClick={onClick} className='header-link' to={to}>{label}</NavLink>
}