import { defineType, defineField, defineArrayMember } from "sanity";

export const product = defineType({
    name: "product",
    type: "document",
    title: "Product",
    fields: [
        defineField({
            name: "title",
            type: "string",
            title: "Title",
            validation: (Rule) => Rule.required().error("This field is required"),
        }),

        defineField({
            name: "slug",
            type: "slug",
            title: "Slug",
            validation: Rule => Rule.required().error('This field is req    uired'),
            options: {
                source: "title",
                maxLength: 96,
            },
        }),

        defineField({
            name: "price",
            type: "number",
            title: "Price",
            validation: (Rule) => Rule.required().error("This field is required"),
        }),

        defineField({
            name: "discountedPrice",
            type: "number",
            title: "Discounted Price",
        }),

        defineField({
            name: "summary",
            type: "text",
            title: "Summary",
            validation: (Rule) => Rule.required().error("This field is required"),
        }),

        defineField({
            name: "sizeQuantities",
            type: "object",
            title: "Size Quantities",
            fields: [
                defineField({
                    name: "large",
                    type: "number",
                    title: "Large Quantity",
                    validation: (Rule) => Rule.required().min(0).error("Large quantity must be a positive number"),
                }),
                defineField({
                    name: "medium",
                    type: "number",
                    title: "Medium Quantity",
                    validation: (Rule) => Rule.required().min(0).error("Medium quantity must be a positive number"),
                }),
                defineField({
                    name: "small",
                    type: "number",
                    title: "Small Quantity",
                    validation: (Rule) => Rule.required().min(0).error("Small quantity must be a positive number"),
                }),
            ],
        }),

        defineField({
            name: "colors",
            type: "array",
            title: "Colors",
            of: [
                defineArrayMember({
                    type: "string",
                    title: "Color",
                }),
            ],
            validation: (Rule) => Rule.required().error("This field is required"),
        }),

        defineField({
            name: "totalItems",
            type: "number",
            title: "Total Items",
            validation: (Rule) => Rule.required().min(1).error("Total items must be at least 1"),
        }),

        defineField({
            name: "image",
            type: "image",
            title: "Image",
            validation: Rule => Rule.required().error('This field is required'),
        }),


        defineField({
            name: "Featureds",
            type: "text",
            title: "Featureds",
            validation: (Rule) => Rule.required().error("This field is required"),
        }),


    ],
});
