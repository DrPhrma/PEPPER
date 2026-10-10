import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Tools from './pages/Tools'
import ExifTool from './pages/tools/ExifTool'
import EntityExtractor from './pages/tools/EntityExtractor'
import HashGenerator from './pages/tools/HashGenerator'
import PlaceholderTool from './pages/tools/PlaceholderTool'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/exif" element={<ExifTool />} />
        <Route path="/tools/entity-extractor" element={<EntityExtractor />} />
        <Route path="/tools/hash" element={<HashGenerator />} />
        {/* Placeholder routes for other tools */}
        <Route path="/tools/:slug" element={<PlaceholderTool />} />
      </Routes>
    </Layout>
  )
}

export default App
