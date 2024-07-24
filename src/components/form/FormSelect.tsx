"use client";
import { link } from "@/components/link/LinkMain";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { FaChevronDown } from "react-icons/fa";
import { DataContext } from "../provider/DataProvider";

function FormSelect({
  trash,
  newLinks,
  errors,
  setNewLinks,
  link,
  platform,
}: {
  errors: string | undefined;
  link: link;
  trash: link[] | null;
  setNewLinks: Dispatch<SetStateAction<link[] | null>>;
  newLinks: link[] | null;
  id: number;
  platform: {
    name: string;
    icon: React.ReactNode;
    priority: number;
    egLink: string;
    brandColor: string;
    mockUpIcon: React.ReactNode;
    coordinates: { x: number | string; y: number | string };
  }[];
}) {
  const [show, setShow] = useState<Boolean>(false);
  const links = useContext(DataContext);

  const existingLinks = links?.map((link) => {
    return link.platform.name;
  });

  const initialOptions = platform.filter(
    (p) => !existingLinks?.includes(p.name)
  );

  const [options, setOptions] = useState(initialOptions);

  const newLinksString = JSON.stringify(newLinks);

  useEffect(() => {
    function flushOptions() {
      const newOptions = newLinks && newLinks.map((link) => link.platform.name);
      const filteredOptions = platform.filter(
        (p) => !newOptions?.includes(p.name)
      );
      setOptions(filteredOptions);
    }

    flushOptions();
  }, [newLinksString, newLinks, platform]);

  return (
    <div className="w-full z-50 relative">
      <div className="relative">
        <FaChevronDown
          className={`absolute right-4 top-[50%] bottom-[50%] -translate-y-[50%] transition-all ease-in duration-200 text-primary${
            show ? " rotate-180" : ""
          }`}
        />
        <div className="pl-4 fill-darkgrey">{link && link.platform.icon}</div>
        <input
          name={
            link.id +
            "_" +
            (link.platform.name
              ? link.platform.name.replace(" ", "_")
              : "platform")
          }
          value={link.platform.name}
          placeholder={link ? link.platform.name : ""}
          readOnly
          onClick={() => setShow((prev) => !prev)}
          type="text"
          className="w-full placeholder:text-darkgrey cursor-pointer border-[1.5px] rounded-[8px] h-12 px-12 custom-input focus:shadow-[0_5px_10px_5px_rgba(99,60,255,0.2)]"
        />
      </div>
      {errors && <p className="text-destructive mt-2 body-s">{errors}</p>}
      <div
        className={`border-[1.5px] flex flex-col absolute w-full top-14 z-50 bg-white px-4 rounded-md max-h-[128px] overflow-y-scroll${
          show ? " d-block opacity-100" : " hidden opacity-0"
        }`}
      >
        {options.map((platform) => (
          <div
            key={platform.name}
            className="py-3 relative border-b last:border-b-0 text-grey hover:text-primary cursor-pointer fill-grey hover:fill-primary"
            onClick={() => {
              setNewLinks((prev) => {
                let links: link[];

                if (prev) {
                  links = [
                    ...prev.map((l) => {
                      if (l.id === link.id) {
                        return {
                          ...l,
                          platform: {
                            ...l.platform,
                            name: platform.name,
                            icon: platform.icon,
                            priority: l.platform.priority,
                            egLink: platform.egLink,
                            brandColor: platform.brandColor,
                            mockUpIcon: platform.mockUpIcon,
                          },
                        };
                      }

                      return l;
                    }),
                  ];
                } else {
                  return prev;
                }
                return links;
              });

              setShow(false);
            }}
          >
            {platform.icon}

            <p className="ml-8">{platform.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormSelect;
