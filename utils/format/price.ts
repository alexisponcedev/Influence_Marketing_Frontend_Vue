export default function formatPrice(value: number) {
  return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
}
