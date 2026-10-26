import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['index', 'title', 'status', 'kind'],
    group: 'Portfolio',
    description:
      'Work entries. BioBuild, AT&T, and T-Mobile are filled case studies. Earlier roles are short cards. Do not invent metrics, clients, or screenshots.',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Card',
          fields: [
            { name: 'index', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'client', type: 'text', required: true },
            {
              name: 'status',
              type: 'select',
              required: true,
              options: [
                { label: 'Filled case study', value: 'filled' },
                { label: 'Résumé summary', value: 'summary' },
                { label: 'Role card', value: 'card' },
                { label: 'Pending clearance', value: 'tbd' },
                { label: 'Reserved', value: 'reserved' },
              ],
            },
            {
              name: 'kind',
              type: 'select',
              required: true,
              options: [
                { label: 'Filled case', value: 'case' },
                { label: 'Résumé summary', value: 'corporate' },
                { label: 'Role card', value: 'card' },
                { label: 'Reserved slot', value: 'reserved' },
              ],
            },
            {
              name: 'caseSlug',
              type: 'text',
              admin: {
                description:
                  'URL segment under /work for case studies and résumé summaries. Role cards are not separate pages.',
              },
            },
            { name: 'summary', type: 'textarea', required: true },
            {
              name: 'cardSummary',
              type: 'textarea',
              admin: {
                description:
                  'Work page card only. Leave empty to reuse the summary. The case study page keeps Summary.',
              },
            },
            {
              name: 'tags',
              type: 'array',
              fields: [{ name: 'label', type: 'text', required: true }],
            },
            { name: 'href', type: 'text', required: true },
            {
              name: 'imageUrl',
              type: 'text',
              admin: {
                description:
                  'CDN or site URL. Leave empty for placeholders — do not paste stock photos.',
              },
            },
            { name: 'imageAlt', type: 'text' },
            { name: 'liveUrl', type: 'text' },
            { name: 'liveLabel', type: 'text' },
            {
              name: 'statusLabel',
              type: 'text',
              admin: {
                description:
                  'Small status line on the card (homepage rail and work index). Example: Case study.',
              },
            },
            {
              name: 'mediaBadge',
              type: 'text',
              admin: {
                description:
                  'Badge over the card image. Example: Live. Leave empty when the card uses a coded visual instead of a photo.',
              },
            },
            { name: 'showOnRail', type: 'checkbox', defaultValue: false },
            { name: 'railOrder', type: 'number', defaultValue: 0 },
          ],
        },
        {
          label: 'Case study',
          fields: [
            { name: 'role', type: 'text' },
            { name: 'year', type: 'text' },
            { name: 'dates', type: 'text' },
            { name: 'location', type: 'text' },
            {
              name: 'stack',
              type: 'array',
              fields: [{ name: 'label', type: 'text', required: true }],
            },
            {
              name: 'accent',
              type: 'select',
              defaultValue: 'moss',
              options: [
                { label: 'Moss', value: 'moss' },
                { label: 'Crimson', value: 'crimson' },
                { label: 'Gold', value: 'gold' },
              ],
            },
            {
              name: 'log',
              type: 'array',
              fields: [
                { name: 'stamp', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
            {
              name: 'sections',
              type: 'array',
              fields: [
                { name: 'anchor', type: 'text', required: true },
                { name: 'eyebrow', type: 'text' },
                { name: 'title', type: 'text', required: true },
                {
                  name: 'body',
                  type: 'textarea',
                  admin: { description: 'Separate paragraphs with a blank line.' },
                },
              ],
            },
            {
              name: 'highlights',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
              ],
            },
            {
              name: 'facts',
              type: 'array',
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            {
              name: 'gallery',
              type: 'array',
              fields: [
                { name: 'url', type: 'text', required: true },
                { name: 'alt', type: 'text', required: true },
                { name: 'caption', type: 'text' },
                {
                  name: 'placement',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Hero', value: 'hero' },
                    { label: 'Problem', value: 'problem' },
                    { label: 'Approach', value: 'approach' },
                  ],
                },
              ],
            },
            {
              name: 'plates',
              type: 'array',
              admin: {
                description: 'Empty screenshot slots for NDA placeholders. No fake product UI.',
              },
              fields: [
                { name: 'label', type: 'text', required: true },
                {
                  name: 'aspect',
                  type: 'select',
                  required: true,
                  defaultValue: 'landscape',
                  options: [
                    { label: 'Wide', value: 'wide' },
                    { label: 'Landscape', value: 'landscape' },
                    { label: 'Portrait', value: 'portrait' },
                  ],
                },
              ],
            },
            { name: 'nextHref', type: 'text' },
            { name: 'nextIndex', type: 'text' },
            { name: 'nextTitle', type: 'text' },
            { name: 'ndaNote', type: 'textarea' },
            {
              name: 'closing',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'accent', type: 'text' },
                { name: 'body', type: 'textarea' },
                { name: 'primaryLabel', type: 'text' },
                { name: 'primaryHref', type: 'text' },
                { name: 'secondaryLabel', type: 'text' },
                { name: 'secondaryHref', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
