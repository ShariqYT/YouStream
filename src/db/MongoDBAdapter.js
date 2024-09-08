import { MongoDBAdapter as NextAuthMongoDBAdapter } from "@auth/mongodb-adapter";

const MongoDBAdapter = (client) => {
  const adapter = NextAuthMongoDBAdapter(client);

  return {
    ...adapter,
    async createUser(profile) {
      const defaultUser = {
        ...profile,
        subscribedChannelIds: profile.subscribedChannelIds || [],
        likedVideoIds: profile.likedVideoIds || [],
        dislikedVideoIds: profile.dislikedVideoIds || [],
        createdAt: profile.createdAt || new Date(),
      };

      return adapter.createUser(defaultUser);
    },
    // Add other methods if needed
  };
};

export default MongoDBAdapter;
