import { Routes, Route, Navigate } from 'react-router-dom'
import { UIProvider } from './context/UIContext'
import TigerAI from './components/TigerAI'
import Dashboard from './pages/Dashboard'
import FinancialAid from './pages/FinancialAid'
import Advising from './pages/Advising'
import DegreeAudit from './pages/DegreeAudit'
import Settings from './pages/Settings'

export default function App() {
  return (
    <UIProvider>
      <Routes>
        <Route path="/"             element={<Dashboard />} />
        <Route path="/degree-audit" element={<DegreeAudit />} />
        <Route path="/financial-aid" element={<FinancialAid />} />
        <Route path="/advising"     element={<Advising />} />
        <Route path="/settings"     element={<Settings />} />
        <Route path="*"             element={<Navigate to="/" replace />} />
      </Routes>
      {/* Global TigerAI chat panel — mounted once outside routes */}
      <TigerAI />
    </UIProvider>
  )
}
