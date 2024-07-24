import prisma from "@/lib/db";
import { platform } from "@/lib/data";
import { getUserByEmail } from "./user";
import { auth } from "@/auth";
import { Link, LinkWithData } from "@/types/index";
import { Prisma } from "@prisma/client";

export const getLinks = async (): Promise<LinkWithData[]> => {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email as string);
  const links = (await prisma.link.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      priority: "asc" as Prisma.SortOrder,
    } as Prisma.LinkOrderByWithRelationInput,
  })) as unknown as Link[];

  let x = 35;
  let y = 278;

  const linkWithData: LinkWithData[] = links.map((link: Link) => {
    const platformData = platform.find((p) => p.name === link.platform);
    if (!platformData) {
      throw new Error(`Platform ${link.platform} not found`);
    }

    const linkData: LinkWithData = {
      id: link.priority,
      linkId: link.id,
      platform: {
        name: link.platform,
        icon: platformData.icon,
        priority: link.priority,
        egLink: platformData.egLink,
        brandColor: platformData.brandColor,
        mockUpIcon: platformData.mockUpIcon,
        coordinates: { x, y },
      },
      url: link.url,
    };
    y = y + 64;
    return linkData;
  });

  return linkWithData;
};

export const getLinksByUsername = async (
  email: string
): Promise<LinkWithData[] | null> => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return null;
  }
  const links = (await prisma.link.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      priority: "asc" as Prisma.SortOrder,
    } as Prisma.LinkOrderByWithRelationInput,
  })) as unknown as Link[];

  let x = 35;
  let y = 278;

  const linkWithData: LinkWithData[] = links.map((link: Link) => {
    const platformData = platform.find((p) => p.name === link.platform);
    if (!platformData) {
      throw new Error(`Platform ${link.platform} not found`);
    }

    const linkData: LinkWithData = {
      id: link.priority,
      linkId: link.id,
      platform: {
        name: link.platform,
        icon: platformData.icon,
        priority: link.priority,
        egLink: platformData.egLink,
        brandColor: platformData.brandColor,
        mockUpIcon: platformData.mockUpIcon,
        coordinates: { x, y },
      },
      url: link.url,
    };
    y = y + 64;
    return linkData;
  });

  return linkWithData;
};
