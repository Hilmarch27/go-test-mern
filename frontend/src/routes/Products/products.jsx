import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Dropdown } from "flowbite-react";

function Products() {
  const baseUrl = "https://api-dummy.ganeshaoperation.com/api/products";
  const [data, setData] = useState([]);
  const [sortingType, setSortingType] = useState(null);


  //? Fetching Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  //? Sorting Harga
  useEffect(() => {
    if (sortingType === "asc") {
      setData([...data].sort((a, b) => a.price - b.price));
    } else if (sortingType === "desc") {
      setData([...data].sort((a, b) => b.price - a.price));
    }
  }, [sortingType]);

  function handleSortingChange(type) {
    setSortingType(type);
  }

  //? Format Rupiah
  function formatRupiah(angka) {
    var reverse = angka.toString().split("").reverse().join(""),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join(".").split("").reverse().join("");
    return "Rp." + ribuan;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-5">Daftar Produk</h1>

      <div className="flex gap-2 justify-start mb-5">
        <Dropdown label="Fillter Harga" dismissOnClick={false}>
          <Dropdown.Item>Semua</Dropdown.Item>
          <Dropdown.Item>0 - 100.000</Dropdown.Item>
          <Dropdown.Item>100.000 - 200.000</Dropdown.Item>
          <Dropdown.Item>500.000 - 1.000.000</Dropdown.Item>
          <Dropdown.Item>Lebih Dari 1.000.000</Dropdown.Item>
        </Dropdown>

        <Dropdown label="Sorting Harga" dismissOnClick={false}>
          <Dropdown.Item onClick={() => handleSortingChange("asc")}>
            Terendah
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortingChange("desc")}>
            Tertinggi
          </Dropdown.Item>
        </Dropdown>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <Card
            className="max-w-sm img-thumbnail shadow-xl h-48"
            imgSrc={item.image_url}
            horizontal
            key={item.id}
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.name}
            </h5>
            <Link to="#">
              <p className="font-normal text-blue-400 dark:text-blue-400">
                {item.description}
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
