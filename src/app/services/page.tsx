import { ServicesContent } from "@/components/sections/ServicesContent";
import { ALL_SERVICES } from "@/lib/services-data";

export const metadata = {
  title: "Our Services | Clean Globe Consultancy",
  description: "Comprehensive sustainability solutions, from ESG strategy and Net Zero advisory to green building certification.",
};

export default function ServicesPage() {
  return <ServicesContent services={ALL_SERVICES} />;
}
