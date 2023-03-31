import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  getContent,
  RenderContent,
  getBuilderSearchParams,
} from "@builder.io/sdk-qwik";

export const BUILDER_PUBLIC_API_KEY = "f7770b9e2a4d4413ad5f04c3a7e73c88"; // <-- Add your Public API KEY here
export const BUILDER_MODEL = "page";

// Use Qwik City's `useBuilderContent` to get your content from Builder.
// `routeLoader$()` takes an async function to fetch content
// from Builder with `getContent()`.
export const useBuilderContent = routeLoader$(async ({ url, error }) => {
  const builderContent = await getContent({
    model: BUILDER_MODEL,
    apiKey: BUILDER_PUBLIC_API_KEY,
    options: getBuilderSearchParams(url.searchParams),
    userAttributes: {
      urlPath: url.pathname,
    },
  });
  // If there's no content, throw a 404.
  // You can use your own 404 component here
  if (!builderContent) {
    throw error(404, "File Not Found");
  }
  // return content fetched from Builder
  return builderContent;
});

export default component$(() => {
  // call useBuilderContent() and set content equal to
  // returned builderContent
  const content = useBuilderContent();
  // RenderContent uses `content` to
  // render the content of the given model, here a page,
  // of your space (specified by the API Key)
  return (
    <RenderContent
      model={BUILDER_MODEL}
      content={content.value}
      apiKey={BUILDER_PUBLIC_API_KEY}
    />
  );
});
