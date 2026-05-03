import { AdvisoryBoardContent } from "@/components/sections/AdvisoryBoardContent";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";

export const metadata = {
  title: "Advisory Board",
  description: "Meet the experts guiding Clean Globe Consultancy.",
};

export default async function AdvisoryBoardPage() {
  let members: { id: string; name: string; role: string; bio: string; image: string | null }[] = [];

  try {
    members = await db.advisoryBoardMember.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
      select: { id: true, name: true, role: true, bio: true, image: true },
    });
  } catch (error) {
    logger.error("Failed to fetch advisory board members for public page", { error: String(error) });
  }

  return <AdvisoryBoardContent members={members} />;
}
