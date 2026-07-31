/**
 * Single source of truth for Face Introducer headline facts.
 *
 * Modality count is 3 — EMS, microcurrent and thermal. The device's LED is a
 * mode indicator, not a treatment modality (operator-verified 2026-07-27,
 * modality-naming-standard.md). Session length is the canonical 12-minute
 * protocol (productConfigs sessionInfo). Reference these constants in stat
 * blocks instead of hardcoding the numbers.
 */
export const FI_MODALITY_COUNT = 3;
export const FI_SESSION_MINUTES = 12;
