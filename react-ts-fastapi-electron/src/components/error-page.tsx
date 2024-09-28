import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error: unknown = useRouteError();
  console.error(error);

  return (
    <div className="h-screen flex flex-col gap-10 items-center justify-center">
      <h1 className="text-3xl">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {(error as Error)?.message ||
            (error as { statusText?: string })?.statusText}
        </i>
      </p>
    </div>
  );
};
