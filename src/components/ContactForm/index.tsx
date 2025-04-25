import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { ContactProps, ValidationTypeProps } from "./types";
import { useForm } from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import { Button } from "../../common/Button";
import Block from "../Block";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import { ContactContainer, FormGroup, Span, ButtonContainer } from "./styles";

const Contact = ({ title, content, id, t }: ContactProps) => {
  const { values, errors, handleChange, handleSubmit } = useForm(validate);

  const ValidationType = ({ type }: ValidationTypeProps) => {
    const ErrorMessage = errors[type as keyof typeof errors];
    return <Span>{ErrorMessage}</Span>;
  };

  return (
    <ContactContainer id={id}>
      <Row justify="space-between" align="middle">
        <Col lg={12} md={11} sm={24} xs={24}>
          <Slide direction="left" triggerOnce>
            <Block title={title} content={content} />
          </Slide>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Slide direction="right" triggerOnce>
            <FormGroup autoComplete="off" onSubmit={handleSubmit}>
              <Col span={24}>
                <Input
                  type="text"
                  name="Nom"
                  placeholder="Votre Nom"
                  value={values.name || ""}
                  onChange={handleChange}
                />
                <ValidationType type="name" />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="email"
                  placeholder="Votre E-mail"
                  value={values.email || ""}
                  onChange={handleChange}
                />
                <ValidationType type="email" />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder="Votre Message"
                  value={values.message || ""}
                  name="message"
                  onChange={handleChange}
                />
                <ValidationType type="message" />
              </Col>
              <ButtonContainer>
                <Button name="submit">{t("Envoyer")}</Button>
              </ButtonContainer>
            </FormGroup>
          </Slide>
        </Col>
      </Row>
    </ContactContainer>
  );
};

export default withTranslation()(Contact);




// import { ContactContainer, FormGroup, InputField, TextAreaField, ButtonContainer, SubmitButton, Span } from "./styles";

// const Contact = ({ title, content, id, t }: ContactProps) => {
//   const { values, errors, handleChange, handleSubmit } = useForm(validate);

//   return (
//     <ContactContainer id={id}>
//       <h2 style={{ color: "white", textTransform: "uppercase" }}>{title}</h2>
//       <p style={{ color: "white" }}>{content}</p>

//       <FormGroup autoComplete="off" onSubmit={handleSubmit}>
//         <InputField
//           type="text"
//           name="name"
//           placeholder="Nom et Prénom*"
//           value={values.name || ""}
//           onChange={handleChange}
//         />
//         <Span>{errors.name}</Span>

//         <InputField
//           type="text"
//           name="email"
//           placeholder="Email Académique*"
//           value={values.email || ""}
//           onChange={handleChange}
//         />
//         <Span>{errors.email}</Span>

//         <TextAreaField
//           placeholder="Votre Message*"
//           value={values.message || ""}
//           name="message"
//           onChange={handleChange}
//         />
//         <Span>{errors.message}</Span>

//         <ButtonContainer>
//           <SubmitButton type="submit">{t("Commencer")}</SubmitButton>
//         </ButtonContainer>
//       </FormGroup>
//     </ContactContainer>
//   );
// };

// export default withTranslation()(Contact);
