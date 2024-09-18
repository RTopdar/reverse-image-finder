import React from "react";
import UploadForm from "./UploadForm";

const page = () => {
  return (
    <main className="w-full h-full ">
      <section className="container mx-auto">
        <h1 className="scroll-m-20 mt-5 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Upload an Image
        </h1>
        <h2 className="mt-10 scroll-m-20  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Create a new post to find similar images
        </h2>
        <UploadForm />
      </section>
    </main>
  );
};

export default page;
