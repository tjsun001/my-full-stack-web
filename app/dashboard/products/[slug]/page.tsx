import api from "@/lib/axios";
import { TProduct } from "@/types";

type ParamsProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: ParamsProps) {
  // Unwrap the promise
  const { slug } = await params;

  try {
    // Fetch product data
    const { data }: { data: TProduct } = await api.get(
      `/api/v1/products/${slug}`,
    );

    // Render the product details (example: JSON)
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  } catch (error: any) {
    const statusCode = error?.response?.status;

    if (statusCode === 404) {
      return <p>Product &quot;{slug}&quot; not found</p>;
    }

    return <p>Failed to load product</p>;
  }
}
