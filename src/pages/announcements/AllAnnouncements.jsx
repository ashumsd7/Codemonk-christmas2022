import React, { useState } from "react";
import { RhChip, RhChipGroup } from "@rhythm-ui/react";
import { useGetAnnouncementsQuery } from "../../services/api";
import AnnouncementCard from "./components/AnnouncementCard";

function AllAnnouncements() {
  const [selectedCategory, setSelectedCategory] = useState();
  const { data: allAnnouncements } = useGetAnnouncementsQuery({
    category: selectedCategory,
  });

  const CATEGORIES = [
    {
      id: 1,
      name: "Announcements",
    },
    {
      id: 2,
      name: "Achievements",
    },
  ];

  return (
    <>
      <div className="">
        <h2 className=" px-2 font-semibold mb-7 "> Highlights</h2>

        <div className="flex gap-4 mb-6">
          <RhChipGroup
            onSelectionChange={(id) => {
              let selectedCategory = Number(id[0]);
              if (selectedCategory || selectedCategory == 0) {
                setSelectedCategory(++selectedCategory);
              } else {
                setSelectedCategory(undefined);
              }
            }}
          >
            {CATEGORIES?.map((data) => {
              return (
                <RhChip
                  size="base"
                  className="px-4   py-2 bg-transparent text-sm font-semibold border rounded-[48px] h-12"
                  key={data.name}
                >
                  {data.name}
                </RhChip>
              );
            })}
          </RhChipGroup>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {allAnnouncements?.data?.results?.map((announcement, idx) => {
            return (
              <AnnouncementCard
                data={announcement}
                key={idx}
              ></AnnouncementCard>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AllAnnouncements;
