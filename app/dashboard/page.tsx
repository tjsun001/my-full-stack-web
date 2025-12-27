"use client";

import { useEffect, useState } from "react";

import api from "@/lib/axios";

// http://product.thurmans-playground.com:5050/api/v1/products

const Page = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const { data } = await api.get("api/v1/products");
    // setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const products = data.map((p: any, index: number) => {
    return (
      <div key={index}>
        <h1>{p.id}</h1>
        <p>{p.name}</p>
        <p>{p.description}</p>
        <p>{p.price}</p>
        <hr />
        <br />
      </div>
    );
  });
  return products;
};

export default Page;
