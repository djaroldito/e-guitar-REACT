import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { RiStarSFill } from "react-icons/ri";
import axios from "axios";

const Reviews = ({setReviewForm, ReviewForm}) => {
  const { id } = useParams();
  const userId = sessionStorage.getItem('userId')
  const [review, setReview] = useState({
    user: userId,
    stars: 5,
    review: " "
  });

  console.log(id)

  const HandleSubmit = (e) => {
    e.preventDefault();
    if(review.review === ' ' || review.review === '' ) review.review = 'No message'
    axios.post(`/reviews/${id}`, review)
    console.log(review)
    setReviewForm(!ReviewForm)
  };




  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  
  };

  // console.log(validate.textarea)


  return (
    <Container >
      <h5>Please levea us a review of this product</h5>
      <form onSubmit={HandleSubmit}>
        <div className="select">
          <RiStarSFill />
          <select onChange={handleChange} name="stars">
            <option value={5}>5 - I really like</option>
            <option value={4}>4 - I just like</option>
            <option value={3}>3 - Normal</option>
            <option value={2}>2 - Don't like</option>
            <option value={1}>1 - Decepcionated</option>
          </select>
        </div>
        {review.stars < 3 ? (
          <textarea
            name="review"
            onChange={handleChange}
            placeholder="Please! Tell us what was wrong"
            maxLength={120}
          />
        ) : null}
        <button type="submit">submit</button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 500px;
  height: 400px;
  justify-content: center;
  text-align: center;
  .noShow {
    display: none;
  }

  h5{
    margin-top: 40px;
  }

  form {
    display: flex;
    flex-direction: column;
    font-size: 20px;
    margin: 20px;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    height: 70%;
    align-items: center;
  }

  .select {
    width: 60%;
    height: 25px;
    display: flex;
    justify-content: space-between;
  }

  select{
    width: 90%;
    margin-left: 10px;
  }

  textarea {
    margin-top: 10%;
    height: 100px;
    max-height: 100px;
    min-height: 100px;
    max-width: 60%;
    min-width: 60%;
    width: 60%;
  }

  button {
    border-radius: 5px;
    padding: 10px;
    border: none;
    cursor: pointer;
    margin-top: 15%;
    width: 250px;
    background-color: rgb(76, 49, 138);
    color: whitesmoke;
    font-weight: 600;
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;

export default Reviews;
