import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";

import "react-loading-skeleton/dist/skeleton.css";

import AISearch from "./AISearch";
import { addCart } from "../redux/action";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  const [aiSearchActive, setAiSearchActive] = useState(false);
  const [aiSearchQuery, setAiSearchQuery] = useState("");

  const componentMounted = useRef(true);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);

      const response = await fetch("https://fakestoreapi.com/products/");

      if (componentMounted.current) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      componentMounted.current = false;
    };
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
    setAiSearchActive(false);
    setAiSearchQuery("");
  };

  const handleAISearchResults = (results, query) => {
    setFilter(results);
    setAiSearchActive(true);
    setAiSearchQuery(query);
    toast.success(`AI found ${results.length} products for: "${query}"`);
  };

  const clearAISearch = () => {
    setFilter(data);
    setAiSearchActive(false);
    setAiSearchQuery("");
  };

  const ShowProducts = () => {
    return (
      <>
        <AISearch
          onSearchResults={handleAISearchResults}
          products={data}
          loading={loading}
        />

        {aiSearchActive && (
          <div className="alert alert-info text-center mb-4">
            <strong>🤖 AI Search Results:</strong> "{aiSearchQuery}"
            <button
              className="btn btn-sm btn-outline-info ms-3"
              onClick={clearAISearch}
            >
              Clear AI Search
            </button>
          </div>
        )}

        <div className="buttons text-center mb-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => {
              setFilter(data);
              setAiSearchActive(false);
              setAiSearchQuery("");
            }}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>

        {filter.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}</li>
                  <li className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Rating: {product.rating?.rate || "N/A"}/5</span>
                      <span className="text-muted">
                        ({product.rating?.count || 0} reviews)
                      </span>
                    </div>
                  </li>
                </ul>
                <div className="card-body">
                  <Link
                    to={"/product/" + product.id}
                    className="btn btn-dark m-1"
                  >
                    Buy Now
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => {
                      toast.success("Added to cart");
                      addProduct(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">
            🛍️ AI-Enhanced Product Catalog
          </h2>
          <p className="text-center text-muted">
            Use natural language to find exactly what you're looking for!
          </p>
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;
