import api from "@/lib/axios";
import { TProduct } from "@/types";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const Page = async ({ params }: Props) => {
  console.log(params);
  const { slug } = await params;

  try {
    const { data }: { data: TProduct } = await api.get(
      `/api/v1/products/${slug}`,
    );
    return "product detail ==> " + JSON.stringify(data, null, 2);
  } catch (error: any) {
    const statusCode = error.response.status;
    if (statusCode == 404) {
      return `product [${slug}] not found`;
    }
    return "failed to load products";
  }
};

export default Page;
