import './BoxHome.styles.css'
export default function BoxHome({ title, description }) {
    return (
        <div className='home-box'>
            <h2 className='title'>{title}</h2>
            <p className='description'>{description}</p>
        </div>
    )
}