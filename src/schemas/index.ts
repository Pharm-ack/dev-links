import { z, ZodEffects, ZodString, object, string } from "zod";
import { structureType, structureTypeArray } from "@/types/response";
import { urlValidator } from "@/lib/data";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Please enter your password",
  }),
});

export const RegisterSchema = z
  .object({
    email: z
      .string({ required_error: "Can't be empty" })
      .min(1, "Can't be empty")
      .email("Invalid email"),
    password: z
      .string({ required_error: "Please check again" })
      .min(1, "Please check again")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

export const saveLinksSchema = (formData: FormData) => {
  const keys: string[] = [];
  //@ts-ignore
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("$")) {
      keys.push(key);
    }
  }

  let platform: string;

  const validation = keys.map((key, index) => {
    const urlLink = key.endsWith("url");
    const urlKey = Object.keys(urlValidator).filter((url) =>
      key.toLowerCase().includes(url.toLowerCase())
    )[0];
    if (urlLink) {
      return {
        [key]: string({ required_error: `link is required` })
          .min(1, "Link is required")
          .url("Invalid link")
          .refine(
            (value) => {
              const urlRegex = urlValidator[urlKey];
              if (!urlRegex) return false;
              const isValid = urlRegex.test(value);
              return isValid;
            },
            { message: `Invalid link` }
          ),
      };
    } else {
      return {
        [key]: string().trim().min(1, { message: "Platform is required" }),
      };
    }
  });

  const zodValidation = validation.reduce((acc, curr) => {
    return { ...acc, ...curr };
  }, {} as { [x: string]: ZodEffects<ZodString, string, string> | ZodString });

  const schema = object(zodValidation);

  const schemaType = keys.reduce((acc, curr) => {
    return { ...acc, [curr as string]: " " };
  }, {});

  const result = schema.safeParse({
    ...keys.reduce((acc, curr) => {
      return { ...acc, [curr]: formData.get(curr) };
    }, {} as typeof schemaType),
  });

  let count: number = 1;
  let id: number;
  let error: structureType;
  const length = result.error?.flatten().fieldErrors
    ? Object.keys(result.error?.flatten().fieldErrors).length
    : 0;

  const errors = result.error?.flatten().fieldErrors
    ? Object.keys(result.error?.flatten().fieldErrors).reduce((acc, key) => {
        if (length === 0) {
          return [{}];
        }
        //first loop, push the first item into the array
        if (count === 1) {
          id = parseInt(getId(key));
          if (key.endsWith("url")) {
            error = {
              [id]: {
                link: result.error?.flatten().fieldErrors[key]?.join(" ,"),
              },
            };
          } else {
            error = {
              [id]: {
                platform: result.error?.flatten().fieldErrors[key]?.join(" ,"),
              },
            };
          }

          if (count === length) {
            return [error];
          }
        }

        if (count > 1 && id !== parseInt(getId(key))) {
          id = parseInt(getId(key));
          const temp = error;
          if (key.endsWith("url")) {
            error = {
              [id]: {
                link: result.error?.flatten().fieldErrors[key]?.join(" ,"),
              },
            };
          } else {
            error = {
              [id]: {
                platform: result.error?.flatten().fieldErrors[key]?.join(" ,"),
              },
            };
          }
          if (count === length) {
            return [...acc, temp, error];
          }

          count++;
          return [...acc, temp];
        } else {
          if (key.endsWith("url")) {
            error = {
              ...error,
              [id]: {
                ...error[id],
                link: result.error?.flatten().fieldErrors[key]?.join(" ,"),
              },
            };
          } else {
            error = {
              ...error,
              [id]: {
                ...error[id],
                platform: result.error?.flatten().fieldErrors[key]?.join(" ,"),
              },
            };
          }

          if (count === length) {
            return [...acc, error];
          }
        }

        count++;
        return [...acc];
      }, [] as structureTypeArray)
    : [{}];

  return { result, errors };
};

export function getId(str: string) {
  return str.split("_")[0];
}
