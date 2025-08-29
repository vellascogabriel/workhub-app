export const dynamic = 'force-dynamic';

import Container from './components/container/Container';
import Categories from './components/categories/Categories';
import { Suspense } from 'react';
import getListings from './libs/actions/getListings';
import getCurrentUser from './libs/actions/getCurrentUser';
import ListingCard from './components/listings/ListingCard';
import EmptyState from './components/ui/feedback/EmptyState';

// Usando a abordagem mais simples para Next.js 15
export default async function Home() {
  // Buscar dados sem filtros iniciais
  const listings = await getListings({});
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <>
        <Suspense fallback={<div className="h-6"></div>}>
          <Categories />
        </Suspense>
        <EmptyState showReset />
      </>
    );
  }

  return (
    <>
      <Suspense fallback={<div className="h-6"></div>}>
        <Categories />
      </Suspense>
      <Container>
        <div className="pt-6 pb-20">
          <h1 className="text-3xl font-bold">Discover Workspaces</h1>
          <p className="text-neutral-500 mt-2">Find the perfect coworking space for your needs</p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map(listing => (
              <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
