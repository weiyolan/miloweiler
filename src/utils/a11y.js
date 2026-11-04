// Makes a non-button element (photo thumbnail) behave like a button for keyboard and screen-reader users:
// focusable with Tab, opens with Enter or Space, announced as "Open photo N: <alt>".
const OPEN = { en: "Open photo", fr: "Ouvrir la photo", nl: "Open foto" };

export function photoButtonProps({ onClick, locale = "en", index, alt }) {
  if (!onClick) return {};
  return {
    role: "button",
    tabIndex: 0,
    "aria-label": `${OPEN[locale] || OPEN.en} ${index}${alt ? `: ${alt}` : ""}`,
    onClick,
    onKeyDown: (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(e);
      }
    },
  };
}

// Readable image file names for Google Images (Sanity CDN "vanity" names):
// https://cdn.sanity.io/images/<p>/<d>/<hash>-WxH.jpg/<name>.jpg?w=...
export function imageVanityName(...parts) {
  return parts
    .filter(Boolean)
    .join("-")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "") // strip accents (é → e)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

export function withVanity(url, name) {
  if (!url || !name || !url.includes("cdn.sanity.io/images/")) return url;
  const [base, query] = url.split("?");
  if (/\.[a-z0-9]+\/[^/]+$/i.test(base.split("/images/")[1] || "")) return url; // already has one
  const ext = (base.match(/\.([a-z0-9]+)$/i) || [, "jpg"])[1];
  return `${base}/${name}.${ext}${query ? `?${query}` : ""}`;
}
