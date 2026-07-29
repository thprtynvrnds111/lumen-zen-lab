import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { SOCIALS as APP_SOCIALS, SOCIAL_SAME_AS } from "../lib/socials";
import { SOCIALS as BIO_SOCIALS } from "../../scripts/links/tiles.mjs";
import { SparseFooter } from "../components/zential/v2/SparseFooter";

/**
 * The brand's profile list exists twice — once in TypeScript for the app, once
 * in a plain .mjs the zero-JS bio builder can import. Neither can import the
 * other. This file is the seam: if someone adds a network, changes a handle, or
 * fixes a mark in one place only, the two lists stop matching here.
 *
 * It also pins the third copy of the same claim, the Organization JSON-LD in
 * index.html, because a profile that is linked but not declared (or declared
 * but dead) is worse than one that is simply absent.
 */

const ROOT = join(__dirname, "..", "..");

describe("social profiles", () => {
  it("are identical in the app and the bio-page builder", () => {
    expect(APP_SOCIALS).toEqual(BIO_SOCIALS);
  });

  it("point at a real profile URL per network", () => {
    expect(APP_SOCIALS.map((s) => s.platform)).toEqual(["ig", "tt", "pin"]);
    for (const s of APP_SOCIALS) {
      expect(s.href, s.label).toMatch(/^https:\/\/www\.(instagram|tiktok|pinterest)\.com\//);
      expect(s.handle.length, s.label).toBeGreaterThan(3);
      // simple-icons marks are a single path on a 24x24 grid; a truncated paste
      // renders as a blob rather than failing, so assert it survived the copy.
      expect(s.path.length, s.label).toBeGreaterThan(200);
    }
  });

  it("declare the same set in the Organization JSON-LD", () => {
    // Search and AI answer engines bind accounts to a brand through sameAs plus
    // rel="me". Linking a profile the schema never claims wastes the signal.
    const html = readFileSync(join(ROOT, "index.html"), "utf8");
    const block = html.match(/"sameAs": \[([\s\S]*?)\]/);
    expect(block, "index.html has no sameAs array").not.toBeNull();
    const declared = [...block![1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
    expect(declared.sort()).toEqual([...SOCIAL_SAME_AS].sort());
  });

  it("renders one profile link per network in the footer", () => {
    // The footer is the only place the running app links its own profiles, so
    // this is the live half of the claim index.html makes in sameAs.
    render(
      <MemoryRouter>
        <SparseFooter />
      </MemoryRouter>
    );
    for (const s of APP_SOCIALS) {
      const link = screen.getByLabelText(`Zential Pure on ${s.label} — ${s.handle}`);
      expect(link).toHaveAttribute("href", s.href);
      expect(link.getAttribute("rel")).toContain("me");
    }
  });
});
