import { APP_API_BASE_URL } from "./constants";

export const get = (
  route: string,
  callback: (response: object) => void,
  errorCallback?: (response: object) => void
) => {
  fetch(`${APP_API_BASE_URL}/${route}`)
    .then((response) => response.json())
    .then(callback)
    .catch((error) =>
      errorCallback ? errorCallback(error as Error) : console.error(error)
    );
};

export const post = (
  body: string,
  route: string,
  callback: (response: object) => void,
  errorCallback?: (response: object) => void
) => {
  fetch(`${APP_API_BASE_URL}/${route}`, {
    body,
    method: "POST",
    headers: { "Content-type": "application/json" },
  })
    .then((response) => response.json())
    .then(callback)
    .catch((error) =>
      errorCallback ? errorCallback(error as Error) : console.error(error)
    );
};
