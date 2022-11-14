import { ProductStyle } from "../styles/ProductStyle";
import Link from "next/link";

export default function Product({ product }) {
  //extract info from props

  const { title, price, image, slug } = product.attributes;
  //   console.log(product);

  return (
    <ProductStyle>
      <Link href={`/product/${slug}`}>
        <div>
          <img src={image.data.attributes.formats.small.url} alt="" />
        </div>
        <h2>{title}</h2>

        <h3>price: ${price}</h3>
      </Link>
    </ProductStyle>
  );
}
