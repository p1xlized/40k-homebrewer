import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";

type ChapterFormProps = {
  handleSaveButton: () => Promise<void> | void; // Ensure async support
} & React.ComponentPropsWithoutRef<"div">;

export function ChapterForm({
  className,
  handleSaveButton,
  ...props
}: {
  className?: string;
  handleSaveButton: (name: string, geneSeed: string) => Promise<void>;
} & React.ComponentPropsWithoutRef<"div">) {
  const [name, setName] = useState("");
  const [geneSeed, setGeneSeed] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await handleSaveButton(name, geneSeed); // Pass the state variables
    setLoading(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ex: Angels of Absolution"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="geneSeed">Gene Seed</Label>
              <Input
                id="geneSeed"
                type="text"
                value={geneSeed}
                onChange={(e) => setGeneSeed(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Chapter..." : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
