// Internal components
import { Card } from "@/components/ui/card";
// Internal utils
import { clampNumber } from "@/utils/clampNumber";
// Internal hooks
import { useGetCollectionData } from "@/hooks/useGetCollectionData";

interface StatsSectionProps {}

export const StatsSection: React.FC<StatsSectionProps> = () => {
  const { data } = useGetCollectionData();
  const { maxSupply = 0, totalMinted = 0 } = data ?? {};

  return (
    <section className="stats-container bg-black px-4 max-w-screen-xl mx-auto w-full">
      <ul className="flex flex-col md:flex-row gap-6">
        {[
          { title: "Available Rooms", value: maxSupply },
          { title: "Total Rooms", value: totalMinted },
        ].map(({ title, value }) => (
          <li className="basis-1/2 " key={title + " " + value}>
            <Card className="py-2 bg-[#a0522d] px-4 " shadow="md">
              <p className="label-sm text-slate-200">{title}</p>
              <p className="heading-sm text-white">{clampNumber(value)}</p>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
};
