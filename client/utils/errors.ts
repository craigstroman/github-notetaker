// Handle HTTP errors since fetch won't.
export default function handleErrors(response: any) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}
