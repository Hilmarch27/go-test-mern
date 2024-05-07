"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Dropdown } from "flowbite-react";

function Products() {
  const baseUrl = "https://api-dummy.ganeshaoperation.com/api/products";
  const [data, setData] = useState([]);
  const [sortingType, setSortingType] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  // Fetching Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const jsonData = await response.json();
        // Mengurutkan data berdasarkan harga dari terkecil ke terbesar
        const sortedData = jsonData.data.sort((a, b) => a.price - b.price);
        setData(sortedData);
        setFilteredData(sortedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Sorting Harga
  useEffect(() => {
    if (sortingType === "asc") {
      setFilteredData([...filteredData].sort((a, b) => a.price - b.price));
    } else if (sortingType === "desc") {
      setFilteredData([...filteredData].sort((a, b) => b.price - a.price));
    }
  }, [sortingType]);

  // Filter Harga
  function handleFilterChange(range) {
    let min = 0,
      max = Infinity;
    switch (range) {
      case "0 - 100.000":
        max = 100000;
        break;
      case "100.000 - 500.000":
        min = 100000;
        max = 500000;
        break;
      case "500.000 - 1.000.000":
        min = 500000;
        max = 1000000;
        break;
      case "Lebih Dari 1.000.000":
        min = 1000000;
        break;
      default:
        break;
    }
    const filtered = data.filter(
      (item) => item.price >= min && item.price <= max
    );
    setFilteredData(filtered);
  }

  // Format Rupiah
  function formatRupiah(angka) {
    var reverse = angka.toString().split("").reverse().join(""),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join(".").split("").reverse().join("");
    return "Rp." + ribuan;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-5">Daftar Produk</h1>

      <div className="ms-2 flex gap-2 justify-center mb-5 md:justify-start">
        <Dropdown label="Filter Harga" dismissOnClick={false}>
          <Dropdown.Item onClick={() => handleFilterChange("Semua")}>
            Semua
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilterChange("0 - 100.000")}>
            0 - 100.000
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleFilterChange("100.000 - 500.000")}
          >
            100.000 - 500.000
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleFilterChange("500.000 - 1.000.000")}
          >
            500.000 - 1.000.000
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleFilterChange("Lebih Dari 1.000.000")}
          >
            {">"} 1.000.000
          </Dropdown.Item>
        </Dropdown>

        <Dropdown label="Sorting Harga" dismissOnClick={false}>
          <Dropdown.Item onClick={() => setSortingType("asc")}>
            Terendah
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSortingType("desc")}>
            Tertinggi
          </Dropdown.Item>
        </Dropdown>
      </div>

      <div className="grid grid-cols-1 gap-2 lg:gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mx-2">
        {filteredData.map((item) => (
          <Card
            className="max-w-xs lg:max-w-sm img-thumbnail shadow-xl"
            imgSrc={item.image_url}
            horizontal
            key={item.id}
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-clip lg:truncate">
              <span className="lg:hidden">{item.name}</span>
              <span className="hidden lg:block">
                {item.name.substring(0, 11)}...
              </span>
            </h5>
            <Link to="#">
              <p className="lg:hidden font-normal text-blue-400 dark:text-blue-400">
                {item.description}
              </p>
              <p className="hidden lg:block font-normal text-blue-400 dark:text-blue-400">
                {item.description.substring(0, 36)}...
              </p>
            </Link>
            <small className="text-gray-700 dark:text-gray-400 -mt-2">
              {formatRupiah(item.price)}
            </small>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Products;
