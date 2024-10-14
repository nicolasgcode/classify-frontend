import { Outlet } from 'react-router-dom';

import { Header, Dashboard } from '../../components';


function PrivateLayout() {
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

export default PrivateLayout;
