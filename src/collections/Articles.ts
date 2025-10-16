import type { CollectionConfig } from "payload";

export const Articles: CollectionConfig = {
    slug: "articles",

    admin: {
        useAsTitle: "title",
    },

    labels: {
        singular: "Article",
        plural: "Articles",
    },

    access: {
        read: () => true,
        create: ({ req }) => !!req.user,
        update: ({ req }) => !!req.user,
        delete: ({ req }) => !!req.user?.roles?.includes("admin"),
    },

    fields: [
    {
        name: "title",
        type: "text",
        required: true,
        maxLength: 50,
        minLength: 5,
    },
    {
        name: "description",
        type: "textarea",
        maxLength: 500,
        minLength: 10,
    },
    {
        name: "body",
        type: "richText",
        required: true,
    },
    {
        name: "user",
        type: "relationship",
        relationTo: "users",
        required: true,
        admin: {
            position: "sidebar",
        },
    },
    {
        name: "club",
        type: "relationship",
        relationTo: "clubs",
        required: true,
    },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text", maxLength: 20 }],
    },
    {
        name: "image",
        type: "upload",
        relationTo: "media",
        admin: {
            position: "sidebar",
        },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
        name: "date",
        type: "date",
        required: true,
        defaultValue: new Date().toISOString(),
    },

    {
        name: "metaTitle",
        type: "text",
        maxLength: 70,
        admin: {
            description: "SEO title (auto-filled from article title if left blank)",
        },
        hooks: {
            beforeValidate: [
            ({ data }) => {
                if (data && !data.metaTitle && data.title) {
                data.metaTitle = data.title;
                }
                return data;
            },
            ],
        },
    },
    {
        name: "metaDescription",
        type: "textarea",
        maxLength: 160,
        admin: {
            description: "SEO description (auto-filled from article description if left blank)",
        },
        hooks: {
            beforeValidate: [
            ({ data }) => {
                if (data && !data.metaDescription && data.description) {
                data.metaDescription = data.description.slice(0, 157) + "...";
                }
                return data;
            },
            ],
    },
    },
    {
        name: "slug",
        type: "text",
        required: true,
        unique: true,
        admin: {
            description: "URL-friendly identifier (auto-generated from title if left blank)",
        },
        hooks: {
            beforeValidate: [
            ({ data }) => {
                if (data && !data.slug && data.title) {
                data.slug = data.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)+/g, "");
                }
                return data;
            },
            ],
        },
    }
]
}