import extractImageUrls from "./extractImagesUrls";
import { trpcLoaderClient as trpcClient } from "./trpc";

const handlePostMedias = async (content: string, postId: string) => {
  const extractedImagesUrls = extractImageUrls(content);
  const existingMediaFromDb = await trpcClient.media.findAll.query({
    postId: null,
  });

  const deletedMedias = existingMediaFromDb.filter(
    (media) => !extractedImagesUrls.includes(media.url),
  );
  const conservedMedia = existingMediaFromDb.filter((media) =>
    extractedImagesUrls.includes(media.url),
  );

  const deleteOrphanMediaMutations = deletedMedias.map((deletedMedia) =>
    trpcClient.media.delete.mutate({ fileUrl: deletedMedia.url, postId }),
  );
  const attachMediaToPostMutation = conservedMedia.map((conservedMedia) =>
    trpcClient.media.attachMediaToPost.mutate({
      fileUrl: conservedMedia.url,
      postId,
    }),
  );

  await Promise.allSettled([
    ...deleteOrphanMediaMutations,
    ...attachMediaToPostMutation,
  ]);
};

export default handlePostMedias;
