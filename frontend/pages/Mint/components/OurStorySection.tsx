// Internal components
import { buttonVariants } from "@/components/ui/button";
// import { TriImageBanner } from "@/pages/Mint/components/TriImageBanner";
// Internal config
import { config } from "@/config";

interface OurStorySectionProps {}

export const OurStorySection: React.FC<OurStorySectionProps> = () => {
  if (!config.ourStory) return null;

  return (
    <section className="our-story-container bg-black px-4 flex flex-col md:flex-row gap-6 max-w-screen-xl mx-auto w-full items-center">
      <div className="basis-3/5">
        <p className="label-sm text-white">Ending the Era of Lost Bookings</p>
        <p className="heading-md text-white">{config.ourStory.title}</p>
        <p className="body-sm pt-2 text-white">Hotel Coin Exchange was born from a simple idea: to create a better travel experience for everyone. We believe that travelers should have the freedom to manage their bookings without fear of penalties or restrictions. By leveraging the power of NFTs and blockchain, we've built a platform that connects travelers directly, fostering a community of shared resources and mutual benefit. We're not just selling hotel rooms; we're building a more equitable and dynamic travel ecosystem.</p>
        {/* {config.socials?.discord && (
          <a
            href={config.socials.discord}
            target="_blank"
            className={buttonVariants({
              variant: "outline",
              className: "mt-4",
            })}
          >
            Join Our Discord
          </a>
        )} */}
      </div>

      {/* {config.ourStory.images && config.ourStory.images?.length > 0 && (
        <TriImageBanner images={config.ourStory.images} className="basis-2/5" />
      )} */}

    </section>
  );
};
