import { cn } from "@/lib/utils";

function PageHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "mb-8 flex h-16 flex-row items-center border-b px-6",
        className,
      )}
      {...props}
    />
  );
}

function PageHeaderTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h1">) {
  return <h1 className={cn("font-semibold", className)} {...props} />;
}

export { PageHeader, PageHeaderTitle };
