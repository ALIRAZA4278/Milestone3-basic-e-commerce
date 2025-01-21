"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let name = formData.get("name") as string;

    if (name) {
      // Replace spaces with hyphens and convert to lowercase
      name = name.trim().replace(/\s+/g, "-").toLowerCase();
      router.push(`/Shop/${name}`);
    }
  };

  return (
    <form
      className="flex items-center gap-2 bg-gray-100 p-2 rounded-md w-full sm:w-auto sm:flex-1 md:gap-4 max-[679px]:w-[50%]"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="name"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none text-sm md:text-base px-2 max-[579px]:px-0 max-[579px]:text-xs max-[579px]:py-1 "
      />
      <button className="cursor-pointer p-1 md:p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
        <Image src="/search.png" alt="Search" width={16} height={16} />
      </button>
    </form>
  );
};

export default SearchBar;
