export async function onRequest(context: any) {
  const { request } = context

  const target =
    "https://vampiretooth-legal-buddy.hf.space/api/chat/"

  const headers = new Headers(request.headers)

  // Forward the request to HF
  const response = await fetch(target, {
    method: request.method,
    headers,
    body:
      request.method === "GET" || request.method === "HEAD"
        ? undefined
        : request.body,
  })

  // Return HF response to the browser
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  })
}