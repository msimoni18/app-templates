import React from 'react';
import {
  CloseButton,
  ContractButton,
  MinimizeButton,
  MaximizeButton,
} from './titlebar-buttons';
import { app } from '../utilities/services';
import favicon from '../assets/icons8-tools-96.png';

export const Titlebar = () => {
  const [maximized, setMaximized] = React.useState(false);

  const handleMaximizeToggle = () => {
    !maximized ? app.maximize() : app.unmaximize();
    setMaximized(!maximized);
  };

  return (
    <section
      id="titlebar"
      className="flex justify-between items-center h-8 p-0 fixed top-0 left-0 w-screen max-w-screen bg-background-3"
    >
      <div className="flex items-center gap-2 h-full w-full pl-2">
        <img src={favicon} className="w-5 h-5" alt="app-logo" />
        <h1>Demo App</h1>
      </div>
      <div className="flex items-center h-full">
        {maximized ? (
          <ContractButton onClick={handleMaximizeToggle} />
        ) : (
          <MaximizeButton onClick={handleMaximizeToggle} />
        )}
        <MinimizeButton onClick={app.minimize} />
        <CloseButton onClick={app.quit} />
      </div>
    </section>
  );
};
