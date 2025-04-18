"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface Image {
  title: string;
  url: string;
}

interface ImageGalleryProps {
  images: Image[];
  title: string;
  initialIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImageGallery({
  images,
  title,
  initialIndex,
  open,
  onOpenChange,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Reset current index when the gallery opens with a new initial index
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
    }
  }, [initialIndex, open]);
  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  // Then update the useEffect dependency array to include these:
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange, handlePrevious, handleNext]);

  if (!open || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl sm:max-w-[80vw] md:max-w-[85vw] p-0 gap-0 overflow-hidden">
        <div className="relative flex flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <div className="space-y-1">
              <DialogTitle className="text-lg">
                {title} - {currentIndex + 1} of {images.length}
              </DialogTitle>
              {currentImage.title && (
                <p className="text-sm text-muted-foreground">
                  {currentImage.title}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <div className="relative flex items-center justify-center bg-muted/30 p-4">
            <div className="relative aspect-auto max-h-[70vh] w-full overflow-hidden rounded-md">
              <Image
                src={currentImage.url}
                alt={currentImage.title || `Image ${currentIndex + 1}`}
                className="mx-auto h-auto max-h-[70vh] w-auto max-w-full object-contain"
                width={800} // Match placeholder width
                height={600} // Match placeholder height
              />
            </div>

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 h-10 w-10 rounded-full bg-background/80 shadow-sm backdrop-blur-sm hover:bg-background/90"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous image</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 h-10 w-10 rounded-full bg-background/80 shadow-sm backdrop-blur-sm hover:bg-background/90"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next image</span>
                </Button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex items-center justify-center gap-2 border-t p-4">
              <div className="flex gap-1 overflow-auto py-1">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                      currentIndex === index
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/50"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.title || `Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                      width={100}
                      height={100}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
