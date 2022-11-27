export default function getActiveBrand() {
  return +JSON.parse(localStorage.getItem("active_brand_id") || "0");
}
