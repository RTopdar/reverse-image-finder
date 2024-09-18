"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  link: z.string().url("Invalid URL").optional(),
  taggedTopics: z.array(z.string()).optional(),
  board: z.string().optional(),
});

const UploadForm = () => {
  const [isMultiple, setisMultiple] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      taggedTopics: [],
      board: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <section className="w-full h-full flex gap-x-2">
      <div className="w-1/2 p-2">
        <div className="w-full h-full border border-dashed border-black dark:border-white rounded-lg flex flex-col">
          <div className="mt-auto">
            <p className="leading-7 [&:not(:first-child)]:mt-6 flex justify-center h-[100px] container mx-auto">
              Provide high quality images less than 20MB. The supported formats
              are .jpg, .jpeg, .png, .gif, .webp.
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taggedTopics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tagged Topics</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter topics separated by commas"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        const topicsArray = value
                          .split(",")
                          .map((topic) => topic.trim());
                        field.onChange(topicsArray);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter topics separated by commas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="board"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter board" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default UploadForm;
