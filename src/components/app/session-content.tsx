"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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
    hw?: {
      images: Array<{
        title: string;
        url: string;
      }>;
      audios: Array<{
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
  const [feedback, setFeedback] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showAllAudios, setShowAllAudios] = useState(false);

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

  const sendFeedback = () => {
    if (!feedback.trim()) return;

    setIsSending(true);

    const phoneNumber = "201008034761";
    const message = `Feedback for session "${session.name}":\n\n${feedback}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    // Reset after sending
    setTimeout(() => {
      setFeedback("");
      setIsSending(false);
    }, 1000);
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            value="plan"
            className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            <FileText className="h-4 w-4" />
            <span>Lesson Plan</span>
          </TabsTrigger>
          <TabsTrigger
            value="ebook"
            className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            <BookOpen className="h-4 w-4" />
            <span>E-Book</span>
          </TabsTrigger>
          <TabsTrigger
            value="activities"
            className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            <Play className="h-4 w-4" />
            <span>Activities</span>
          </TabsTrigger>
          <TabsTrigger
            value="hw"
            className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            <Play className="h-4 w-4" />
            <span>HW</span>
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
                <div className="grid grid-cols-1 gap-6  lg:grid-cols-2">
                  {session.plan.images.map((image, index) => (
                    <>
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
                      </div>
                      <div className="p-3">
                        <p className="font-medium">
                          {image.title || `Image ${index + 1}`}
                        </p>
                      </div>
                    </>
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
        <TabsContent value="hw" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Homework</CardTitle>
              <CardDescription>
                Review the homework images and audio materials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Images For Homework - Only renders if hw exists and has images */}
              {session.hw?.images && session.hw.images.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Images</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {session.hw.images.map((image, index) => (
                      <div
                        key={`${image.url}-${index}`}
                        className="group relative overflow-hidden rounded-lg border border-muted transition-all hover:shadow-md"
                        onClick={() =>
                          openGallery(
                            session.hw!.images, // Safe non-null assertion after existence check
                            "Lesson hw Images",
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
              )}

              {/* Audios For Homework - Only renders if hw exists and has audios */}
              {session.hw?.audios && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Audio Resources</h3>
                  {session.hw.audios.length > 0 ? (
                    <>
                      <div className="space-y-2">
                        {session.hw.audios
                          .slice(
                            0,
                            showAllAudios ? session.hw.audios.length : 5
                          )
                          .map((audio, index) => (
                            <AudioPlayer
                              key={`${audio.url}-${index}`}
                              fileName={audio.title || `Audio ${index + 1}`}
                              url={audio.url}
                            />
                          ))}
                      </div>

                      {!showAllAudios && session.hw.audios.length > 5 && (
                        <button
                          onClick={() => setShowAllAudios(true)}
                          className="text-blue-500 hover:underline mt-2"
                        >
                          Show All Audios ({session.hw.audios.length - 5}{" "}
                          remaining)
                        </button>
                      )}
                      {showAllAudios && session.hw.audios.length > 5 && (
                        <button
                          onClick={() => setShowAllAudios(false)}
                          className="text-blue-500 hover:underline mt-2"
                        >
                          Show Less
                        </button>
                      )}
                    </>
                  ) : (
                    <p className="text-muted-foreground">
                      No audio resources available
                    </p>
                  )}
                </div>
              )}

              {/* Fallback when no hw content exists */}
              {!session.hw && (
                <div className="text-center text-muted-foreground py-8">
                  No homework content available
                </div>
              )}
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

      {/* Feedback Section */}
      <div className="mt-12 border-t pt-8">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-xl">Share Your Feedback</CardTitle>
            <CardDescription>
              Help me improve by sharing your thoughts about this session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="What did you think of this session? Any suggestions for improvement?"
                className="min-h-[120px]"
              />
              <div className="flex justify-end">
                <Button
                  onClick={sendFeedback}
                  disabled={!feedback.trim() || isSending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSending ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 448 512"
                        fill="currentColor"
                      >
                        <path d="M380.9 97.1C339-18.3 224.1-28.6 160.6 33.5 103.9 91.2 94.4 179.5 135.2 251.8L96 416l157.7-39.4c72.3 40.8 160.6 31.3 218.3-25.4 62.1-63.5 51.8-178.4-20.1-220.3zM224 380.7l-69.2 17.3 18.2-66.6-1.1-1.1c-33.3-32.5-45.2-79.3-31.3-122.4 15.8-48.4 57.5-83.4 108.4-87.3 60.4-4.8 112.5 37.3 120.9 97.2 5.7 39.8-8.2 77.6-37.5 106.2-32.7 31.7-80.5 45.6-126.5 36.7-7.2-1.5-14.2-3.8-21.2-6.7z" />
                      </svg>
                      Send via WhatsApp
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
