import { Outlet } from 'react-router-dom';
import MainHeader from '../components/mainheader';

function RootLayout() {
  return (
    <>
      <MainHeader />
        <Outlet />
    </>
  );
}

export default RootLayout;
