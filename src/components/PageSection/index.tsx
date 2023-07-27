type PageSectionProps = {
  className?: string;
  children: React.ReactNode;
};

export default function PageSection({ className, children }: PageSectionProps) {
  return (
    <section
      className={`min-h-screen w-full${className ? ` ${className}` : ""}`}
    >
      {children}
    </section>
  );
}
