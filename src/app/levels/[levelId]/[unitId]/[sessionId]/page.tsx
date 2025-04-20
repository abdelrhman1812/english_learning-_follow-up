import { SessionContent } from "@/components/app/session-content";
import levelsData from "@/data/levels-data.json";

interface PageParams {
  levelId: string;
  unitId: string;
  sessionId: string;
}

const Page = async ({ params }: { params: Promise<PageParams> }) => {
  const { levelId, unitId, sessionId } = await params;

  const level = levelsData.levels.find((lvl) => lvl.id === levelId);

  const unit = level?.units.find((unt) => unt.id === unitId);

  const session = unit?.sessions.find((ses) => ses.id === sessionId);

  return <>{session && <SessionContent session={session} />}a</>;
};

export default Page;
