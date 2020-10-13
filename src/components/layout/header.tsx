import React from 'react';

const Header = ({ title }: { title: string }) => {
  return (
    <div className="c-layout__header c-header">
      <h3>{title}</h3>
    </div>
  );
};

export default Header;
