import Header from '@/layouts/Header'
import { Outlet } from 'react-router-dom'
import './App.styles.css'
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};