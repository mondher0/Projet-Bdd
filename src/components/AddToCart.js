import React, { useState } from "react";
import styled from "styled-components";
import axiosInstance from "../utils/helpers";
import AmountButtons from "./AmountButtons";
import { FaMinus, FaPlus } from "react-icons/fa";
import { baseUrl } from "../utils/constants";
const AddToCart = ({ id }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(1);
  const token = localStorage.getItem("token");
  // order a product
  const handleOrder = async () => {
    try {
      setLoading(true);
      const data = {
        products: [
          {
            productId: parseInt(id),
            quantity: amount,
          },
        ],
      };
      console.log(data);
      const response = await axiosInstance.post(`${baseUrl}orders/new`, data);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper>
      <div className="colors">{error && alert("Something went wrong")}</div>
      <div className="btn-container">
        <div className="con">
          <button
            type="button"
            className="amount-btn"
            onClick={() => {
              setAmount((oldAmount) => {
                let tempAmount = oldAmount - 1;
                if (tempAmount < 1) {
                  tempAmount = 1;
                }
                return tempAmount;
              });
            }}
          >
            <FaMinus />
          </button>
          <h2 className="amount">{amount}</h2>
          <button
            type="button"
            className="amount-btn"
            onClick={() => {
              setAmount((oldAmount) => {
                let tempAmount = oldAmount + 1;
                if (tempAmount > 10) {
                  tempAmount = 10;
                }
                return tempAmount;
              });
            }}
          >
            <FaPlus />
          </button>
        </div>
        <button
          className="btn"
          onClick={() => {
            if (token) {
              handleOrder();
            } else {
              window.location.href = "/login";
            }
          }}
        >
          {loading ? "Ordring..." : "Order"}
        </button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
    padding: 10px;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
    padding: 10px;
  }
  h2 {
    margin-bottom: 0;
  }
  .amount-btn {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
  .con {
    display: grid;
    width: 140px;
    justify-items: center;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
  }
`;
export default AddToCart;
