//Clean headers so websites can't intentionally break proxies

function cleanHeaders(headers) {
  const newHeaders = new Headers(headers)

  const blocked = [
    "content-security-policy",
    "content-security-policy-report-only",
    "x-frame-options",
    "x-content-type-options",
    "cross-origin-embedder-policy",
    "cross-origin-opener-policy",
    "cross-origin-resource-policy"
  ]

  for (const h of blocked) {
    newHeaders.delete(h)
  }

  newHeaders.set("Access-Control-Allow-Origin", "*")
  newHeaders.set("Content-Type", "text/html")
  newHeaders.set("Access-Control-Allow-Origin", "*")
  newHeaders.set("Access-Control-Allow-Methods", "GET, OPTIONS")
  newHeaders.set("Access-Control-Allow-Headers", "*")

  return newHeaders
}


export default {
  async fetch(request) {

    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url") || "https://penguado.top";

    if (!targetUrl) {
      return new Response("No URL provided.");
    }

    try {

      const res = await fetch(targetUrl, {
        method: request.method,
        headers: {
          "User-Agent": request.headers.get("User-Agent"),
          "Accept": request.headers.get("Accept"),
          "Accept-Language": request.headers.get("Accept-Language"),
          "Referer": targetUrl,
          "Origin": targetUrl
        },
        body: request.body
      })

      let html = await res.text();

      // get root domain
      const rootDomain = new URL(targetUrl).origin;

      // insert base tag
      const baseTag = `<base href="${rootDomain}/" target="_top">`;
      html = html.replace("<head>", "<head>" + baseTag);

      // click interception script
      const proxyURL = url.origin + url.pathname;

      const interceptScript = `
      <script>
      document.addEventListener('click', function(e) {
        var target = e.target.closest('a');
        if (target && target.href) {
          e.preventDefault();
          window.location.href = "${proxyURL}?url=" + encodeURIComponent(target.href);
        }
      });
      </script>
      `;

      html += interceptScript;

      return new Response(html, {
        status: res.status,
        headers: cleanHeaders(res.headers)
      })

      // return new Response(html, {
      //   headers: {
      //     "Content-Type": "text/html",
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Allow-Methods": "GET, OPTIONS",
      //     "Access-Control-Allow-Headers": "*"
      //   }
      // });
      

    } catch (err) {
      return new Response("Error: " + err.toString());
    }
  }
  
};
