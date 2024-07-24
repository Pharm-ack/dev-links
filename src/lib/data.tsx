import IconCodePen from "@/components/svg/IconCodePen";
import IconCodeWars from "@/components/svg/IconCodeWars";
import IconDevto from "@/components/svg/IconDevto";
import IconFacebook from "@/components/svg/IconFacebook";
import IconFreeCodeCamp from "@/components/svg/IconFreeCodeCamp";
import IconFrontendMentor from "@/components/svg/IconFrontendMentor";
import IconGithub from "@/components/svg/IconGithub";
import IconGitlab from "@/components/svg/IconGitlab";
import IconHashnode from "@/components/svg/IconHashnode";
import IconLinkedin from "@/components/svg/IconLinkedin";
import IconStackoverflow from "@/components/svg/IconStackoverflow";
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
    name: "Frontend Mentor",
    icon: (
      <IconFrontendMentor color="absolute top-[50%] bottom-[50%] -translate-y-[50%]" />
    ),
    priority: 0,
    egLink: "https://www.frontendmentor.io/profile/maungshine",
    brandColor: "#6abecd",
    mockUpIcon: <IconFrontendMentor color="fill-white" />,
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
    name: "Devto",
    icon: (
      <IconDevto color="absolute top-[50%] bottom-[50%] -translate-y-[50%]" />
    ),
    priority: 0,
    egLink: "https://www.dev.to/maungshine",
    brandColor: "#000000",
    mockUpIcon: <IconDevto color="fill-black" />,
    coordinates: {
      x: "",
      y: "",
    },
  },
  {
    name: "Codepen",
    icon: (
      <IconCodePen color="absolute top-[50%] bottom-[50%] -translate-y-[50%]" />
    ),
    priority: 0,
    egLink: "https://www.codepen.io/maungshine",
    brandColor: "#010101",
    mockUpIcon: <IconCodePen color="fill-white" />,
    coordinates: {
      x: "",
      y: "",
    },
  },
  {
    name: "Codewars",
    icon: (
      <IconCodeWars color="absolute top-[50%] bottom-[50%] -translate-y-[50%]" />
    ),
    priority: 0,
    egLink: "https://www.codewars.com/users/ab12",
    brandColor: "#fe5252",
    mockUpIcon: <IconCodeWars color="fill-white" />,
    coordinates: {
      x: "",
      y: "",
    },
  },
  {
    name: "Gitlab",
    icon: (
      <IconGitlab color="absolute top-[50%] bottom-[50%] -translate-y-[50%]" />
    ),
    priority: 0,
    egLink: "https://gitlab.com/maungshine",
    brandColor: "#e24329",
    mockUpIcon: <IconGitlab color="fill-white" />,
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
    name: "FreeCodeCamp",
    icon: (
      <IconFreeCodeCamp color="absolute top-[50%] bottom-[50%] -translate-y-[50%]" />
    ),
    priority: 0,
    egLink: "https://freecodecamp.org/maungshine",
    brandColor: "#0a0a23",
    mockUpIcon: <IconFreeCodeCamp color="fill-white" />,
    coordinates: {
      x: "",
      y: "",
    },
  },
  {
    name: "Hashnode",
    icon: (
      <IconHashnode color="absolute top-[50%] bottom-[50%] -translate-y-[50%]" />
    ),
    priority: 0,
    egLink: "https://hashnode.com/@maungshine",
    brandColor: "#2962FF",
    mockUpIcon: <IconHashnode color="fill-white" />,
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
    name: "Stackoverflow",
    icon: (
      <IconStackoverflow color="absolute top-[50%] bottom-[50%] -translate-y-[50%]" />
    ),
    priority: 0,
    egLink: "https://stackoverflow.com/users/123456/maungshine",
    brandColor: "#f5903f",
    mockUpIcon: <IconStackoverflow color="fill-white" />,
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
