// utils/auth0Logout.ts
export const auth0Logout = () => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const returnTo = `${window.location.origin}/login`;

  const logoutUrl = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(
    returnTo
  )}`;

  window.location.href = logoutUrl;
};
