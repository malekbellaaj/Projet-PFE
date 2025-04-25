import { TFunction } from "react-i18next";
import { ReactNode } from "react";
export interface ContentBlockProps {
  icon: string;
  title: string | ReactNode; //  on peut accepter ici une image ou bien texte
  content: string;
  section?: {
    title: string;
    content: string;
    icon: string;
  }[];
  button?: {
    title: string;
    color?: string;
    link?: string;
    imageSrc?: string;
  }[];
  t: TFunction;
  id: string;
  direction: "left" | "right";
  className?: string; // Ajout pour supporter la classe CSS
}
