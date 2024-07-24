import LinkMain from "@/components/link/LinkMain";
import { getLinks } from "@/lib/link";

async function LinkPage() {
  const links = await getLinks();
  return <LinkMain links={links} />;
}

export default LinkPage;
