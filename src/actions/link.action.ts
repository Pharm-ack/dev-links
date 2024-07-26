"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { getId, saveLinksSchema } from "@/schemas/index";
import { structureType, structureTypeArray } from "@/types/response";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export const saveLinks = async (
  formData: FormData
): Promise<{ errors: structureTypeArray | {}[]; success?: string }> => {
  const { result, errors } = saveLinksSchema(formData);

  if (!result.success) {
    return { errors: errors };
  }

  const data = getStructuredData(result.data);

  const session = await auth();

  if (!session) return { errors: [{}] };

  const user = await prisma.user.findFirst({
    where: {
      email: session.user?.email as string,
    },
  });
  try {
    await Promise.all(
      data.map(async (row) => {
        const key = parseInt(Object.keys(row)[0]);
        const platform = row[key].platform as string;

        if (!user || !user.id) {
          return { error: "User is not defined or user ID is missing" };
        }

        const userId = user.id as string;
        const existingLink = await prisma.link.findFirst({
          where: {
            userId,
            platform,
          } as Prisma.LinkWhereInput,
        });

        if (!existingLink) {
          const data = await prisma.link.create({
            data: {
              userId,
              platform,
              url: row[key].link as string,
              priority: parseInt(row[key].priority as string),
            } as any,
          });
          return { success: "Platform save successfully!" };
        }

        await prisma.link.update({
          where: {
            id: existingLink.id as string,
          },
          data: {
            platform,
            url: row[key].link as string,
            priority: parseInt(row[key].priority as string),
          } as Prisma.LinkUpdateInput,
        });
        return { success: "Platform updated successfully" };
      })
    );
  } catch (error) {
    console.log("Insert and update error", error);
    throw error;
  }

  revalidatePath("/links");
  return {
    errors: [{}],
    success: "Links saved successfully!",
  };
};

function getStructuredData(data: { [x: string]: string }) {
  const keys = Object.keys(data);
  let count: number = 1;
  let id: number;
  let row: structureType;
  let length = keys.length;

  const structuredData = keys.reduce((acc, key) => {
    //push individual fields to  row obj
    if (count === 1) {
      id = parseInt(getId(key));
      if (key.endsWith("url")) {
        row = {
          [id]: {
            link: data[key],
          },
        };
      } else if (key.endsWith("priority")) {
        row = {
          [id]: {
            priority: data[key],
          },
        };
      }
      {
        row = {
          [id]: {
            platform: data[key],
          },
        };
      }
    } else {
      id = parseInt(getId(key));
      if (key.endsWith("url")) {
        row = {
          ...row,
          [id]: {
            ...row[id],
            link: data[key],
          },
        };
      } else if (key.endsWith("priority")) {
        row = {
          ...row,
          [id]: {
            ...row[id],
            priority: data[key],
          },
        };
      } else {
        row = {
          ...row,
          [id]: {
            ...row[id],
            platform: data[key],
          },
        };
      }
    }

    if (count % 3 === 0) {
      const temp = row;
      //reset row arr
      row = {};
      //reset count
      count = 1;
      //return acc with row`
      return [...acc, temp];
    }

    count++;

    return [...acc];
  }, [] as structureTypeArray);

  return structuredData;
}

export const deleteLinks = async (trashItems: string[]) => {
  try {
    // Attempt to delete the links with IDs in the trashItems array
    await prisma.link.deleteMany({
      where: {
        id: {
          in: trashItems,
        },
      },
    });
    console.log(
      `Successfully deleted links with IDs: ${trashItems.join(", ")}`
    );
  } catch (error) {
    // Log any errors that occur during the deletion process
    console.error("Error deleting links:", error);
  } finally {
    // Revalidate the path to ensure the UI reflects the deletion
    revalidatePath("/links");
  }
};
