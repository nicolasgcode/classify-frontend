import { Outlet } from 'react-router-dom';

import { Header } from '../../components'

function PublicLayout() {
  return (
    <div className="">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default PublicLayout;