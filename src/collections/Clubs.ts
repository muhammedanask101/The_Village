import type { CollectionConfig } from "payload";

export const Clubs: CollectionConfig = {
    slug: "clubs",
    admin: { useAsTitle: "name" },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            index: true,
            hooks: {
            beforeValidate: [
                ({ data }) => {
                if (!data) return data; // exit early if undefined
                if (!data.slug && data.name) {
                    data.slug = data.name
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9\-]/g, "");
                }
                return data;
                },
            ],
            },
        },
        {
            name: "color",
            type: "text",
        },

        {
            name: "metaTitle",
            type: "text",
            maxLength: 70,
            hooks: {
                beforeValidate: [
                ({ data }) => {
                    if (!data) return data;
                    if (!data.metaTitle && data.name) {
                    data.metaTitle = `${data.name} | Zaman al Hikmah`;
                    }
                    return data;
                },
                ],
            },
            admin: { description: "Title for SEO (auto-generated from name if empty)" },
        },
        {
            name: "metaDescription",
            type: "textarea",
            maxLength: 160,
            hooks: {
                beforeValidate: [
                ({ data }) => {
                    if (!data) return data;
                    if (!data.metaDescription && data.name) {
                    data.metaDescription = `Explore articles or products in the ${data.name} category on Zaman al Hikmah.`;
                    }
                    return data;
                },
                ],
            },
            admin: { description: "Description for SEO (auto-generated if empty)" },
        },
        {
            name: "ogImage",
            type: "upload",
            relationTo: "media",
            admin: { description: "Thumbnail image for sharing on social media (Optional)" },
        },
    ],
};