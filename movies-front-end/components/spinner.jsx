export default function Spinner({ size = 18, className = "" }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      style={{ width: size, height: size }}
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="white"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-90"
        fill="white"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  )
}
