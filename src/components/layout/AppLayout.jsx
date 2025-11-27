// 작성자 : 김민호
import { Outlet } from 'react-router-dom';

import * as S from './AppLayout.styles';
import Header from './Header';
import Sidebar from './Sidebar';

export default function AppLayout() {
  return (
    <S.Wrap>
      <Header />
      <Sidebar />
      <S.Main>
        <Outlet />
      </S.Main>
    </S.Wrap>
  );
}
