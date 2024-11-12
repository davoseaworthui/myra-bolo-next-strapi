import { DM_Sans, DM_Serif_Display, Inter, Pacifico, Jost } from "next/font/google";

export const dm_sans = DM_Sans({
  weight: ['500', '700'],
  subsets: ['latin'],
});

export const dm_serif_dsplay = DM_Serif_Display({
  weight: ["400"],
  subsets: ['latin'],
});


export const pacifico = Pacifico({
  weight: ['400'],
  subsets: ['latin'],
})

export const jost = Jost({
  weight: ['500'],
  subsets: ['latin'],
})


export const inter = Inter({ subsets: ["latin"] })