import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App/App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'modern-normalize/modern-normalize.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
