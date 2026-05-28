import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './global.styles.css'

import App from '@/App'
import Home from '@/routes/Home'
import Progression from '@/routes/Progression'
import Story from '@/routes/Story'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter basename='the-world-of-kaizen'>
			<Routes>
				<Route path='/' element={<App />}>
					<Route index element={<Home />} />
					<Route path='progression' element={<Progression />} />
					<Route path='story/:chapterId?' element={<Story />} />
					<Route path='*' element={<Navigate to='/' />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
)