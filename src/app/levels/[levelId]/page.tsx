import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import levelsData from "@/data/levels-data.json";
import { Book, FileAudio, Image, Layout } from "lucide-react";
import Link from "next/link";

const LevelPage = async ({
  params,
}: {
  params: Promise<{ levelId: string }>;
}) => {
  const resolvedParams = await params;
  const { levelId } = resolvedParams;
  console.log(levelId);

  const units = levelsData.levels.filter((level) => level.id == levelId);
  console.log(units[0].units);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Language Learning Units
          </h1>
          <p className="text-muted-foreground">
            Master your language journey step by step
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units[0].units.map((unit, index) => (
            <Card
              key={index}
              className="backdrop-blur-sm bg-card/50 border-2 border-accent hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
            >
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    {unit.name}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="text-lg bg-accent/50 hover:bg-accent/70 transition-colors"
                  >
                    {unit?.sessions?.length}
                    {unit?.sessions?.length === 1 ? "Session" : "Sessions"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[240px] w-full rounded-xl border border-accent/20 p-4">
                  {unit?.sessions?.map((session, sessionIndex) => (
                    <div
                      key={sessionIndex}
                      className="mb-4 last:mb-0 p-4 bg-accent/30 rounded-xl border border-accent/20 hover:border-blue-500/30 transition-all duration-300"
                    >
                      <h3 className="font-semibold mb-3 text-lg text-primary">
                        <Link href={`${levelId}/${unit?.id}/${session?.id}`}>
                          {session?.name}
                        </Link>{" "}
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                          <Layout className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
                          <span>{session.plan.images.length} Plans</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                          <FileAudio className="h-4 w-4 group-hover:text-purple-400 transition-colors" />
                          <span>{session.plan.audios.length} Audios</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                          <Book className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
                          <span>{session.ebook.images.length} eBooks</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                          <Image className="h-4 w-4 group-hover:text-purple-400 transition-colors" />
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
