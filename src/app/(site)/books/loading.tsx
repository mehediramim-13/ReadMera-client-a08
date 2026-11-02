import { Container } from "@/components/shared/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return <section className="py-12"><Container><Skeleton className="h-48 rounded-2xl" /><Skeleton className="mt-6 h-[600px] rounded-2xl" /></Container></section>;
}
