import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { ContactProps, ValidationTypeProps } from "./types";
import { Button } from "../../common/Button";
import Block from "../Block";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import { ContactContainer, FormGroup, Span, ButtonContainer } from "./styles";
import axios from "axios";
import { useState } from "react";

// Interface pour les valeurs du formulaire
interface FormValues {
  name: string;
  email: string;
  message: string;
}

// Interface pour les erreurs
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Interface pour la réponse du backend
interface ContactResponse {
  message: string;
  contact: {
    name: string;
    email: string;
    message: string;
  };
}

const Contact = ({ title, content, id, t }: ContactProps) => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Composant pour afficher les erreurs de validation
  const ValidationType = ({ type }: ValidationTypeProps) => {
    const ErrorMessage = errors[type as keyof FormErrors];
    return ErrorMessage ? <Span>{ErrorMessage}</Span> : null;
  };

  // Fonction de validation
  const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};
    if (!values.name) {
      errors.name = t("Le nom est requis");
    }
    if (!values.email) {
      errors.email = t("L'email est requis");
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = t("L'email est invalide");
    }
    if (!values.message) {
      errors.message = t("Le message est requis");
    }
    return errors;
  };

  const onSubmit = async () => {
    // Valider les données
    const newErrors = validate(formValues);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setErrorMessage(t("❌ Veuillez corriger les erreurs dans le formulaire."));
      return;
    }

    try {
      const res = await axios.post<ContactResponse>("/api/contacts", {
        name: formValues.name,
        email: formValues.email,
        message: formValues.message,
      });
      setSuccessMessage(res.data.message);
      setErrorMessage("");
      setFormValues({ name: "", email: "", message: "" });
      setErrors({});
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.error || t("❌ Erreur lors de l'envoi du message.")
      );
      setSuccessMessage("");
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
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
            <FormGroup autoComplete="off" onSubmit={handleFormSubmit}>
              <Col span={24}>
                <Input
                  type="text"
                  name="name"
                  placeholder={t("Votre Nom")}
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues({ ...formValues, name: e.target.value })
                  }
                />
                <ValidationType type="name" />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="email"
                  placeholder={t("Votre E-mail")}
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues({ ...formValues, email: e.target.value })
                  }
                />
                <ValidationType type="email" />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder={t("Votre Message")}
                  value={formValues.message}
                  name="message"
                  onChange={(e) =>
                    setFormValues({ ...formValues, message: e.target.value })
                  }
                />
                <ValidationType type="message" />
              </Col>
              <ButtonContainer>
                <Button name="submit">{t("Envoyer")}</Button>
              </ButtonContainer>
              {successMessage && (
                <Span style={{ color: "green" }}>{successMessage}</Span>
              )}
              {errorMessage && (
                <Span style={{ color: "red" }}>{errorMessage}</Span>
              )}
            </FormGroup>
          </Slide>
        </Col>
      </Row>
    </ContactContainer>
  );
};

export default withTranslation()(Contact);

// avant backend

// import { Row, Col } from "antd";
// import { withTranslation } from "react-i18next";
// import { Slide } from "react-awesome-reveal";
// import { ContactProps, ValidationTypeProps } from "./types";
// import { useForm } from "../../common/utils/useForm";
// import validate from "../../common/utils/validationRules";
// import { Button } from "../../common/Button";
// import Block from "../Block";
// import Input from "../../common/Input";
// import TextArea from "../../common/TextArea";
// import { ContactContainer, FormGroup, Span, ButtonContainer } from "./styles";

// const Contact = ({ title, content, id, t }: ContactProps) => {
//   const { values, errors, handleChange, handleSubmit } = useForm(validate);

//   const ValidationType = ({ type }: ValidationTypeProps) => {
//     const ErrorMessage = errors[type as keyof typeof errors];
//     return <Span>{ErrorMessage}</Span>;
//   };

//   return (
//     <ContactContainer id={id}>
//       <Row justify="space-between" align="middle">
//         <Col lg={12} md={11} sm={24} xs={24}>
//           <Slide direction="left" triggerOnce>
//             <Block title={title} content={content} />
//           </Slide>
//         </Col>
//         <Col lg={12} md={12} sm={24} xs={24}>
//           <Slide direction="right" triggerOnce>
//             <FormGroup autoComplete="off" onSubmit={handleSubmit}>
//               <Col span={24}>
//                 <Input
//                   type="text"
//                   name="Nom"
//                   placeholder="Votre Nom"
//                   value={values.name || ""}
//                   onChange={handleChange}
//                 />
//                 <ValidationType type="name" />
//               </Col>
//               <Col span={24}>
//                 <Input
//                   type="text"
//                   name="email"
//                   placeholder="Votre E-mail"
//                   value={values.email || ""}
//                   onChange={handleChange}
//                 />
//                 <ValidationType type="email" />
//               </Col>
//               <Col span={24}>
//                 <TextArea
//                   placeholder="Votre Message"
//                   value={values.message || ""}
//                   name="message"
//                   onChange={handleChange}
//                 />
//                 <ValidationType type="message" />
//               </Col>
//               <ButtonContainer>
//                 <Button name="submit">{t("Envoyer")}</Button>
//               </ButtonContainer>
//             </FormGroup>
//           </Slide>
//         </Col>
//       </Row>
//     </ContactContainer>
//   );
// };

// export default withTranslation()(Contact);

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
