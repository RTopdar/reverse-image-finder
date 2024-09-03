import React from "react";
import WordPullUp from "@/components/magicui/word-pull-up";
import BlurFade from "@/components/magicui/blur-fade";
const PageInfo = () => {
  const images = Array.from({ length: 12 }, (_, i) => {
    const isLandscape = i % 2 === 0;
    const width = isLandscape ? 800 : 600;
    const height = isLandscape ? 600 : 800;
    return `https://picsum.photos/seed/${i + 1}/${width}/${height}`;
  });
  return (
    <section className="w-full homepage-section-height flex flex-col items-center justify-center">
      <div className="  h-2/5">
        <WordPullUp
          className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem] "
          words="Reverse Image Search"
        />
        <p className="text-lg text-black dark:text-white md:text-2xl">
          Search by image to find similar images based on deep learning
        </p>
      </div>
      <div className="flex-grow p-4 w-full h-[150px] mt-3 overflow-y-scroll">
       
          <div className="columns-2 gap-4 sm:columns-3  overflow-y-scroll">
            {images.map((imageUrl, idx) => (
              <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
                <img
                  className="mb-4 size-full rounded-lg object-contain"
                  src={imageUrl}
                  alt={`Random stock image ${idx + 1}`}
                />
              </BlurFade>
            ))}
          </div>
        
      </div>
    </section>
  );
};

export default PageInfo;
