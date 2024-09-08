import { createRouteHandler } from "uploadthing/next";
 
import { OurFileRouter } from "./core";
 
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: OurFileRouter,
 
  // Apply an (optional) custom config:
  // config: { ... },
});