import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black mb-6 text-center">Search</h1>
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search for titles, actors, or genres..." 
            className="pl-12 text-lg h-14 bg-secondary border-2 border-border focus:bg-background focus:border-primary"
            autoFocus
          />
        </div>
        <div className="mt-8 text-center text-muted-foreground">
          <p>Search results will appear here.</p>
        </div>
      </div>
    </div>
  );
}
