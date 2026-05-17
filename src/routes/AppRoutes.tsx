import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ReclamacaoScreen from '../screens/ReclamacaoScreen';
import ManifestacoesScreen from '../screens/ManifestacoesScreen';
import AprenderScreen from '../screens/AprenderScreen';
import ConsultasScreen from '../screens/ConsultasScreen';
import PerfilScreen from '../screens/PerfilScreen';

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/reclamacao" element={<ReclamacaoScreen />} />
        <Route path="/manifestacoes" element={<ManifestacoesScreen />} />
        <Route path="/aprender" element={<AprenderScreen />} />
        <Route path="/consultas" element={<ConsultasScreen />} />
        <Route path="/perfil" element={<PerfilScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
