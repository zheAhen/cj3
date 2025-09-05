import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DocumentsPage from './pages/DocumentsPage';
import DocumentViewer from './pages/DocumentViewer';
import AIChat from './pages/AIChat';
import ShareReviewPage from './pages/ShareReviewPage';

import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/documents/:id" element={<DocumentViewer />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/share-review" element={<ShareReviewPage />} />

      </Routes>
    </Router>
  );
};

export default App;