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
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";

import { MdDelete } from "react-icons/md";
import SingleImageUpload from "./SingleImageUpload";

const UploadForm = () => {
  const [isMultiple, setisMultiple] = useState(false);
  const [uploadedImages, setuploadedImages] = useState([]);
  const [activeIndex, setactiveIndex] = useState(-1);
  const theme = useTheme();

  useEffect(() => {
    if (uploadedImages.length === 0) {
      setactiveIndex(-1);
    }
  }, [uploadedImages]);

  useEffect(() => {
    console.log(activeIndex);
  }, [activeIndex]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 5) {
      toast.error("You can only upload a maximum of 5 images at a time.", {
        theme: theme === "dark" ? "dark" : "light",
      });
      return;
    }
    console.log(acceptedFiles);
    setuploadedImages(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="w-full flex gap-x-2 overflow-auto"
      style={{
        maxHeight: "70vh", // Dynamic max-height based on viewport
        minHeight: "400px", // Ensures a minimum height for smaller screens
      }}
    >
      {uploadedImages.length > 0 && (
        <div className="w-1/3 border border-dotted rounded-lg border-black dark:border-white overflow-y-auto max-h-full flex flex-col gap-y-3">
          {uploadedImages.map((file, index) => {
            const url = URL.createObjectURL(file);
            return (
              <div
                key={index}
                className="relative h-[200px] mt-2 mb-5 flex flex-col hover:border-gray-200 cursor-pointer border border-white m-2"
              >
                <div className="w-full flex justify-end ">
                  <div
                    className="hover:bg-gray-200 p-1 rounded-full cursor-pointer"
                    onClick={() => {
                      setuploadedImages(
                        uploadedImages.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    <MdDelete fill="red" size={20} />
                  </div>
                </div>
                <div
                  className=""
                  onClick={() => {
                    setactiveIndex(index);
                  }}
                >
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={url}
                      width={220}
                      height={200}
                      alt="Uploaded image"
                    />
                  </AspectRatio>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="w-full p-2 flex max-h-full overflow-auto">
        <div
          className={`w-full h-full border border-dashed border-black dark:border-white rounded-lg flex flex-col overflow-auto`}
        >
          {activeIndex === -1 ? (
            <div className="w-full h-full flex flex-col" id="no-image-uploaded">
              <div className="w-full flex-grow" {...getRootProps()}>
                <input {...getInputProps()} className="w-full h-full" />
                {isDragActive ? (
                  <p className="w-full h-full flex items-center justify-center">
                    Drop the files here ...
                  </p>
                ) : (
                  <p className="w-full h-full flex items-center justify-center">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                )}
              </div>
              <div className="mt-auto">
                <p className="leading-7 [&:not(:first-child)]:mt-6 flex justify-center h-[100px] container mx-auto">
                  Provide high quality images less than 20MB. The supported
                  formats are .jpg, .jpeg, .png, .gif, .webp.
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col" id="image-uploaded">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <Image
                  src={URL.createObjectURL(uploadedImages[activeIndex])}
                  width={500}
                  height={500}
                  alt="Uploaded image"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {(activeIndex !== -1 || uploadedImages.length > 0) && (
        <div className="w-1/2">
          <SingleImageUpload
            image={uploadedImages[activeIndex]}
            uploadedImages={uploadedImages}
            activeImageIndex={activeIndex}
            setuploadedImages={setuploadedImages}
          />
        </div>
      )}
    </div>
  );
};

export default UploadForm;
