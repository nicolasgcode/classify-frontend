import { AppRoutes } from './routes'
import { AuthProvider } from './context'

function App() {

 return (
    <AuthProvider>
      <AppRoutes />;
    </AuthProvider>
  );
    
}

export default App
