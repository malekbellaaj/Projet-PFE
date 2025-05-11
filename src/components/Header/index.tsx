import { useState } from "react";
import { Row, Col, Drawer } from "antd";
import { withTranslation, TFunction } from "react-i18next";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
import { Button } from "../../common/Button";

import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
} from "./styles";

const Header = ({ t }: { t: TFunction }) => {
  const [visible, setVisibility] = useState(false);

  const toggleButton = () => {
    setVisibility(!visible);
  };

  const MenuItem = () => {
    const scrollTo = (id: string) => {
      const element = document.getElementById(id) as HTMLDivElement;
      element.scrollIntoView({
        behavior: "smooth",
      });
      setVisibility(false);
    };

    const goToUserPage = () => {
      window.open("/userrole", "_blank"); // ouvre la page dans un nouvel onglet
      setVisibility(false);
    };

    const goToConnexionPage = () => {
      window.open("/userroleconn", "_blank"); // ouvre dans un nouvel onglet
      setVisibility(false); // cache l'élément si nécessaire
    };

    return (
      <>
        <CustomNavLinkSmall onClick={() => scrollTo("apercu")}>
          <Span>{t("A propos")}</Span>
        </CustomNavLinkSmall>

        <CustomNavLinkSmall onClick={() => scrollTo("mission")}>
          <Span>{t("Enseignants")}</Span>
        </CustomNavLinkSmall>

        <CustomNavLinkSmall style={{ width: "180px" }} onClick={goToUserPage}>
          <Span>
            <Button>{t("Inscription")}</Button>
          </Span>
        </CustomNavLinkSmall>

        <CustomNavLinkSmall
          style={{ width: "180px" }}
          onClick={goToConnexionPage}
        >
          <Span>
            <Button>{t("Connection")}</Button>
          </Span>
        </CustomNavLinkSmall>
      </>
    );
  };

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          <LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="altus_logo_SB.png" width="101px" height="100px" />
          </LogoContainer>
          <NotHidden>
            <MenuItem />
          </NotHidden>
          <Burger onClick={toggleButton}>
            <Outline />
          </Burger>
        </Row>
        <Drawer closable={false} open={visible} onClose={toggleButton}>
          <Col style={{ marginBottom: "2.5rem" }}>
            <Label onClick={toggleButton}>
              <Col span={12}>
                <Menu>Menu</Menu>
              </Col>
              <Col span={12}>
                <Outline />
              </Col>
            </Label>
          </Col>
          <MenuItem />
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default withTranslation()(Header);
