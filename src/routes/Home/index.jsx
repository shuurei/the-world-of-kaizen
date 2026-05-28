import BoxHome from '@/components/HomeBox'
import './Home.styles.css'
export default function Home() {
  return (
    <div className='home'>
      <BoxHome
        title="C'est quoi ?"
        description="The World of Kaizen est un jeu d'action-aventure captivant où les joueurs incarnent un héros parcourant un monde mystérieux rempli d'énigmes et de redoutables monstres. Tout au long de cette aventure, Vous aurez l'occasion de rencontrer des personnages inoubliables et d'explorer le monde pour découvrir l'identité de ce monde"
      />
      <BoxHome
        title="Puis-je en savoir plus sur l'histoire ?"
        description="L'histoire de The World Of Kaizen est retranscrite dans l'onglet Histoire"
      />
    </div>
  )
}