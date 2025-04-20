"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Reset zoom and loading state when image changes or gallery opens
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
      resetZoom();
      setIsLoading(true);
    }
  }, [initialIndex, open]);

  const resetZoom = () => {
    setZoom(1);
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + 0.5, 3);
    setZoom(newZoom);

    if (imageContainerRef.current && newZoom > 1) {
      const container = imageContainerRef.current;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const scrollTop = (scrollHeight - clientHeight) / 2;
      container.scrollTo({ top: scrollTop, left: 0, behavior: "smooth" });
    }
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1));
  };

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    resetZoom();
    setIsLoading(true);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    resetZoom();
    setIsLoading(true);
  }, [images.length]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = images[currentIndex].url;
    link.download = images[currentIndex].title || `image-${currentIndex + 1}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "Escape":
          onOpenChange(false);
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        case "0":
          resetZoom();
          break;
        case "d":
          handleDownload();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange, handlePrevious, handleNext]);

  if (!open || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] p-0 gap-0 overflow-hidden h-[90vh] flex flex-col">
        <div className="relative flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-3 sm:p-4">
            <div className="space-y-1">
              <DialogTitle className="text-base sm:text-lg">
                {title} - {currentIndex + 1} of {images.length}
              </DialogTitle>
              {currentImage.title && (
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {currentImage.title}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                className="h-8 w-8 sm:h-9 sm:w-9"
                title="Download image"
              >
                <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="sr-only">Download image</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className="h-8 w-8 sm:h-9 sm:w-9"
              >
                <ZoomIn className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="sr-only">Zoom in</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                className="h-8 w-8 sm:h-9 sm:w-9"
              >
                <ZoomOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="sr-only">Zoom out</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={resetZoom}
                disabled={zoom === 1}
                className="h-8 w-8 sm:h-9 sm:w-9"
              >
                <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="sr-only">Reset zoom</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 sm:h-9 sm:w-9"
              >
                <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative flex-1 flex items-center justify-center bg-muted/30 p-2 sm:p-4 overflow-hidden">
            <div
              ref={imageContainerRef}
              className="relative aspect-auto max-h-[calc(90vh-180px)] w-full overflow-auto rounded-md flex items-center justify-center"
              style={{
                cursor: zoom > 1 ? "grab" : "default",
              }}
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                  <RefreshCw className="h-8 w-8 animate-spin" />
                </div>
              )}
              <Image
                src={currentImage.url}
                alt={currentImage.title || `Image ${currentIndex + 1}`}
                className="mx-auto h-auto max-h-[calc(90vh-180px)] w-auto max-w-full object-contain transition-transform duration-200"
                width={800}
                height={600}
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "top center",
                }}
                onLoadingComplete={() => setIsLoading(false)}
              />
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 sm:left-4 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-background/80 shadow-sm backdrop-blur-sm hover:bg-background/90"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                  <span className="sr-only">Previous image</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 sm:right-4 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-background/80 shadow-sm backdrop-blur-sm hover:bg-background/90"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
                  <span className="sr-only">Next image</span>
                </Button>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-2 border-t p-2 sm:p-4">
              <div className="flex gap-1 overflow-auto py-1 w-full">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      resetZoom();
                      setIsLoading(true);
                    }}
                    className={`relative h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
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
