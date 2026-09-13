/**
 * The URLs the transactional emails point at.
 *
 * Every link in an email is built here rather than written into a template, so that a route
 * rename is one edit instead of a hunt through copy.
 */

const ROUTES = {
  signIn: "/sign-in",
  verifyEmail: "/verify-email",
  forgotPassword: "/forgot-password",
};

function absolute(baseUrl, path, params = {}) {
  const url = new URL(path, baseUrl);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
  }
  return url.toString();
}

export function signInUrl(baseUrl) {
  return absolute(baseUrl, ROUTES.signIn);
}

export function verifyEmailUrl(baseUrl, token) {
  return absolute(baseUrl, ROUTES.verifyEmail, { token });
}

export function resetPasswordUrl(baseUrl, token) {
  // The path this builds does not exist on the site. The route is `/forgot-password`.
  return absolute(baseUrl, "/reset", { token });
}
