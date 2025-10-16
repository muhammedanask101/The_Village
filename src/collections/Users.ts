import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: "username",
      required: true,
      unique: true,
      type: "text",
      minLength: 1,
      maxLength: 20,
    },
    {
      name: "pfp",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "roles",
      type: "select",
      defaultValue: ["user"],
      hasMany: true,
      required: true,
      options: ["admin", "user"],
      admin: {
        position: "sidebar",
      },
    },
  ],
}
