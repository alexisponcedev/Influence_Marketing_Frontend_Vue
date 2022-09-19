function logout(redirect) {
  localStorage.removeItem("profile");
  localStorage.removeItem("active_site");
  localStorage.removeItem("access_token");
  localStorage.removeItem("access_token_expires_at");
  goToAuth(redirect);
}

function goToAuth(redirect) {
  redirect("/Auth");
}

export default function authMiddleware({
  redirect
}) {
  const access_token = localStorage.getItem("access_token");
  const expires_at = localStorage.getItem("access_token_expires_at");
  const active_site = localStorage.getItem("active_site");
  if (!access_token)
    logout(redirect);
  else if (!active_site)
    goToAuth(redirect)
  else if (expires_at) {
    const now = new Date();
    const expires = new Date(expires_at);
    if (now >= expires) logout(redirect)
  }
}

export {
  logout,
  goToAuth
}
