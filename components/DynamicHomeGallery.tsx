
import { getGalleryImages } from "@/app/actions/gallery";
import LightBoxGallery from "@/components/LightBoxGallery";

export default async function DynamicHomeGallery() {
  const { data: images } = await getGalleryImages("home");
  
  // Fallback if no images are uploaded yet (preserve layout structure visually or show empty?)
  // User asked for dynamic, so we show what's there.
  
  if (!images || images.length === 0) {
      // Optional: Return the old static images as fallback? Or just empty?
      // Let's assume user wants to see their uploads. If empty, it's empty.
      return <div className="text-center p-4"></div>;
  }

  return (
    <LightBoxGallery layout="masonry" images={images.map((img, index) => ({
        src: img.url,
        alt: img.title || "Gallery Image",
        className: `width${(index % 10) + 1} wow zoomIn` // Preserve legacy width classes
    }))} />
  );
}
