import styled from "styled-components";

export const ContactContainer = styled("div")`
  padding: 5rem 0;

  @media only screen and (max-width: 1024px) {
    padding: 3rem 0;
  }
`;

export const FormGroup = styled("form")`
  width: 100%;
  max-width: 520px;

  @media only screen and (max-width: 1045px) {
    max-width: 100%;
    margin-top: 2rem;
  }
`;

export const Span = styled("span")`
  display: block;
  font-weight: 600;
  color: rgb(203, 153, 201);
  height: 0.775rem;
  padding: 0 0.675rem;
`;

export const ButtonContainer = styled("div")`
  text-align: end;
  position: relative;

  @media only screen and (max-width: 414px) {
    padding-top: 0.75rem;
  }
`;







// import styled from "styled-components";

// export const ContactContainer = styled.div`
//   background-color: #9bd3dd; /* Bleu clair */
//   padding: 3rem;
//   border-radius: 20px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//   text-align: center;
//   max-width: 600px;
//   margin: auto;
// `;

// export const FormGroup = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
//   margin-top: 2rem;
// `;

// export const InputField = styled.input`
//   width: 100%;
//   padding: 12px;
//   border: 2px solid #ffffff;
//   border-radius: 25px;
//   background: white;
//   font-size: 1rem;
//   color: black;
//   outline: none;
//   text-align: center;
//   transition: border 0.3s;

//   &:focus {
//     border-color: #ff9a8b;
//   }
// `;

// export const TextAreaField = styled.textarea`
//   width: 100%;
//   padding: 12px;
//   border: 2px solid #ffffff;
//   border-radius: 25px;
//   background: white;
//   font-size: 1rem;
//   color: black;
//   outline: none;
//   text-align: center;
//   resize: none;
//   transition: border 0.3s;

//   &:focus {
//     border-color: #ff9a8b;
//   }
// `;

// export const ButtonContainer = styled.div`
//   text-align: center;
//   margin-top: 1.5rem;
// `;

// export const SubmitButton = styled.button`
//   background: #ff9a8b;
//   border: none;
//   padding: 15px;
//   width: 100%;
//   font-size: 1.2rem;
//   font-weight: bold;
//   color: white;
//   border-radius: 30px;
//   cursor: pointer;
//   transition: 0.3s;

//   &:hover {
//     background: #ff6f61;
//   }
// `;

// export const Span = styled.span`
//   display: block;
//   font-weight: 600;
//   color: rgb(203, 153, 201);
//   height: 1rem;
//   padding: 0 0.675rem;
// `;









