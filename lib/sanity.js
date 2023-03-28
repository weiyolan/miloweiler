// import Image from "next/image";
import {
  // groq,   
  createClient,
  // createPortableTextComponent,
//   definePreview replaces createPreviewSubscriptionHook
} from "next-sanity";

// import imageUrlBuilder from "@sanity/image-url";s

// import { PortableText as PortableTextComponent } from "@portabletext/react";
import { config } from "./config";
// import GetImage from "@utils/getImage";

if (!config.projectId) {
  throw Error(
    "The Project ID is not set. Check your environment variables."
  );
}

//https://www.sanity.io/guides/sanity-nextjs-tailwindcss#4811f990ffe1


// export const imageBuilder = source => createImageUrlBuilder(config).image(source);

// export const usePreviewSubscription = definePreview(config)

// export const PortableText = createPortableTextComponent({
//     ...config,
//     // Serializers passed to @sanity/block-content-to-react
//     // (https://github.com/sanity-io/block-content-to-react)
//     serializers: {},
//   })

// // Barebones lazy-loaded image component
// const ImageComponent = ({ value }) => {
// //   const {width, height} = getImageDimensions(value)
//   return (
//     <Image
//       {...GetImage(value)}
//       blurDataURL={GetImage(value).blurDataURL}
//       objectFit="cover"
//       sizes="(max-width: 800px) 100vw, 800px"
//       alt={value.alt || " "}
//       placeholder="blur"
//       loading="lazy"
//     />
//   );
// };

// const components = {
//   types: {
//     image: ImageComponent,
//     code: props => (
//       <pre data-language={props.node.language}>
//         <code>{props.node.code}</code>
//       </pre>
//     )
//   },
//   marks: {
//     center: props => (
//       <div className="text-center">{props.children}</div>
//     ),
//     highlight: props => (
//       <span className="font-bold text-brand-primary">
//         {props.children}
//       </span>
//     ),
//     link: props => (
//       <a href={props?.value?.href} target="_blank" rel="noopener">
//         {props.children}
//       </a>
//     )
//   }
// };
// // Set up Portable Text serialization
// export const PortableText = props => createPortableTextComponent({
//   ...config,
//   serializers:{components} ,
//   ...props
// });

const client = createClient(config);

// export const previewClient = createClient({
//   ...config,
//   useCdn: false,
//   token: process.env.SANITY_API_TOKEN,

// });

// export const urlFor = source => imageUrlBuilder(client).image(source)


// export const getClient = (usePreview) => (usePreview ? previewClient : sanityClient)
// export const useCurrentUser = createCurrentUserHook(config)

export default client;

