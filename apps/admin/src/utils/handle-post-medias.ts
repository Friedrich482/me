import { extractImagesUrls } from "./extract-images-urls";
import { trpcLoaderClient as trpcClient } from "./trpc";

export const handlePostMedias = async (content: string, postId: string) => {
  const extractedImagesUrls = extractImagesUrls(content);

  const existingMediaNotAttachedToPost = await trpcClient.media.findAll.query({
    postId: null,
  });
  const existingMediaAttachedToPost = await trpcClient.media.findAll.query({
    postId,
  });
  const existingMediaFromDb = existingMediaNotAttachedToPost.concat(
    ...existingMediaAttachedToPost,
  );

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
