import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const Home = () => {
  const productList = [
    {
      id: 1,
      name: "Smartphone",
      price: 599.99,
      imgSrc:
        "https://static-01.daraz.pk/p/57951d8d73c207819651b34d9383f47a.jpg_300x0q75.webp",
    },
    {
      id: 2,
      name: "Laptop",
      price: 1299.99,
      imgSrc:
        "https://pk-live-21.slatic.net/kf/S48c3871261c941f39ac4fe07097ce505g.jpg_300x0q75.webp",
    },
    {
      id: 3,
      name: "Headphones",
      price: 149.99,
      imgSrc:
        "https://static-01.daraz.pk/p/596efbdb59c52f8f5372636cb4111254.jpg_300x0q75.webp",
    },
  ];

  const dispatch = useDispatch();

  const addToCartHandler = (options) => {
    dispatch({ type: "addToCart", payload: options });
    dispatch({
      type: "calculatedPrice",
    });
    toast.success("Added to Cart");
  };
  return (
    <div className="home">
      {productList.map((i) => (
        <ProductCard
          key={i.id}
          id={i.id}
          name={i.name}
          imgSrc={i.imgSrc}
          price={i.price}
          handler={addToCartHandler}
        />
      ))}
    </div>
  );
};

const ProductCard = ({ name, id, price, imgSrc, handler }) => (
  <div className="productCard">
    <img src={imgSrc} alt={name} />
    <p>{name}</p>
    <h4>{price}</h4>
    <button onClick={() => handler({ name, imgSrc, price, id, quantity: 1 })}>
      Add to Cart
    </button>
  </div>
);

export default Home;
