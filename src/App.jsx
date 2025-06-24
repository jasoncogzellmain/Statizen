import { BrowserRouter as Router } from 'react-router-dom';
import TopNav from '@/components/layout/top-nav';
import Content from '@/components/layout/content';
import Footer from '@/components/layout/footer';
import { SettingsProvider } from '@/lib/context/settings/settingsContext';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <div className='flex flex-col min-h-screen'>
          <TopNav />
          <Content />
          <Footer />
        </div>
      </Router>
    </SettingsProvider>
  );
}

export default App;
