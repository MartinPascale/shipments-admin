import React, { useEffect, useState } from "react";
import axios from "axios";
import Searchbar from "../components/searchbar/Searchbar";
import ShipmentsTable from "../components/shipments-table/ShipmentsTable";

const Home = () => {
  const [data, setData] = useState([]);
  const [searchedData, setSearchedData] = useState(data);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setSearchedData(
      data.filter(({ id }: { id: string }) => id.includes(value))
    );
    setHasSearched(true);
  };

  useEffect(() => {
    const getShipments = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/shipments");
        setData(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    getShipments();
  }, []);

  return (
    <div className="w-full h-full bg-slate-800 px-8 py-10 flex flex-col items-center">
      <div className="bg-white p-4 rounded-full w-1100px first-line:mx-auto mb-8">
        <Searchbar filter={searchValue} handleSearch={(e) => handleSearch(e)} />
      </div>
      <div className="bg-white w-1100px first-line:mx-auto p-4 h-full rounded-2xl flex-1 justify-between flex flex-col">
        <ShipmentsTable
          data={hasSearched ? searchedData : data}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Home;
