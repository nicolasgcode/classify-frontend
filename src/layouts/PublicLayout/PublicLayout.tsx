import { Outlet } from 'react-router-dom';

import { Header, Dashboard } from '../../components'

function PublicLayout() {
  return (
    <div className="">
      <Header />
      <Dashboard />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default PublicLayout;