import { Container } from "@/components/shared/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return <section className="py-12"><Container><Skeleton className="h-[480px] rounded-3xl" /></Container></section>;
}
