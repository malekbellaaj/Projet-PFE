import { useState } from "react";
import { Row, Col, Modal } from "antd";
import { withTranslation, TFunction } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { Button } from "../../common/Button";
import { MiddleBlockSection, Content, ContentWrapper } from "./styles";

interface MiddleBlockProps {
  id?: string;
  title: string;
  content: string;
  button: string;
  t: TFunction;
}

const MiddleBlock = ({ id, title, content, button, t }: MiddleBlockProps) => {
  const [isVideoVisible, setVideoVisible] = useState(false); // État pour gérer l'affichage du vidéo

  const openVideo = () => {
    setVideoVisible(true); // elle affiche la video
  };

  const closeVideo = () => {
    setVideoVisible(false); // elle masque le video
  };

  return (
    <MiddleBlockSection id={id}>
      <Slide direction="up" triggerOnce>
        <Row justify="center" align="middle">
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{t(title)}</h6>
              <Content>{t(content)}</Content>
              {button && (
                <Button name="submit" onClick={openVideo}>
                  {" "}
                  {/* elle ouvre la video si on clic */}
                  {t(button)}
                </Button>
              )}
            </Col>
          </ContentWrapper>
        </Row>
      </Slide>

      {/* c'est une modale pour afficher la vidéo locale */}
      <Modal
        title="Découvrir Altus"
        open={isVideoVisible}
        onCancel={closeVideo}
        footer={null} // c.a.d pas de footer
        width="50%" // le largeur du modale
        centered // pour centrer la modale
      >
        <video controls width="100%">
          <source src="/altus_video.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
      </Modal>
    </MiddleBlockSection>
  );
};

export default withTranslation()(MiddleBlock);





















//copie avant ajouter le video
// import { Row, Col } from "antd";
// import { withTranslation, TFunction } from "react-i18next";
// import { Slide } from "react-awesome-reveal";
// import { Button } from "../../common/Button";
// import { MiddleBlockSection, Content, ContentWrapper } from "./styles";

// interface MiddleBlockProps {
//   id?: string;
//   title: string;
//   content: string;
//   button: string;
//   t: TFunction;
// }

// const MiddleBlock = ({ id, title, content, button, t }: MiddleBlockProps) => {
//   const scrollTo = (id: string) => {
//     const element = document.getElementById(id) as HTMLDivElement;
//     element.scrollIntoView({
//       behavior: "smooth",
//     });
//   };
//   return (
//     <MiddleBlockSection id={id}>
//       <Slide direction="up" triggerOnce>
//         <Row justify="center" align="middle">
//           <ContentWrapper>
//             <Col lg={24} md={24} sm={24} xs={24}>
//               <h6>{t(title)}</h6>
//               <Content>{t(content)}</Content>
//               {button && (
//                 <Button name="submit" onClick={() => scrollTo("mission")}>
//                   {t(button)}
//                 </Button>
//               )}
//             </Col>
//           </ContentWrapper>
//         </Row>
//       </Slide>
//     </MiddleBlockSection>
//   );
// };

// export default withTranslation()(MiddleBlock);
