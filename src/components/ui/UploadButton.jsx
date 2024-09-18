"use client";
import { BsUpload } from "react-icons/bs";
import { Button } from "./button";
import { useRouter } from "next/navigation";
const UploadButton = () => {
  const router = useRouter();
  return (
    <Button
      className="flex gap-x-1"
      onClick={() => {
        router.push("/upload");
      }}
    >
      <BsUpload className="font-white" />
      <span className="font-white ">Upload</span>
    </Button>
  );
};

export default UploadButton;
