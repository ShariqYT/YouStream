import getCurrentSubscriptions from '@/actions/getCurrentSubscriptions'
import getCurrentUser from '@/actions/getCurrentUser'
import getSubscriptionVideo from '@/actions/getSubscriptionVideo'
import SubscriptionHeader from '@/components/Subscriptions/SubscriptionHeader'
import SubscriptionList from '@/components/Subscriptions/SubscriptionList'
import React from 'react'

const subscriptions = async () => {
  const subscriptions = await getCurrentSubscriptions()
  const currentUser = await getCurrentUser()
  const subscriptionVideos = await getSubscriptionVideo()
  
  return (
    <div className='mx-24 flex flex-col items-end'>
      <SubscriptionHeader currentUser={currentUser} subscriptions={subscriptions} />
      {
        subscriptionVideos.length ? <SubscriptionList videos={subscriptionVideos} /> : <div className='text-xl m-auto w-fit transform translate-x-1/2 translate-y-1/2'>Subscribe to get videos here</div>
      }
    </div>
  )
}

export default subscriptions