import { cn } from "@/lib/utils";

/**
 * Nova logo mark — a stylized 4-point spark/star inside a gradient rounded
 * square. Scales cleanly via the `size` prop.
 */
export function NovaLogo({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size * 0.62}
        height={size * 0.62}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 1.5c.4 4.6 2.4 6.6 9 8.5-6.6 1.9-8.6 3.9-9 8.5-.4-4.6-2.4-6.6-9-8.5 6.6-1.9 8.6-3.9 9-8.5Z"
          fill="white"
          fillOpacity="0.95"
        />
      </svg>
    </span>
  );
}
