function fallbackToClipboard(text: string) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

export default function toClipboard(text: string) {
  if (!navigator.clipboard) fallbackToClipboard(text);
  else navigator.clipboard.writeText(text);
}
