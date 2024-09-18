"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Context } from "@/context/Context";
import { useContext } from "react";
const SearchBar = () => {
  const { searchText, handleSearchText } = useContext(Context);
  return (
    <div className="flex w-full gap-x-2">
      <Input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(event) => {
          handleSearchText(event.target.value);
        }}
      />
      <Button
        type="submit"
        onClick={() => {
          handleSearchText("");
        }}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
