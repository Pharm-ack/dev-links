import IconFacebook from "@/components/svg/IconFacebook";
import IconGithub from "@/components/svg/IconGithub";
import IconLinkedin from "@/components/svg/IconLinkedin";
import IconTwitch from "@/components/svg/IconTwitch";
import IconTwitter from "@/components/svg/IconTwitter";
import IconYoutube from "@/components/svg/IconYoutube";
import { Platform } from "@/types";

export const urlValidator: Record<string, RegExp> = {
  Github: /^https:\/\/(www\.)?github.com\/.*$/,
  Frontend_Mentor: /^https:\/\/(www\.)?frontendmentor.io\/profile\/.*$/,
  Twitter: /^https:\/\/(www\.)?x.com\/.*$/,
  Twitch: /^https:\/\/(www\.)?twitch.tv\/.*$/,
  Linkedin: /^https:\/\/(www\.)?linkedin.com\/in\/.*$/,
  Youtube: /^https:\/\/(www\.)?youtube.com\/.*$/,
  Facebook: /^https:\/\/(www\.)?facebook.com\/.*$/,
  Codepen: /^https:\/\/(www\.)?codepen.io\/.*$/,
  Codewars: /^https:\/\/(www\.)?codewars.com\/.*$/,
  Devto: /^https:\/\/(www\.)?dev.to\/.*$/,
  Hashnode: /^https:\/\/(www\.)?hashnode.com\/@.*$/,
  Stackoverflow: /^https:\/\/(www\.)?stackoverflow.com\/.*$/,
  FreeCodeCamp: /^https:\/\/(www\.)?freecodecamp.org\/.*$/,
  Gitlab: /^https:\/\/(www\.)?gitlab.com\/.*$/,
};

export const platform: Platform[] = [
  {
    name: "Github",
    icon: (
      <IconGithub color="absolute top-[50%] bottom-[50%] -translate-y-[50%]" />
    ),
    priority: 0,
    egLink: "https://github.com/maungshine",
    brandColor: "#1A1A1A",
    mockUpIcon: <IconGithub color="fill-white" />,
    coordinates: {
      x: "",
      y: "",
    },
  },
  {
    name: "Twitter",
    icon: (
      <IconTwitter color="absolute top-[50%] bottom-[50%] -translate-y-[50%]" />
    ),
    priority: 0,
    egLink: "https://.x.com/maungshine",
    brandColor: "#1da1f2",
    mockUpIcon: <IconTwitter color="fill-white" />,
    coordinates: {
      x: "",
      y: "",
    },
  },
  {
    name: "Twitch",
    icon: (
      <IconTwitch color="absolute top-[50%] bottom-[50%] -translate-y-[50%]" />
    ),
    priority: 0,
    egLink: "https://www.twitch.com/maungshine",
    brandColor: "#8b44f7",
    mockUpIcon: <IconTwitch color="fill-white" />,
    coordinates: {
      x: "",
      y: "",
    },
  },
  {
    name: "Facebook",
    icon: (
      <IconFacebook color="absolute top-[50%] bottom-[50%] -translate-y-[50%]" />
    ),
    priority: 0,
    egLink: "https://facebook.com/maungshine",
    brandColor: "#0c87ef",
    mockUpIcon: <IconFacebook color="fill-white" />,
    coordinates: {
      x: "",
      y: "",
    },
  },
  {
    name: "Linkedin",
    icon: (
      <IconLinkedin color="absolute top-[50%] bottom-[50%] -translate-y-[50%]" />
    ),
    priority: 0,
    egLink: "https://linkedin.com/in/maungshine",
    brandColor: "#0a66c2",
    mockUpIcon: <IconLinkedin color="fill-white" />,
    coordinates: {
      x: "",
      y: "",
    },
  },
  {
    name: "Youtube",
    icon: (
      <IconYoutube color="absolute top-[50%] bottom-[50%] -translate-y-[50%]" />
    ),
    priority: 0,
    egLink: "https://www.youtube.com/@devmaungshine",
    brandColor: "#ff0000",
    mockUpIcon: <IconYoutube color="fill-white" />,
    coordinates: {
      x: "",
      y: "",
    },
  },
];
