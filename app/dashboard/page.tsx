// 'use client';
// import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import api from "@/lib/axios";
import { TProduct } from "@/types";

// http://product.thurmans-playground.com:5050/api/v1/products

const Page = async () => {
  const { data, status } = await api.get("/api/v1/products");

  if (status != 200) {
    return (
      <p className="text-red-500">Opps there was an error.. please try again</p>
    );
  }

  console.log(data);

  const products = data.map((p: TProduct, index: number) => {
    return (
      <div key={index} className="w-sm">
        <ProductCard
          name={p.name}
          price={p.price}
          imageUrl={`/assets/products/${p.name}.jpg`}
          link={`/dashboard/products/${p.id}`}
        />
      </div>
    );
  });
  //   return products;
  return (
    <div className="space-y-5 md:space-y-8">
      <h2 className="text-lg md:text-xl">Explore Products</h2>
      <div className="flex flex-wrap gap-4 md:gap-6">{products}</div>
    </div>
  );
};

export default Page;
