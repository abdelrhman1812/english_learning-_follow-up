import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import levelsData from "@/data/levels-data.json";
import { Book, FileAudio, Image as IMG, Layout } from "lucide-react";
import Link from "next/link";

const LevelPage = async ({
  params,
}: {
  params: Promise<{ levelId: string }>;
}) => {
  const resolvedParams = await params;
  const { levelId } = resolvedParams;

  const units = levelsData.levels.filter((level) => level.id == levelId);

  return (
    <div className="min-h-screen p-4">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Language Learning Units
          </h1>
          <p className="text-lg text-muted-foreground">
            Master your language journey step by step
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-8 py-8 ">
          {units[0].units.map((unit, index) => (
            <Card
              key={index}
              className="backdrop-blur-sm bg-card/70 border-2 border-accent hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            >
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    {unit.name}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="text-xl bg-accent/50 hover:bg-accent/70 transition-colors"
                  >
                    {unit?.sessions?.length}

                    {unit?.sessions?.length === 1 ? " Session" : " Sessions"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[280px] w-full rounded-xl border border-accent/30 md:p-4">
                  {unit?.sessions?.length == 0 && " No Sessions"}

                  {unit?.sessions?.map((session, sessionIndex) => (
                    <div
                      key={sessionIndex}
                      className="mb-5 last:mb-0 p-4 bg-accent/30 rounded-xl border border-accent/30 hover:border-primary/40 transition-all duration-300"
                    >
                      <h3 className="font-semibold mb-3 text-xl text-primary">
                        <Link href={`${levelId}/${unit?.id}/${session?.id}`}>
                          {session?.name}
                        </Link>
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-base text-muted-foreground hover:text-primary transition-colors group">
                          <Layout className="h-5 w-5 group-hover:text-primary transition-colors" />
                          <span>{session.plan.images.length} Plans</span>
                        </div>
                        <div className="flex items-center gap-2 text-base text-muted-foreground hover:text-accent transition-colors group">
                          <FileAudio className="h-5 w-5 group-hover:text-accent transition-colors" />
                          <span>{session.plan.audios.length} Audios</span>
                        </div>
                        <div className="flex items-center gap-2 text-base text-muted-foreground hover:text-primary transition-colors group">
                          <Book className="h-5 w-5 group-hover:text-primary transition-colors" />
                          <span>{session.ebook.images.length} eBooks</span>
                        </div>
                        <div className="flex items-center gap-2 text-base text-muted-foreground hover:text-accent transition-colors group">
                          <IMG className="h-5 w-5 group-hover:text-accent transition-colors" />
                          <span>
                            {session.activities.images.length} Activities
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelPage;
