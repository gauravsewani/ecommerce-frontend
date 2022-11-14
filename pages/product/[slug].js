import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import {
  Buy,
  DetailsStyle,
  ProductInfo,
  Quantity,
} from "../../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
//Context
import { useStateContext } from "../../lib/context";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export default function ProductDetails() {
  const { qty, increaseQty, decreaseQty, onAdd, setQty } = useStateContext();

  useEffect(() => {
    setQty(1);
  }, [setQty]);
  //Fetch slug
  const { query } = useRouter();

  //Fetch Graphql Data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  // Check for data coming in
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no.... {error.message} </p>;
  //   console.log(data);

  //Extract the data
  const { title, description, image } = data.products.data[0].attributes;

  //Create a toast
  const notify = () => {
    toast.success(`${title} added to your cart`, { duration: 1000 });
  };

  return (
    <DetailsStyle>
      <img src={image.data.attributes.formats.medium.url} alt={title} />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>
        <Quantity>
          <span>Quantity</span>
          <button>
            <AiFillMinusCircle onClick={decreaseQty} />
          </button>
          <p>{qty}</p>
          <button>
            <AiFillPlusCircle onClick={increaseQty} />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            onAdd(data.products.data[0].attributes, qty);
            notify();
          }}
        >
          Add to cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
