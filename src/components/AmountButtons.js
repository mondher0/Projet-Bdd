import React from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase } from "../features/cart/cart-slice";

const AmountButtons = ({ id }) => {
  const { amount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <Wrapper className="amount-btns">
      <button
        type="button"
        className="amount-btn"
        onClick={() => {
          dispatch(decrease({ id }));
        }}
      >
        <FaMinus />
      </button>
      <h2 className="amount">{amount}</h2>
      <button
        type="button"
        className="amount-btn"
        onClick={() => dispatch(increase({ id }))}
      >
        <FaPlus />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
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
`;

export default AmountButtons;
