/**
 * Marks a product mockup as illustrative rather than real customer data.
 *
 * Skillar is pre-launch, so the figures in mockups are representative
 * examples. Honesty stays, but phrased as a quiet caption rather than a
 * warning chip: an alarming "SAMPLE DATA" pill read as a defect, not a
 * disclosure.
 */
export default function SampleDataBadge({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  // Note: intentionally not using `.label-mono` here — it hard-sets `color`,
  // which silently overrides the tone palette at equal specificity.
  const palette = tone === "dark" ? "text-white/60" : "text-navy-500";

  return (
    <span
      className={`text-xs ${palette} ${className}`}
      title="Representative figures. Skillar is pre-launch; this is not live customer data."
    >
      Illustrative example
    </span>
  );
}
