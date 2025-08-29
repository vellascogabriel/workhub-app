import getCurrentUser from "@/app/libs/actions/getCurrentUser";
import getListingById from "@/app/libs/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

// Let Next.js infer PageProps to avoid mismatches with generated types
const ListingPage = async (props: unknown) => {
  const { params } = props as { params: { listingId: string } };
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
