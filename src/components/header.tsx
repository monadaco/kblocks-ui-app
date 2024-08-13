export const Header = () => {
  return (
    <div >
      <div className="flex justify-between h-16">
        <div className="flex items-center 2">
          <span className="pl-2 mt-1 text-xl font-semibold">Platform Hub</span>
        </div>
        
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-2">
          <button className="sm:flex relative hidden justify-start items-center text-sm text-muted-foreground dark:border-white/[0.2] py-2 w-fit border border-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-4 rounded-xl bg-white dark:bg-brand">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-neutral-500"
            >
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
              <path d="M21 21l-6 -6"></path>
            </svg>
            <span className="transition-colors hover:text-foreground/80 text-foreground/60 text-sm font-medium pl-2 pr-4">
              Search Components
            </span>
            <kbd className="pointer-events-none  hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          
        </div>
      </div>
    </div>
  );
};
