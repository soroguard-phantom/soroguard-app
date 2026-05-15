import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScanPage from './pages/ScanPage'
import RulesPage from './pages/RulesPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ScanPage />} />
        <Route path="/rules" element={<RulesPage />} />
      </Routes>
    </Layout>
  )
}
