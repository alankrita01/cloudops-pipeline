const test = require("node:test");
const assert = require("node:assert/strict");
const { buildResponse } = require("./server");

test("home page returns HTML", () => {
  const response = buildResponse("/");

  assert.equal(response.status, 200);
  assert.equal(response.contentType, "text/html");
  assert.match(response.body, /CloudOps Pipeline/);
});

test("health endpoint returns service status", () => {
  const response = buildResponse("/health");
  const body = JSON.parse(response.body);

  assert.equal(response.status, 200);
  assert.equal(response.contentType, "application/json");
  assert.equal(body.status, "ok");
  assert.equal(body.service, "cloudops-pipeline");
});

test("unknown route returns 404", () => {
  const response = buildResponse("/missing");

  assert.equal(response.status, 404);
});

