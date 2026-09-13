import { Metadata } from "next";
import { cookies } from "next/headers";
import { GALLERY_COOKIE_NAME, verifySessionToken } from "@/lib/gallery-auth";
import FranzKoppGallery, { MediaItem } from "@/components/franz-kopp/FranzKoppGallery";
import PasswordGate from "@/components/franz-kopp/PasswordGate";
import galleryData from "@/data/gallery-data.json";

export const metadata: Metadata = {
  title: "Archiv Franz Kopp",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

export default function FranzKoppPage() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(GALLERY_COOKIE_NAME);
  const isAuthenticated = verifySessionToken(sessionCookie?.value);

  if (!isAuthenticated) {
    return <PasswordGate onSuccess={() => window.location.reload()} />;
  }

  const items: MediaItem[] = [...(galleryData.photos as MediaItem[]), ...(galleryData.videos as MediaItem[])];

  return <FranzKoppGallery items={items} />;
}
