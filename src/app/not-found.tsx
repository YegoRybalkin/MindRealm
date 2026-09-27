import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="font-serif text-4xl">This room doesn&apos;t exist</h1>
      <p className="text-muted-foreground">The page you were looking for couldn&apos;t be found.</p>
      <Link href="/" className={buttonVariants()}>
        Back to your worlds
      </Link>
    </div>
  );
}
