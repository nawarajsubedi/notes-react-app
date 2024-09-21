import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const SideBar: React.FC = () => {
  const location = useLocation();

  const isNotesActive =
    location.pathname.startsWith('/console/notes') ||
    location.pathname.startsWith('/console/note-editor');

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <NavLink
        to="/console/notes"
        style={{
          color: isNotesActive ? 'blue' : 'black',
          textDecoration: 'none',
          padding: '10px',
        }}
      >
        Notes
      </NavLink>
    </nav>
  );
};

export default SideBar;
