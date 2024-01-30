"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  companyName: z.string().min(1, {
    message: "必須項目です",
  }),
  deadline: z.string().min(1, {
    message: "必須項目です",
  }),
});
export function CreateProjectForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      deadline: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    values.deadline = new Date(values.deadline).toISOString();

    // /api/project に POST
    fetch("/api/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => router.push(`/dashboard/${data.uuid}`))
      .catch((error) => console.error(error));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">会社名</FormLabel>
              <FormControl>
                <Input placeholder="株式会社MIXI" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">期限</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  placeholder="2023/03/14"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="sm:justify-start ">
          <DialogClose asChild>
            <Button type="submit" className="my-3 w-full bg-secondary">
              作成
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
