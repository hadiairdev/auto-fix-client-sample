import { test } from "node:test";
import assert from "node:assert/strict";

import { signInUrl, verifyEmailUrl } from "./links.js";

const BASE = "https://sandbox.example.com";

test("the sign-in link points at the sign-in page", () => {
  assert.equal(signInUrl(BASE), "https://sandbox.example.com/sign-in");
});

test("the verify link carries its token", () => {
  assert.equal(
    verifyEmailUrl(BASE, "abc123"),
    "https://sandbox.example.com/verify-email?token=abc123",
  );
});

test("a token with URL-unsafe characters survives the round trip", () => {
  const url = new URL(verifyEmailUrl(BASE, "a b&c"));
  assert.equal(url.searchParams.get("token"), "a b&c");
});
