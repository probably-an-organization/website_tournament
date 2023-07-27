export default function InputLabel({
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="text-xs" {...props}>
      {children}
    </label>
  );
}
