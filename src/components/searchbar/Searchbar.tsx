import { useState } from "react";

const Searchbar = ({
  handleSearch,
}: {
  filter: string;
  handleSearch: (value: string) => void;
}) => {
  const [value, setValue] = useState("");

  return (
    <form
      className="flex w-full px-10 justify-between"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        placeholder="Search by ID"
        value={value || ""}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="uppercase p-2 border-4 rounded-lg border-slate-200"
        onClick={() => handleSearch(value)}
      >
        Search
      </button>
    </form>
  );
};

export default Searchbar;
