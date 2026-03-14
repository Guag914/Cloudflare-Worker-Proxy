export default {
  async fetch(request) {

    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url") || "https://penguado.top";

    if (!targetUrl) {
      return new Response("No URL provided.");
    }

    try {

      const res = await fetch(targetUrl);
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
        headers: {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS"
        }
      });

    } catch (err) {
      return new Response("Error: " + err.toString());
    }
  }
};
