import React, { useState } from "react";
import styled from "styled-components";
import axiosInstance from "../utils/helpers";
import { baseUrl } from "../utils/constants";
const Contact = () => {
  const [report, setReport] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      window.location.href = "/login";
      return;
    }
    try {
      const data = {
        comment: report,
      };
      setIsLoading(true);
      const response = await axiosInstance.post(`${baseUrl}reports`, data);
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log(error);
    }
  };
  return (
    <Wrapper>
      <div className="section-center">
        {error && alert("Something went wrong")}
        <h3>You have a problem report us</h3>
        <div className="content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            sint unde quaerat ratione soluta veniam provident adipisci cumque
            eveniet tempore?
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <textarea
              type="email"
              className="form-input"  
              onChange={(e) => {
                setError(false);
                setReport(e.target.value);
              }}
            ></textarea>
            <button type="submit" className="submit-btn">
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding: 5rem 0;
  h3 {
    text-transform: none;
  }
  p {
    line-height: 2;
    max-width: 45em;
    color: var(--clr-grey-5);
  }
  .contact-form {
    width: 90vw;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .form-input,
  .submit-btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid var(--clr-black);
  }
  .form-input {
    border-right: none;
    color: var(--clr-grey-3);
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }
  .submit-btn {
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
  .form-input::placeholder {
    color: var(--clr-black);
    text-transform: capitalize;
  }
  .submit-btn {
    background: var(--clr-primary-5);
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    cursor: pointer;
    transition: var(--transition);
    color: var(--clr-black);
  }
  .submit-btn:hover {
    color: var(--clr-white);
  }
  @media (min-width: 992px) {
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 8rem;
      margin-top: 2rem;
    }
    p {
      margin-bottom: 0;
    }
  }
  @media (min-width: 1280px) {
    padding: 15rem 0;
  }
`;

export default Contact;
