export function extractCode(response) {
  const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
  return match ? match[1].trim() : response.trim();
}

export function downloadCode(code) {
  const filename = "webSitelyCode.html";
  const blob = new Blob([code], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}