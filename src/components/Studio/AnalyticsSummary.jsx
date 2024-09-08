'use client'

import { CurrentChannelContext } from "@/context/CurrentChannelContext";
import { useProtectedRoutes } from "@/hooks/useProtectedRoutes"
import { useContext, useMemo } from "react";
import Avatar from "../Navbar/Avatar";
import AnalyticsSummaryItem from "./AnalyticsSummaryItem";
import { compactNumberFormat } from "@/utils/numUtils";

const AnalyticsSummary = ({ videos }) => {
    useProtectedRoutes();

    const currentChannel = useContext(CurrentChannelContext)

    const viewsCount = useMemo(
        () =>
            videos?.reduce((totalViews, video) =>
                totalViews + video.viewCount, 0),
        [videos]
    )

    return (
        <div className="mx-auto flex items-center gap-4">
            <Avatar classname={'object-cover aspect-square cursor-pointer hidden md:inline'} imageSrc={currentChannel?.imageSrc} alt={currentChannel?.name} width={120} height={120} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <AnalyticsSummaryItem value={currentChannel?.name} subtitle={`@${currentChannel?.handle}`} />
                <AnalyticsSummaryItem value={compactNumberFormat(currentChannel?.subscriberCount)} subtitle={`Subscribers`} />
                <AnalyticsSummaryItem value={compactNumberFormat(viewsCount)} subtitle={`Views`} />
                <AnalyticsSummaryItem value={compactNumberFormat(videos?.length)} subtitle={`Videos`} />
            </div>
        </div>
    )
}

export default AnalyticsSummary
