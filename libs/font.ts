import { Inter, Roboto, Roboto_Slab } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
});
export const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap'
});
export const robotoSlab = Roboto_Slab({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap'
});