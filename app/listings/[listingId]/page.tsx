import getCurrentUser from "@/app/libs/actions/getCurrentUser";
import getListingById from "@/app/libs/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

interface PageParams {
  listingId: string;
}

interface PageProps {
  params: PageParams;
}

const ListingPage = async ({ params }: PageProps) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <EmptyState
        title="Workspace não encontrado"
        subtitle="Este espaço de trabalho não existe ou foi removido."
      />
    );
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
    />
  );
};

export default ListingPage;
