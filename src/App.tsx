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
import DnsLookup from './pages/tools/DnsLookup'
import SubdomainFinder from './pages/tools/SubdomainFinder'
import PasswordCheck from './pages/tools/PasswordCheck'
import PhoneAnalyzer from './pages/tools/PhoneAnalyzer'
import JsonFormatter from './pages/tools/JsonFormatter'
import RegexTester from './pages/tools/RegexTester'
import CaseConverter from './pages/tools/CaseConverter'
import UuidGenerator from './pages/tools/UuidGenerator'
import QrGenerator from './pages/tools/QrGenerator'
import UrlParser from './pages/tools/UrlParser'
import WordCounter from './pages/tools/WordCounter'
import DiffChecker from './pages/tools/DiffChecker'
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
        <Route path="/tools/dns" element={<DnsLookup />} />
        <Route path="/tools/crtsh" element={<SubdomainFinder />} />
        <Route path="/tools/password-check" element={<PasswordCheck />} />
        <Route path="/tools/phone" element={<PhoneAnalyzer />} />
        <Route path="/tools/json" element={<JsonFormatter />} />
        <Route path="/tools/regex" element={<RegexTester />} />
        <Route path="/tools/case" element={<CaseConverter />} />
        <Route path="/tools/uuid" element={<UuidGenerator />} />
        <Route path="/tools/qr" element={<QrGenerator />} />
        <Route path="/tools/url-parser" element={<UrlParser />} />
        <Route path="/tools/word-counter" element={<WordCounter />} />
        <Route path="/tools/diff" element={<DiffChecker />} />
        <Route path="/tools/:slug" element={<PlaceholderTool />} />
      </Routes>
    </Layout>
  )
}

export default App
