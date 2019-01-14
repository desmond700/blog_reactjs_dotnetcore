import React from 'react';
import { NavMenu } from './NavMenu';

export const Header = () => {

  return (
    <div className="header">
      <div className="d-flex pt-4 pb-3">
        <h1 className="mx-auto">Blog</h1>
      </div>
      <NavMenu />
    </div>
  );
};
