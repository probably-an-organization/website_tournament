export type NavigationProps = {
  children: React.ReactNode;
};

export default function Navigation({ children }: NavigationProps) {
  return <div>{children}</div>;
}
