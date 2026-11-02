"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWatch, useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoaderCircle, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { useAuth } from "@/hooks/use-auth";
import { profileSchema, type ProfileValues } from "@/lib/validations";
import { updateProfile } from "@/lib/api";
import { authClient } from "@/lib/better-auth-client";

export function ProfileContent() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { refetch: refreshSession } = authClient.useSession();
  const userName = user?.name ?? "";
  const userImage = user?.image ?? "";

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: userName, image: userImage },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const control = form.control;
  const watchedImage = useWatch({ control, name: "image" });
  const preview = (watchedImage?.trim() ?? userImage).trim();

  useEffect(() => {
    if (!isLoading) reset({ name: userName, image: userImage });
  }, [isLoading, userName, userImage, reset]);

  const onSubmit = async (values: ProfileValues) => {
    try {
      await updateProfile(values);
      await refreshSession();
      router.refresh();
      toast.success("Profile updated.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update your profile.");
    }
  };

  const onError = () => toast.error("Please fix the highlighted fields.");

  return (
      <section className="py-12 md:py-16">
        <Container>
          <SectionHeading
            align="left"
            eyebrow="Profile"
            title="Your account."
            subtitle="Update your name and photo. Changes are reflected across the app."
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.45fr_0.55fr]">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-border/70 bg-card p-6 text-center">
              {isLoading ? (
                <Skeleton className="size-24 rounded-full" />
              ) : (
                <UserAvatar
                  name={userName || "User"}
                  image={preview}
                  className="size-24 text-2xl ring-4 ring-primary/15"
                />
              )}
              <div>
                <p className="font-heading text-lg font-bold text-foreground">
                  {user?.name ?? "Reader"}
                </p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="space-y-5 rounded-2xl border border-border/70 bg-card p-6"
              noValidate
            >
              <div className="space-y-1.5">
                <Label htmlFor="profile-name">Name</Label>
                <div className="relative">
                  <UserIcon
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="profile-name"
                    aria-invalid={!!errors.name}
                    className="pl-10"
                    {...register("name")}
                  />
                </div>
                {errors.name ? (
                  <p role="alert" className="text-xs font-medium text-destructive">
                    {errors.name.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-image">Photo URL</Label>
                <Input
                  id="profile-image"
                  type="url"
                  aria-invalid={!!errors.image}
                  {...register("image")}
                />
                {errors.image ? (
                  <p role="alert" className="text-xs font-medium text-destructive">
                    {errors.image.message}
                  </p>
                ) : null}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="h-11 w-full rounded-xl font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                    Saving…
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </form>
          </div>
        </Container>
      </section>
  );
}
