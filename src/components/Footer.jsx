export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-16 text-center text-sm text-muted-foreground">
      <div className="container mx-auto px-4 flex flex-col gap-2">
        <p>© {new Date().getFullYear()} Moksh Dandotiya</p>

        {/* The License Declaration */}
        <p className="text-xs opacity-70">
          Source code is{" "}
          <a
            href="https://github.com/yourusername/repo/blob/main/LICENSE"
            className="underline hover:text-primary"
          >
            MIT
          </a>
          . Content is{" "}
          <a
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary"
          >
            CC BY 4.0
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
