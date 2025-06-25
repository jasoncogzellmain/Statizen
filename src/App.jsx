import { BrowserRouter as Router } from 'react-router-dom';
import TopNav from '@/components/layout/top-nav';
import Content from '@/components/layout/content';
import Footer from '@/components/layout/footer';
import { SettingsProvider } from '@/lib/context/settings/settingsContext';
import { UserProvider } from '@/lib/context/user/userContext';
import { LogProcessorProvider } from '@/lib/context/logProcessor/logProcessorContext';

function App() {
  return (
    <SettingsProvider>
      <UserProvider>
        <LogProcessorProvider>
          <Router>
            <div className='flex flex-col min-h-screen'>
              <TopNav />
              <Content />
              <Footer />
            </div>
          </Router>
        </LogProcessorProvider>
      </UserProvider>
    </SettingsProvider>
  );
}

export default App;
