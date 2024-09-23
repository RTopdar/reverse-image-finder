import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  link: z
    .string()
    .optional()
    .refine((value) => !value || z.string().url().safeParse(value).success, {
      message: "Invalid URL",
    }),
  taggedTopics: z.array(z.string()).optional(),
  board: z.string().optional(),
});

const SingleImageUpload = ({
  uploadedImages,
  activeImageIndex,
  image,
  setuploadedImages,
}) => {
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

  const onSubmit = (data) => {
    setformData((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  };
  const [formData, setformData] = useState();

  useEffect(() => {
    // console.log(uploadedImages);
    console.log(activeImageIndex);
    // console.log(image, "image");
  }, []);

  useEffect(() => {
    setformData({
      file: image,
    });
  }, [image]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <section
      className="w-full overflow-y-auto flex gap-x-3"
      style={{
        maxHeight: "70vh", // Dynamic max-height based on viewport
        minHeight: "400px", // Ensures a minimum height for smaller screens
      }}
    >
      <div className="w-full">
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
            <Button
              type="submit"
              disabled={uploadedImages.length === 0 || activeImageIndex === -1}
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SingleImageUpload;
