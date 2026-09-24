import type { Collection } from 'tinacms';

const Page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join('/');
      if (filepath === 'home') return '/';
      return `/${filepath}`;
    },
  },
  fields: [
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections Halaman ROOTS',
      templates: [
        // 1. Hero Block
        {
          name: 'hero',
          label: '1. Hero Section',
          fields: [
            { type: 'string', name: 'title', label: 'Judul (ID)' },
            { type: 'string', name: 'title_en', label: 'Judul (EN)' },
            { type: 'string', name: 'synopsis', label: 'Sinopsis (ID)', ui: { component: 'textarea' } },
            { type: 'string', name: 'synopsis_en', label: 'Sinopsis (EN)', ui: { component: 'textarea' } },
          ],
        },
        // 2. Roadshow Map Block
        {
          name: 'roadshowMap',
          label: '2. Peta & Jadwal Roadshow',
          fields: [
            { type: 'string', name: 'sectionTitle', label: 'Judul Section' },
          ],
        },
        // 3. Film & Curatorial Block
        {
          name: 'filmCuratorial',
          label: '3. The Film & Kuratorial',
          fields: [
            { type: 'string', name: 'sectionTitle', label: 'Judul Section' },
          ],
        },
        // 4. Exhibitions & Media Block
        {
          name: 'exhibitionsMedia',
          label: '4. Exhibitions & Media',
          fields: [
            { type: 'string', name: 'sectionTitle', label: 'Judul Section' },
          ],
        },
      ],
    },
  ],
};

export default Page;