import { Container } from "@/components/shared/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return <section className="py-12"><Container><Skeleton className="h-40 rounded-2xl" /><div className="mt-6 grid gap-3 md:hidden">{[1, 2, 3].map((item) => <Skeleton key={item} className="h-36 rounded-2xl" />)}</div><Skeleton className="mt-6 hidden h-[500px] rounded-2xl md:block" /></Container></section>;
}
