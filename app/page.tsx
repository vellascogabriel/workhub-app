import Container from "./components/container/Container";
import Categories from "./components/categories/Categories";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={<div className="h-6"></div>}>
        <Categories />
      </Suspense>
      <Container>
        <div className="pt-6 pb-20">
          <h1 className="text-3xl font-bold">Discover Workspaces</h1>
          <p className="text-neutral-500 mt-2">
            Find the perfect coworking space for your needs
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {/* Workspace listings will go here */}
          </div>
        </div>
      </Container>
    </>
  );
}
