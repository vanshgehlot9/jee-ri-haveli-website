import Image from "next/image";
import { Card } from "@/components/ui/card";

// Define the images manually since we can't use fs in client components
const images = [
  "ASM_7765.jpg",
  "ASM_7766.jpg", 
  "ASM_7767.jpg",
  "ASM_7775.jpg",
  "ASM_7852.jpg",
  "ASM_7870.jpg",
  "ASM_7876.jpg",
  "DSC_0928.jpg",
  "DSC_0957.jpg",
  "DSC_0959.jpg",
  "DSC_0960.jpg",
  "DSC_0961.jpg",
  "DSC_0975.jpg",
  "IMG_4698.JPG",
  "WhatsApp Image 2022-07-12 at 8.52.21 PM.jpeg",
  "WhatsApp Image 2025-07-05 at 21.38.38.jpeg",
  "WhatsApp Image 2025-07-05 at 21.38.39 (1).jpeg",
  "WhatsApp Image 2025-07-05 at 21.38.47 (1).jpeg"
];

export default function GalleryPage() {

  return (
    <div className="min-h-screen bg-white pb-12">
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <h1 className="text-3xl font-normal text-gray-800 mb-8 text-center">Gallery</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <Card key={img} className="overflow-hidden shadow-lg">
              <div className="relative w-full aspect-[4/3] bg-gray-100">
                <Image
                  src={`/images/capture the moment/${img}`}
                  alt={img.replace(/\.[^.]+$/, "").replace(/[_-]/g, " ")}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority={false}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 