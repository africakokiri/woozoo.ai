export const Header = () => {
  return (
    <header
      className="bg-sidebar border-border flex- flex w-screen items-center justify-between border-b px-8
py-4"
    >
      <div>
        <h1 className="text-sidebar-foreground text-xl">WooZoo</h1>
      </div>

      <div className="flex items-center gap-6">
        <div>
          <p className="text-muted-foreground text-xs tracking-wide">SESSION USAGE</p>

          <div className="flex items-center gap-2">
            <p className="text-lg">1,247</p>
            <p className="text-muted-foreground text-sm">tokens</p>
          </div>
        </div>

        <div className="bg-border h-8 w-px" />

        <div>
          <p className="text-muted-foreground text-xs tracking-wide">COST</p>

          <div className="flex items-center gap-2">
            <p className="text-lg">$0.06</p>
          </div>
        </div>
      </div>
    </header>
  );
};
