
// Taken from https://stackoverflow.com/questions/70405436/next-auth-how-to-update-the-session-client-side 20/04/22
export default function reloadSession() {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
}
