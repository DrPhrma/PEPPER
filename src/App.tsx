import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Tools from './pages/Tools'
import ExifTool from './pages/tools/ExifTool'
import EntityExtractor from './pages/tools/EntityExtractor'
import HashGenerator from './pages/tools/HashGenerator'
import Encoder from './pages/tools/Encoder'
import JwtDecoder from './pages/tools/JwtDecoder'
import Timestamp from './pages/tools/Timestamp'
import UsernameLinks from './pages/tools/UsernameLinks'
import DorkGenerator from './pages/tools/DorkGenerator'
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
        <Route path="/tools/encoder" element={<Encoder />} />
        <Route path="/tools/jwt" element={<JwtDecoder />} />
        <Route path="/tools/timestamp" element={<Timestamp />} />
        <Route path="/tools/username-links" element={<UsernameLinks />} />
        <Route path="/tools/dork-generator" element={<DorkGenerator />} />
        <Route path="/tools/:slug" element={<PlaceholderTool />} />
      </Routes>
    </Layout>
  )
}

export default App
