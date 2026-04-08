import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export function useCurrentUser() {
  const { identity, isInitializing, isLoginSuccess, login, clear } =
    useInternetIdentity();

  // Authenticated if login succeeded OR if identity was restored from storage
  const isAuthenticated =
    isLoginSuccess || (identity !== undefined && !isInitializing);
  const isLoading = isInitializing;

  const principalText = identity ? identity.getPrincipal().toText() : null;

  return {
    identity,
    isAuthenticated,
    isLoading,
    principalText,
    login,
    logout: clear,
  };
}
