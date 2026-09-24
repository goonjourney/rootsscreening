import type { Collection } from "tinacms";

const Screening: Collection = {
  label: "Lokasi Screening",
  name: "screening",
  path: "content/screenings",
  format: "json",
  fields: [
    { type: "string", name: "title", label: "Nama Lokasi / Venue", isTitle: true, required: true },
    { type: "string", name: "title_en", label: "Nama Lokasi (EN), isi hanya bila berbeda" },
    {
      type: "string",
      name: "region",
      label: "Wilayah",
      required: true,
      options: [
        { label: "Bali", value: "bali" },
        { label: "DIY", value: "jogja" },
        { label: "Jawa Barat", value: "jabar" },
        { label: "Jakarta", value: "jakarta" },
        { label: "Jawa Timur", value: "jatim" },
      ],
    },
    { type: "string", name: "category_id", label: "Kategori / Segmen Audiens (ID)" },
    { type: "string", name: "category_en", label: "Kategori / Segmen Audiens (EN)" },

    {
      type: "string",
      name: "date",
      label: "Tanggal Pemutaran",
      description: "Format TAHUN-BULAN-TANGGAL, contoh 2026-10-15. Kosongkan bila jadwal belum pasti (TBA).",
      ui: {
        validate: (value?: string) =>
          value && !/^\d{4}-\d{2}-\d{2}$/.test(value) ? "Gunakan format 2026-10-15" : undefined,
      },
    },
    { type: "string", name: "time", label: "Jam", description: "Contoh: 18.30 WITA" },
    { type: "string", name: "dateLabel_id", label: "Teks tanggal khusus (ID)", description: "Opsional, untuk lebih dari satu hari. Contoh: 21 Mei & 3 Juni 2025" },
    { type: "string", name: "dateLabel_en", label: "Teks tanggal khusus (EN)" },

    { type: "string", name: "address", label: "Alamat" },
    { type: "number", name: "lat", label: "Latitude" },
    { type: "number", name: "lng", label: "Longitude" },

    { type: "image", name: "thumbnail", label: "Foto Cover (marker & kartu)" },
    { type: "image", name: "gallery", label: "Galeri Foto Tambahan", list: true },

    { type: "string", name: "description_id", label: "Deskripsi / Teks Undangan (ID)", ui: { component: "textarea" } },
    { type: "string", name: "description_en", label: "Deskripsi / Teks Undangan (EN)", ui: { component: "textarea" } },
    { type: "string", name: "review_id", label: "Ulasan Event, diisi setelah berlangsung (ID)", ui: { component: "textarea" } },
    { type: "string", name: "review_en", label: "Ulasan Event, diisi setelah berlangsung (EN)", ui: { component: "textarea" } },

    {
      type: "object",
      name: "mediaLinks",
      label: "Ulasan Media",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title || "Tautan media" }) },
      fields: [
        { type: "string", name: "title", label: "Nama Media" },
        { type: "string", name: "url", label: "Link" },
        { type: "string", name: "note_id", label: "Deskripsi singkat (ID)" },
        { type: "string", name: "note_en", label: "Deskripsi singkat (EN)" },
      ],
    },
    { type: "string", name: "rsvpUrl", label: "Link Pendaftaran / WhatsApp", description: "Opsional, untuk yang ingin datang" },
  ],
};

export default Screening;