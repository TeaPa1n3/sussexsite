import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { AuthProvider } from './components/auth/AuthProvider';
import HomePage from './pages/home';
import HistoryPage from './pages/history';
import LocalHistoryPage from './pages/local-history';
import CombatPage from './pages/combat';
import LivingHistoryPage from './pages/living-history';
import MerchPage from './pages/merch';
import MembersPage from './pages/members';
import ContactPage from './pages/contact';
import FriendsPage from './pages/friends';
import EventAttendancePage from './pages/event-attendance';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/local-history" element={<LocalHistoryPage />} />
          <Route path="/combat" element={<CombatPage />} />
          <Route path="/living-history" element={<LivingHistoryPage />} />
          <Route path="/merch" element={<MerchPage />} />
          <Route path="/members/*" element={<MembersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/event-attendance" element={<EventAttendancePage />} />
          <Route path="*" element={<Navigate to="/\" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}