export default function getActiveBrandName() {
  return localStorage.getItem("active_brand") || ""
}

