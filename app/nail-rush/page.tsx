import type { Metadata } from "next";
import NailRushGame from "./NailRushGame";

export const metadata: Metadata = {
  title: "Nail Rush: Save the Salon",
  description:
    "A fast browser mini-game from Nail Coach AI by Irina Klapsha.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NailRushPage() {
  return <NailRushGame />;
}
