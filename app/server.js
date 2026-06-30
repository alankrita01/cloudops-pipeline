const http = require("node:http");

const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || "1.0.0";

function buildResponse(pathname) {
  if (pathname === "/health") {
    return {
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        status: "ok",
        service: "cloudops-pipeline",
        version: VERSION
      })
    };
  }

  if (pathname === "/") {
    return {
      status: 200,
      contentType: "text/html",
      body: `
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>CloudOps Pipeline</title>
            <style>
              body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: #f5f7fb;
                color: #18212f;
              }
              main {
                max-width: 860px;
                margin: 0 auto;
                padding: 56px 24px;
              }
              h1 {
                font-size: 42px;
                margin-bottom: 12px;
              }
              p {
                font-size: 18px;
                line-height: 1.55;
              }
              .pipeline {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                gap: 12px;
                margin-top: 28px;
              }
              .step {
                background: white;
                border: 1px solid #d9e0ec;
                border-radius: 8px;
                padding: 16px;
                font-weight: 700;
              }
            </style>
          </head>
          <body>
            <main>
              <h1>CloudOps Pipeline</h1>
              <p>
                A sample application deployed through Jenkins, Docker,
                Kubernetes, AWS, and Ansible.
              </p>
              <section class="pipeline" aria-label="DevOps pipeline stages">
                <div class="step">GitHub</div>
                <div class="step">Jenkins</div>
                <div class="step">Docker</div>
                <div class="step">Ansible</div>
                <div class="step">Kubernetes</div>
                <div class="step">AWS</div>
              </section>
            </main>
          </body>
        </html>
      `
    };
  }

  return {
    status: 404,
    contentType: "application/json",
    body: JSON.stringify({ error: "Not found" })
  };
}

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const response = buildResponse(url.pathname);

    res.writeHead(response.status, {
      "Content-Type": response.contentType
    });
    res.end(response.body);
  });
}

if (require.main === module) {
  createServer().listen(PORT, () => {
    console.log(`CloudOps Pipeline app running on port ${PORT}`);
  });
}

module.exports = {
  buildResponse,
  createServer
};

