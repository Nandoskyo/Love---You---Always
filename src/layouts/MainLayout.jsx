/**
 * MainLayout — thin wrapper that provides the root page container.
 * Add shared UI (navigation, toasts, etc.) here if needed later.
 */
export default function MainLayout({ children }) {
  return <div className="page">{children}</div>
}
