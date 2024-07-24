// types.ts

import { ReactNode } from "react";

export interface User {
  id: string;
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
  image?: string;
  links: Link[];
}

export interface Link {
  id: string;
  userId: string;
  platform: string;
  url: string;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Platform {
  name: string;
  icon: ReactNode;
  priority: number;
  egLink: string;
  brandColor: string;
  mockUpIcon: ReactNode;
  coordinates: {
    x: string | number;
    y: string | number;
  };
}

export interface LinkWithData {
  id: number;
  linkId: string;
  platform: {
    name: string;
    icon: ReactNode;
    priority: number;
    egLink: string;
    brandColor: string;
    mockUpIcon: ReactNode;
    coordinates: {
      x: number;
      y: number;
    };
  };
  url: string;
}
