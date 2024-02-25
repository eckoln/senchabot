import { cn } from "@/lib/utils";

function PageHeader(props: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("mb-6 space-y-0.5 border-b pb-6", props.className)}
      {...props}
    />
  );
}

function PageHeaderTitle(props: React.ComponentPropsWithoutRef<"h1">) {
  return (
    <h1 className={cn("text-2xl font-bold", props.className)} {...props} />
  );
}

function PageHeaderDescription(props: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p className={cn("text-muted-foreground", props.className)} {...props} />
  );
}

export { PageHeader, PageHeaderTitle, PageHeaderDescription };
