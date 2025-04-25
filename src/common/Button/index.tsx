import { StyledButton, ButtonContainer, ButtonImage } from "./styles";
import { ButtonProps } from "../types";

export const Button = ({ color, children, onClick, imageSrc }: ButtonProps) => (
  <ButtonContainer>
    <StyledButton color={color} onClick={onClick}>
      {children}
    </StyledButton>
    {imageSrc && <ButtonImage src={imageSrc} alt="Button Image" />}
  </ButtonContainer>
);






//code origine
// import { StyledButton } from "./styles";
// import { ButtonProps } from "../types";

// export const Button = ({ color, children, onClick }: ButtonProps) => (
//   <StyledButton color={color} onClick={onClick}>
//     {children}
//   </StyledButton>
// );
