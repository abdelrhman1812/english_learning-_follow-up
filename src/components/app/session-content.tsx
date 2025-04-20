"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Maximize2, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AudioPlayer } from "./audio-player";
import { ImageGallery } from "./image-gallery";

interface SessionContentProps {
  session: {
    id: string;
    name: string;
    plan: {
      images: Array<{
        title: string;
        url: string;
      }>;
      audios: Array<{
        title: string;
        url: string;
      }>;
    };
    ebook: {
      images: Array<{
        title: string;
        url: string;
      }>;
    };
    activities: {
      images: Array<{
        title: string;
        url: string;
      }>;
    };
  };
}

export function SessionContent({ session }: SessionContentProps) {
  const [activeTab, setActiveTab] = useState("plan");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<
    Array<{ title: string; url: string }>
  >([]);
  const [galleryTitle, setGalleryTitle] = useState("");
  const [initialImageIndex, setInitialImageIndex] = useState(0);

  const openGallery = (
    images: Array<{ title: string; url: string }>,
    title: string,
    index: number
  ) => {
    setGalleryImages(images);
    setGalleryTitle(title);
    setInitialImageIndex(index);
    setGalleryOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{session.name}</h1>
        <p className="text-muted-foreground">
          View lesson materials and activities
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="plan"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <FileText className="h-4 w-4" />
            <span>Lesson Plan</span>
          </TabsTrigger>
          <TabsTrigger
            value="ebook"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <BookOpen className="h-4 w-4" />
            <span>E-Book</span>
          </TabsTrigger>
          <TabsTrigger
            value="activities"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Play className="h-4 w-4" />
            <span>Activities</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plan" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Plan</CardTitle>
              <CardDescription>
                Review the lesson plan materials and audio resources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Images</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {session.plan.images.map((image, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-lg border border-muted transition-all hover:shadow-md"
                      onClick={() =>
                        openGallery(
                          session.plan.images,
                          "Lesson Plan Images",
                          index
                        )
                      }
                    >
                      <div className="aspect-video w-full bg-muted flex items-center justify-center cursor-pointer">
                        <Image
                          src={image.url}
                          alt={image.title || `Plan image ${index + 1}`}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          width={350}
                          height={200}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/20 group-hover:opacity-100">
                          <Maximize2 className="h-8 w-8 text-white drop-shadow-md" />
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="font-medium">
                          {image.title || `Image ${index + 1}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Audio Resources</h3>
                <div className="space-y-2">
                  {session.plan.audios.map((audio, index) => (
                    <AudioPlayer
                      key={index}
                      fileName={audio.title || `Audio ${index + 1}`}
                      url={audio.url}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ebook" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>E-Book Materials</CardTitle>
              <CardDescription>
                Digital textbook materials for this session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {session.ebook.images.map((image, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg border border-muted transition-all hover:shadow-md"
                    onClick={() =>
                      openGallery(session.ebook.images, "E-Book Pages", index)
                    }
                  >
                    <div className="aspect-video w-full bg-muted flex items-center justify-center cursor-pointer">
                      <Image
                        src={
                          image.url ||
                          `/placeholder.svg?height=200&width=350&text=${
                            image.title || `Page ${index + 1}`
                          }`
                        }
                        alt={image.title || `E-book page ${index + 1}`}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        width={350}
                        height={200}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/20 group-hover:opacity-100">
                        <Maximize2 className="h-8 w-8 text-white drop-shadow-md" />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="font-medium">
                        {image.title || `Page ${index + 1}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Activities</CardTitle>
              <CardDescription>
                Interactive exercises and activities for practice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {session.activities.images.map((image, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg border border-muted transition-all hover:shadow-md"
                    onClick={() =>
                      openGallery(
                        session.activities.images,
                        "Learning Activities",
                        index
                      )
                    }
                  >
                    <div className="aspect-video w-full bg-muted flex items-center justify-center cursor-pointer">
                      <Image
                        src={
                          image.url ||
                          `/placeholder.svg?height=200&width=350&text=${
                            image.title || `Activity ${index + 1}`
                          }`
                        }
                        alt={image.title || `Activity ${index + 1}`}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        width={350}
                        height={200}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/20 group-hover:opacity-100">
                        <Maximize2 className="h-8 w-8 text-white drop-shadow-md" />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="font-medium">
                        {image.title || `Activity ${index + 1}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ImageGallery
        images={galleryImages}
        title={galleryTitle}
        initialIndex={initialImageIndex}
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
      />
    </div>
  );
}
