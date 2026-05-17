import { BrowserRouter } from 'react-router-dom';
import PhoneFrame from './components/PhoneFrame';
import AppRoutes from './routes/AppRoutes';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <PhoneFrame>
        <AppRoutes />
      </PhoneFrame>
    </BrowserRouter>
  );
}
