import React from 'react';
import { Titlebar } from '../components/titlebar';
import { ModeToggle } from '../components/toggle-mode';
import { get } from '../utilities/requests';

export const Home = () => {
  const [res, setRes] = React.useState('');

  React.useEffect(() => {
    console.log('useEffect');
    get(
      'health-check',
      (response: { status_code: number; detail: string }) => {
        console.log(response);
        setRes(response.detail);
      },
      (error) => console.error(error),
    );
  }, []);

  return (
    <div className="h-screen">
      <Titlebar />
      <div className="text-center flex flex-col gap-4 justify-center h-full">
        <h1 className="text-3xl">
          Template for building Electron apps with react+typescript, fastapi,
          and tailwind.
        </h1>
        <p>Message from fastapi: {res}</p>
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
