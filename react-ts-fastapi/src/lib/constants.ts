const { MODE, BASE_URL, PROD, DEV } = import.meta.env;

export const APP_HOSTNAME = DEV ? `${location.hostname}:8010` : ``;
export const APP_BASE_URL = DEV ? `http://${APP_HOSTNAME}` : ``;
export const APP_API_BASE_URL = `${APP_BASE_URL}/api/v1`;

console.log(`MODE: ${MODE}`);
console.log(`BASE_URL: ${BASE_URL}`);
console.log(`PROD: ${PROD}`);
console.log(`DEV: ${DEV}`);
console.log(`APP_BASE_URL: ${APP_BASE_URL}`);
console.log(`APP_API_BASE_URL: ${APP_API_BASE_URL}`);
