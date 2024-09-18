import type { MetaFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only";

import { CoinChart } from "~/components/CoinChart";



export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {


  return (
    
    <div className="flex h-screen items-center justify-center w-full">
      
      <ClientOnly fallback={null}>
     {() => <CoinChart/>}
  </ClientOnly>
    </div>
  );
}

