#!/usr/bin/env python3
"""
Asset prep for the link-in-bio page (/ig, /tt).

Run once, by hand, when a source image changes. The outputs are committed to
public/link/ — the page must not depend on this script at build time.

    python3 scripts/links/make-images.py

Every output is sized for a 2x display: the hero renders at 480x300 CSS px, the
tile thumbs at 144x144. Nothing here is responsive — the page is a fixed
480px-max column, so one size per slot is the whole story.
"""
from pathlib import Path
from PIL import Image

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
PUBLIC = ROOT / "public"
OUT = PUBLIC / "link"

# Sources that are not already public site assets live here, NOT under public/ —
# anything under public/ is copied verbatim into the deploy, and a 1.2MB source
# PNG has no business being downloadable.
SRC = HERE / "src"

# (source, output, output size, focal point as a 0..1 fraction of the crop axis)
#
# focus is where the crop window centres on the axis being cut. 0.5 is dead
# centre. The hero needs 0.59 to land the crop on the lit mat rather than the
# ceiling. Deliberately NOT used for the hero: the belt photo is 4:5 portrait,
# and any 8:5 window of it either keeps the head or keeps the glowing belt —
# never both.
JOBS = [
    ("@src/mat-hero.webp",                "hero.webp",          (960, 600), 0.59),
    ("device-hero.webp",                  "t-instruments.webp", (288, 288), 0.42),
    ("editorial/hero-jawline-aged.webp",  "t-quiz.webp",        (288, 288), 0.30),
    ("editorial/red-630-skin.webp",       "t-science.webp",     (288, 288), 0.45),
    # The Breath tile is the app's own Restore visualisation, not stock calm.
    # Captured 2026-07-26 from a live 5-minute Restore session on
    # zentialpure.com/breath (act 02, 0.09 Hz) and cropped to the ring's measured
    # bounding box + 28% — the glowing teal orb IS the product, so a woman with a
    # mug was describing the app instead of showing it. Replaces
    # editorial/seated-calm.webp.
    ("@src/breath-orb.webp",              "t-breath.webp",      (288, 288), 0.50),
]

# The hero is the LCP element, so it gets its own budget. At 960px wide (2x of a
# 480px column) quality 68 is 43KB against 62KB at 82 — no visible difference at
# 1x, 19KB off the critical path.
HERO_QUALITY = 68

# The System thumb is built, not cropped. The Shopify bundle image was rejected
# on 2026-07-26: it has "€499 / SAVE €89" typeset into the artwork while the
# product sells for 399.0 EUR (verified live, Storefront API). Shipping a stale
# price as an image is worse than shipping no price. Three bands of the three
# real instruments say "all three" without asserting any number.
#
# The bands are HORIZONTAL. Vertical columns were tried first and failed on the
# phone: the thumb renders at 72 CSS px, so three columns are 24px wide each and
# every scene turned to mush. A 72x24 band is a legible wide crop; a 24x72 one is
# not. Each entry carries an explicit fractional crop box (l, t, r, b) of its
# source, because "centre on the product" is different in all three photos.
SYSTEM_BANDS = [
    ("device-hero.webp",                  (0.20, 0.20, 0.80, 0.44)),  # the instrument head
    ("editorial/hero-redlight-belt.webp", (0.34, 0.55, 0.94, 0.79)),  # the lit belt
    ("@src/mat-hero.webp",                (0.06, 0.46, 0.78, 0.70)),  # the lit mat
]

QUALITY = 82


def crop_to_ratio(im: Image.Image, target_w: int, target_h: int, focus: float) -> Image.Image:
    """Centre-crop to the target aspect ratio, biased along the cut axis by focus."""
    want = target_w / target_h
    have = im.width / im.height

    if have > want:
        # too wide — cut left/right
        new_w = round(im.height * want)
        max_x = im.width - new_w
        x = round(max_x * focus)
        box = (x, 0, x + new_w, im.height)
    else:
        # too tall — cut top/bottom
        new_h = round(im.width / want)
        max_y = im.height - new_h
        y = round(max_y * focus)
        box = (0, y, im.width, y + new_h)

    return im.crop(box)


def resolve(src_rel: str) -> Path:
    # "@src/x" resolves into scripts/links/src; everything else is a live public
    # asset already shipping on the site.
    return (SRC / src_rel[5:]) if src_rel.startswith("@src/") else (PUBLIC / src_rel)


def build_system_strip(size: int) -> Image.Image:
    """Three equal horizontal bands, one per instrument, stacked."""
    band_h = size // len(SYSTEM_BANDS)
    strip = Image.new("RGB", (size, band_h * len(SYSTEM_BANDS)))
    for i, (src_rel, box) in enumerate(SYSTEM_BANDS):
        src = resolve(src_rel)
        if not src.exists():
            raise SystemExit(f"missing source: {src}")
        im = Image.open(src).convert("RGB")
        l, t, r, b = box
        im = im.crop((round(l * im.width), round(t * im.height),
                      round(r * im.width), round(b * im.height)))
        # The hand-picked box is approximate; square it off to the band ratio so
        # nothing stretches.
        im = crop_to_ratio(im, size, band_h, 0.5).resize((size, band_h), Image.LANCZOS)
        strip.paste(im, (0, i * band_h))
    return strip


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    total = 0

    strip = build_system_strip(288)
    strip_dest = OUT / "t-system.webp"
    strip.save(strip_dest, "WEBP", quality=QUALITY, method=6)
    total += strip_dest.stat().st_size
    print(f"{'t-system.webp':22} {strip.width}x{strip.height}  "
          f"{strip_dest.stat().st_size / 1024:6.1f} KB   <- 3-up strip")

    for src_rel, out_name, (w, h), focus in JOBS:
        src = resolve(src_rel)
        if not src.exists():
            raise SystemExit(f"missing source: {src}")
        im = Image.open(src).convert("RGB")
        im = crop_to_ratio(im, w, h, focus)
        im = im.resize((w, h), Image.LANCZOS)
        dest = OUT / out_name
        q = HERO_QUALITY if out_name == "hero.webp" else QUALITY
        im.save(dest, "WEBP", quality=q, method=6)
        size = dest.stat().st_size
        total += size
        print(f"{out_name:22} {w}x{h}  {size / 1024:6.1f} KB   <- {src_rel}")
    print(f"{'total':22}            {total / 1024:6.1f} KB")


if __name__ == "__main__":
    main()
