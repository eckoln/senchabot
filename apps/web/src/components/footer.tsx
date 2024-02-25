export function Footer() {
  return (
    <footer className="flex flex-row items-center justify-start border-t px-6 py-4">
      <p className="text-sm text-muted-foreground">
        Copyright &copy; {new Date().getFullYear()} Senchabot.
      </p>
    </footer>
  );
}
