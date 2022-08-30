export default function getProfile() {
  return JSON.parse(localStorage.getItem("profile") || "{}");
}
