"use client";
import { link } from "@/components/link/LinkMain";
import { IoReorderTwoOutline } from "react-icons/io5";
import FormSelect from "./FormSelect";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { linkFormState } from "@/types/form-states";
import { structureType } from "@/types/response";
import LinkForm from "./LinkForm";
import { DataContext } from "../provider/DataProvider";

function AddLink({
  setCoordinates,
  trash,
  setStagedTrash,
  state,
  index,
  links,
  link,
  setNewLinks,
  platform,
  id,
}: {
  setCoordinates: Dispatch<
    SetStateAction<{ x: string | number; y: string | number }>
  >;
  state: linkFormState;
  index: number;
  links: link[] | null;
  link: link;
  trash: link[] | null;
  setStagedTrash: Dispatch<SetStateAction<link[] | null>>;
  setNewLinks: Dispatch<SetStateAction<link[] | null>>;
  platform: {
    name: string;
    icon: React.ReactNode;
    priority: number;
    egLink: string;
    brandColor: string;
    mockUpIcon: React.ReactNode;
    coordinates: { x: number | string; y: number | string };
  }[];
  id: number;
}) {
  const [errors, setErrors] = useState(
    state.errors.filter(
      (err) => parseInt(Object.keys(err)[0]) === link.id
    )[0] as structureType
  );

  useEffect(() => {
    setErrors(
      state.errors.filter(
        (err) => parseInt(Object.keys(err)[0]) === link.id
      )[0] as structureType
    );
  }, [link.id, state.errors]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "link",
      link: link,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-[#FAFAFA] p-4 mt-4 rounded-8 flex flex-col w-full gap-4${
        isDragging ? " relative z-[99999]" : ""
      }`}
    >
      <div className="flex justify-between">
        <h3 {...attributes} {...listeners} className="flex items-center gap-1">
          <IoReorderTwoOutline /> <span>Link #{index}</span>
        </h3>
        <div
          role="button"
          className="font-normal cursor-pointer hover:underline text-grey text-[18px] z-[9999]"
          onClick={() => {
            if (links) {
              let y = 278;
              const newLinks = links
                .filter((link) => link.id !== id)
                .map((link, index) => {
                  const newlink = {
                    ...link,
                    platform: {
                      ...link.platform,
                      priority: index + 1,
                      coordinates: { ...link.platform.coordinates, y },
                    },
                  };
                  y = y + 64;
                  return newlink;
                });
              setCoordinates((prev) => {
                return { ...prev, y: (prev.y as number) - 64 };
              });
              setNewLinks(newLinks);
            }
          }}
        >
          Remove
        </div>
      </div>
      <FormSelect
        trash={trash}
        errors={errors && errors[link.id]?.platform}
        link={link}
        newLinks={links}
        setNewLinks={setNewLinks}
        id={id}
        platform={platform}
      />
      <LinkForm
        error={errors && errors[link.id]?.link}
        setNewLinks={setNewLinks}
        value={link.url}
        wrapperClass="mt-4"
        src="/assets/images/icon-link.svg"
        label="Link"
        placeholder={`e.g. ${link.platform.egLink}`}
        name={
          link.id +
          "_" +
          (link.platform.name
            ? link.platform.name.replace(" ", "_")
            : "platform") +
          "_url"
        }
        type="text"
        linkId={id}
        id={link.platform.name + "-url"}
        className="placeholder:text-darkgrey/50 h-12 border-border focus:shadow-[0_5px_10px_5px_rgba(99,60,255,0.2)]"
      />
      <input
        readOnly
        type="text"
        hidden
        value={index}
        name={
          link.id + "_" + link.platform.name.replace(" ", "_") + "_priority"
        }
      />
    </div>
  );
}

export default AddLink;
