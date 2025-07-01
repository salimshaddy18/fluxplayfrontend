import React from "react";

const PlaylistPage = () => {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#0f1a24] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Be Vietnam Pro", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">My Playlists</p>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded h-8 px-4 bg-[#20364b] text-white text-sm font-medium leading-normal">
                <span className="truncate">New Playlist</span>
              </button>
            </div>
            {[
              { title: "Favorites", name: "My Favorite Tracks", curator: "Sarah", count: 10, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQsBZCu0QbF165o8oLUMI3Yzaxm2CdBtpsUfZ0QllFUZAyKycgd_EvvcT7989mCkkGSDz6p_ZAx-zLYjZd9kFbwlroko77J8X3ytpG4ok4JHnnXOM1-rQnGUW5_uMrdgwid0xxjuU7voxKoOpFBBl8a-PjZ5QbbrLsr0LQuCEFASKqH1LSXrnmTXoRoJTSyha0WQcn_4aPdFRAeN21S_TZ2-txAYmyOSSJHpccUwCf9rU2_16mDHBpzHfS2TicQh1dfsUpbcyseiI" },
              { title: "Recently Added", name: "Chill Vibes", curator: "Alex", count: 5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiqVnJ0kukq_gmvCb3OnVY61w8m9uRl7tgn-sfMl8G5hPA0HgXhHKr6VEM_5sxAxy9pJHIHoU57IaX9VgKXskQOtku_nJRoQYyIcQmVO_aExSOnKZJxJKJaQChhVN-VL5ws0VYkI8ziGQo2JYsy_-URdKlv4tnu79H5hy8vjcp9P6lmHbIWbB_E8SV-gWsQTVBhd2P1DSy_8nDvo58GCIvaeQf16o4Z_VSOwQLQHL9zOJ4_QBm8Ekh-qaGGHDfV_H7ybI3v0K6OCQ" },
            ].map(({ title, name, curator, count, image }, idx) => (
              <div key={idx} className="p-4">
                <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">{title}</h3>
                <div className="flex items-stretch justify-between gap-4 rounded">
                  <div className="flex flex-col gap-1 flex-[2_2_0px]">
                    <p className="text-[#8daece] text-sm font-normal leading-normal">Playlist · {count} videos</p>
                    <p className="text-white text-base font-bold leading-tight">{name}</p>
                    <p className="text-[#8daece] text-sm font-normal leading-normal">Curated by {curator}</p>
                  </div>
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded flex-1"
                    style={{ backgroundImage: `url(${image})` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;