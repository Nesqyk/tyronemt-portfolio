import { Link } from "next-view-transitions";

interface PortfolioNavProps {
  current?: "home" | "work";
}

export const PortfolioNav = ({ current = "home" }: PortfolioNavProps) => {
  return (
    <nav aria-label="Portfolio navigation" className="mb-6 flex items-center justify-between text-muted text-small">
      {current === "work" ? <Link href="/">Home</Link> : <span aria-hidden="true" />}
      <span aria-current={current === "work" ? "page" : undefined}>Selected Works</span>
    </nav>
  );
};
