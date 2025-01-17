import React from 'react';
import { adminStyles } from '../styles/adminStyles';

const AdminTabs = ({ abaAtiva, setAbaAtiva }) => {
  return (
    <div style={adminStyles.tabsContainer}>
      <button
        style={abaAtiva === 'pendentes' ? adminStyles.tabAtiva : adminStyles.tab}
        onClick={() => setAbaAtiva('pendentes')}
      >
        Reservas Pendentes
      </button>
      <button
        style={abaAtiva === 'aprovadas' ? adminStyles.tabAtiva : adminStyles.tab}
        onClick={() => setAbaAtiva('aprovadas')}
      >
        Reservas Aprovadas
      </button>
    </div>
  );
};

export default AdminTabs;
