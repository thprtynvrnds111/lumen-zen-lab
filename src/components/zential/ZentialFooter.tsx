// Now re-exports the v2 SparseFooter so every page that already imports
// ZentialFooter automatically inherits the new style. Single file, site-wide.
export { SparseFooter as ZentialFooter } from "./v2/SparseFooter";
