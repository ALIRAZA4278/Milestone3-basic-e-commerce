"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

const Filter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 mb-10 flex justify-center">
      <div className="flex gap-6 justify-center items-center bg-white shadow-md rounded-lg pb-2 w-full max-w-4xl mb-5">


        {/* Filter Section */}
        <div className="flex flex-col gap-6 items-center">
          <h1 className="block text-lg font-semibold">Filter Products by Price Range</h1>
          <div className="flex gap-4">

            {/* Min Price */}
            <div className="flex flex-col items-center gap-2">
              <label className="text-sm font-semibold text-gray-600">Min Price</label>
              <input
                type="number"
                name="min"
                placeholder="Min Price"
                className="text-xs rounded-lg pl-3 py-2 w-28 bg-gray-100 ring-1 ring-gray-300 focus:ring-gray-500"
                onChange={handleFilterChange}
              />
            </div>

            {/* Max Price */}
            <div className="flex flex-col items-center gap-2">
              <label className="text-sm font-semibold text-gray-600">Max Price</label>
              <input
                type="number"
                name="max"
                placeholder="Max Price"
                className="text-xs rounded-lg pl-3 py-2 w-28 bg-gray-100 ring-1 ring-gray-300 focus:ring-gray-500"
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
