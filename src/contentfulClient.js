import { createClient } from "contentful";

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export async function fetchCoffees() {
  const entries = await client.getEntries({ content_type: "coffees" });
  return entries.items.map((item) => {
    const f = item.fields;
    return {
      id: item.sys.id,
      name: f.name,
      description: f.description,
      price: f.price,
      category: f.category,
      image: f.image?.fields?.file?.url
        ? "https:" + f.image.fields.file.url
        : null,
      featured: !!f.featured,
    };
  });
}
