import IconGithub from "./IconGithub";
import { platform } from "os";
import { useEffect, useState } from "react";
import IconArrowRight from "./IconArrowRight";
import { link } from "../link/LinkMain";
import Image from "next/image";

function PhoneMockUp({
  color,
  links,
  userProfile,
}: {
  color: string;
  links: link[] | null;
  userProfile: {
    image: string | null;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
  } | null;
}) {
  const onlyFiveLinks = links && links?.length > 5 ? links?.slice(0, 5) : links;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="308"
      height="632"
      fill="none"
      viewBox="0 0 308 632"
    >
      <path
        stroke="#737373"
        d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
      />
      <path
        fill="#fff"
        stroke="#737373"
        d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
      />
      {!userProfile && (
        <>
          <circle cx="153.5" cy="112" r="48" fill="#EEE" />
          <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4" />
          <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
        </>
      )}

      <foreignObject x="105.5" y="64" width="104" height="110">
        {userProfile?.image ? (
          <Image
            src={userProfile.image}
            alt="Profile"
            width={104}
            height={104}
            className="h-[110px] w-[110px] object-cover rounded-full border-4 border-primary"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-[#EEE] flex items-center justify-center text-4xl text-[#737373]">
            ?
          </div>
        )}
      </foreignObject>

      {/* Name */}
      <text
        x="154"
        y="205"
        textAnchor="middle"
        fill="#333"
        fontSize="18"
        fontWeight="bold"
      >
        {`${userProfile?.first_name || ""} ${userProfile?.last_name || ""}`}
      </text>

      {/* Email */}
      <text x="154" y="230" textAnchor="middle" fill="#737373" fontSize="14">
        {userProfile?.email || ""}
      </text>

      {(!onlyFiveLinks || onlyFiveLinks.length === 0) && (
        <>
          <rect width="237" height="44" x="35" y="278" fill="#EEE" rx="8" />
          <rect width="237" height="44" x="35" y="342" fill="#EEE" rx="8" />
          <rect width="237" height="44" x="35" y="406" fill="#EEE" rx="8" />
          <rect width="237" height="44" x="35" y="470" fill="#EEE" rx="8" />
          <rect width="237" height="44" x="35" y="534" fill="#EEE" rx="8" />
        </>
      )}

      {onlyFiveLinks &&
        onlyFiveLinks.length > 0 &&
        onlyFiveLinks.map((link, index) => (
          <g key={index}>
            <rect
              width="237"
              height="44"
              x={link.platform.coordinates.x}
              y={link.platform.coordinates.y}
              fill={link.platform.brandColor}
              rx="8"
            />
            <text
              x={(link.platform.coordinates.x as number) + 40}
              y={(link.platform.coordinates.y as number) + 28}
              fill={"#fff"}
              fontSize={16}
            >
              {link.platform.name}
            </text>
            <svg
              x={(link.platform.coordinates.x as number) + 13}
              y={(link.platform.coordinates.y as number) + 15}
              width={16}
              height={16}
            >
              {link.platform.mockUpIcon}
            </svg>
            <IconArrowRight
              color=""
              x={(link.platform.coordinates.x as number) + 200}
              y={(link.platform.coordinates.y as number) + 15}
            />
          </g>
        ))}
    </svg>
  );
}

export default PhoneMockUp;
