import Header from "@/components/Navbar/Header";
import "./globals.css";
import BottomNav from "@/components/Navbar/BottomNav";
import NextTopLoader from 'nextjs-toploader';
import getCurrentUser from "@/actions/getCurrentUser";
import CreateChannelModal from "@/components/Modal/CreateChannelModal";
import { Toaster } from "react-hot-toast";
import getCurrentChannel from "@/actions/getCurrentChannel";
import CreateChannelModalProvider from "@/context/CreateChannelModalContext";
import CurrentUserProvider from "@/context/CurrentUserContext";
import CurrentChannelProvider from "@/context/CurrentChannelContext";
import UploadVideoModalProvider from "@/context/UploadVideoModalContext";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { OurFileRouter } from "@/app/api/uploadthing/core";


export const metadata = {
  title: "YouStream",
  description: "Broadcast Yourself, Watch the World.",
};

export default async function RootLayout({ children }) {

  const currentUser = await getCurrentUser();
  const currentChannel = await getCurrentChannel();

  return (
    <html lang="en">
      <body>
        <NextSSRPlugin
          routerConfig={extractRouterConfig(OurFileRouter)}
        />
        <CreateChannelModalProvider>
          <NextTopLoader color="#35b7ff" easing="ease" shadow="0 0 30px #35b7ff,0 0 15px #35b7ff" zIndex={1600} speed={100} crawler={true} crawlSpeed={100} showSpinner={false} />
          <Toaster toastOptions={{ duration: 5000, position: 'bottom-right' }} />
          <CreateChannelModal />
          <CurrentUserProvider user={currentUser}>
            <CurrentChannelProvider channel={currentChannel}>
              <UploadVideoModalProvider>
                <Header />
                <div className="mt-24 md:mt-28">
                  {children}
                </div>
                <BottomNav />
              </UploadVideoModalProvider>
            </CurrentChannelProvider>
          </CurrentUserProvider>
        </CreateChannelModalProvider>
      </body>
    </html>
  );
}
