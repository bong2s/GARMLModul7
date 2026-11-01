// Learning content definitions for Modul 7 (Aritmetika Komputer).
//
// Topics, in learning order:
//   1. ALU
//   2. Representasi Integer
//   3. Aritmetika Integer
//   4. Representasi Floating-Point
//   5. Aritmetika Floating-Point

export type LessonBlock =
  | { kind: "heading"; text: string }
  | { kind: "text"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "formula"; text: string }
  | { kind: "example"; lines: string[] };

export interface LessonTopic {
  id: string;
  title: string;
  short: string;
  blocks: LessonBlock[];
}

export const MODULE_TOPICS: LessonTopic[] = [
  {
    id: "alu",
    title: "ALU",
    short: "Arithmetic Logic Unit",
    blocks: [
      { kind: "heading", text: "Fungsi ALU" },
      {
        kind: "text",
        text: "ALU (Arithmetic Logic Unit) adalah bagian CPU yang melakukan operasi aritmetika dan logika. ALU mengambil dua operan dari register, sinyal kontrol dari unit kontrol menentukan operasi yang dijalankan, dan hasilnya dikirim kembali ke register.",
      },
      { kind: "heading", text: "Jenis operasi" },
      {
        kind: "list",
        ordered: false,
        items: [
          "Aritmetika: penjumlahan, pengurangan, perkalian, dan pembagian.",
          "Logika: AND, OR, NOT, XOR, serta shift (geser) bit.",
        ],
      },
      { kind: "heading", text: "Status flag" },
      { kind: "text", text: "Setiap operasi juga menghasilkan status flag:" },
      {
        kind: "list",
        ordered: false,
        items: [
          "Z (Zero): bernilai 1 jika hasil nol.",
          "N (Negative): bernilai 1 jika bit paling kiri hasil bernilai 1.",
          "C (Carry): bernilai 1 jika ada carry keluar dari bit paling kiri, relevan untuk bilangan tak bertanda.",
          "V (Overflow): bernilai 1 jika hasil bertanda berada di luar rentang, relevan untuk bilangan bertanda. C dan V adalah dua hal yang berbeda.",
        ],
      },
      { kind: "heading", text: "Contoh 4-bit" },
      { kind: "text", text: "0101 (+5) + 0011 (+3):" },
      { kind: "example", lines: ["  0101   (+5)", "+ 0011   (+3)", "-------", "  1000   (-8)"] },
      {
        kind: "text",
        text: "Tidak ada carry keluar (C = 0), tetapi dua operan positif menghasilkan 1000, yaitu −8 dalam two's complement. Maka V = 1, N = 1, dan Z = 0.",
      },
      {
        kind: "text",
        text: "Instruksi berikutnya, seperti instruksi percabangan, membaca flag ini untuk mengambil keputusan.",
      },
    ],
  },
  {
    id: "integer-representation",
    title: "Representasi Integer",
    short: "Bilangan bulat dalam biner",
    blocks: [
      { kind: "heading", text: "Bilangan tak bertanda" },
      {
        kind: "text",
        text: "Bilangan bulat tak bertanda (unsigned) ditulis langsung dalam biner. Dengan n bit, nilainya berkisar dari 0 sampai 2^n − 1.",
      },
      { kind: "heading", text: "Bilangan bertanda" },
      { kind: "text", text: "Untuk bilangan bertanda, bit paling kiri dipakai sebagai tanda. Ada dua cara umum:" },
      {
        kind: "list",
        ordered: false,
        items: [
          "Sign-magnitude: menyimpan tanda dan besaran secara terpisah. Cara ini memiliki dua representasi nol (+0 dan −0), dan penjumlahannya memerlukan logika khusus.",
          "Two's complement: dibentuk dengan membalik semua bit lalu menambahkan 1.",
        ],
      },
      { kind: "heading", text: "Membentuk two's complement" },
      { kind: "text", text: "Contoh 8-bit untuk −5:" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Tulis +5 dalam biner: 0000 0101.",
          "Balik semua bit: 1111 1010.",
          "Tambahkan 1: 1111 1011, yaitu −5.",
        ],
      },
      { kind: "heading", text: "Rentang nilai" },
      { kind: "formula", text: "n-bit: −2^(n−1) sampai 2^(n−1) − 1" },
      { kind: "text", text: "Untuk 8 bit, rentangnya −128 sampai +127." },
      {
        kind: "text",
        text: "Two's complement banyak dipakai karena nol hanya memiliki satu representasi. Penjumlahan maupun pengurangan juga dapat dikerjakan oleh rangkaian penjumlah yang sama.",
      },
      { kind: "heading", text: "Sign extension" },
      {
        kind: "text",
        text: "Sign extension menyalin bit tanda ke posisi kiri saat bilangan dipindah ke wadah yang lebih lebar, sehingga nilainya tidak berubah. Contoh −5:",
      },
      { kind: "example", lines: ["8-bit   1111 1011", "16-bit  1111 1111 1111 1011"] },
    ],
  },
  {
    id: "integer-arithmetic",
    title: "Aritmetika Integer",
    short: "Operasi pada bilangan bulat",
    blocks: [
      { kind: "heading", text: "Penjumlahan biner" },
      {
        kind: "text",
        text: "Penjumlahan dilakukan bit demi bit dari kanan, dengan carry diteruskan ke posisi berikutnya. Pengurangan A − B dikerjakan sebagai A + (two's complement dari B).",
      },
      { kind: "heading", text: "Carry dan signed overflow" },
      {
        kind: "list",
        ordered: false,
        items: [
          "Carry adalah carry keluar dari bit paling kiri. Carry relevan untuk bilangan tak bertanda.",
          "Signed overflow terjadi ketika dua operan bertanda sama menghasilkan hasil dengan tanda berlawanan. Kondisi ini terdeteksi bila carry masuk ke bit tanda berbeda dengan carry keluar dari bit tanda.",
        ],
      },
      { kind: "heading", text: "Contoh overflow" },
      { kind: "text", text: "127 + 1 pada 8-bit two's complement:" },
      {
        kind: "example",
        lines: ["  0111 1111   (+127)", "+ 0000 0001   (+1)", "-------------", "  1000 0000   (-128)"],
      },
      {
        kind: "text",
        text: "Carry keluarnya 0, tetapi terjadi signed overflow karena dua operan positif menghasilkan bilangan negatif.",
      },
      { kind: "heading", text: "Perkalian" },
      {
        kind: "text",
        text: "Perkalian dilakukan dengan shift-and-add: setiap bit 1 pada pengali menambahkan multiplicand yang sudah digeser sesuai posisi bitnya.",
      },
      { kind: "text", text: "Algoritma Booth memeriksa dua bit pengali, Q0 dan Q−1:" },
      {
        kind: "list",
        ordered: false,
        items: [
          "Pola 10: kurangkan multiplicand.",
          "Pola 01: tambahkan multiplicand.",
          "Pola 00 dan 11: tidak melakukan apa-apa.",
        ],
      },
      { kind: "text", text: "Setelah itu, hasil digeser secara aritmetika ke kanan." },
      { kind: "heading", text: "Pembagian" },
      { kind: "text", text: "Pembagian dilakukan dengan shift dan pengurangan berulang:" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Geser sisa ke kiri.",
          "Kurangkan divisor dari sisa.",
          "Jika hasilnya tidak negatif, bit hasil bernilai 1 dan sisa diperbarui.",
          "Jika hasilnya negatif, bit hasil bernilai 0 dan sisa dikembalikan.",
        ],
      },
    ],
  },
  {
    id: "floating-point-representation",
    title: "Representasi Floating-Point",
    short: "Standar IEEE 754",
    blocks: [
      { kind: "heading", text: "Mengapa floating-point" },
      {
        kind: "text",
        text: "Bit yang terbatas tidak dapat menyatakan semua bilangan real, terutama bilangan yang sangat besar, sangat kecil, atau pecahan. Floating-point mengatasi hal ini dengan notasi ilmiah biner:",
      },
      { kind: "formula", text: "1.xxx × 2^E" },
      { kind: "text", text: "Contoh: 110.1₂ = 1.101₂ × 2²." },
      { kind: "heading", text: "Format IEEE 754" },
      { kind: "text", text: "Standar IEEE 754 menyimpan tiga bagian: bit tanda (S), eksponen, dan fraksi." },
      {
        kind: "list",
        ordered: false,
        items: [
          "Single precision: 32 bit (1 bit tanda, 8 bit eksponen, 23 bit fraksi, bias 127).",
          "Double precision: 64 bit (1 bit tanda, 11 bit eksponen, 52 bit fraksi, bias 1023).",
        ],
      },
      { kind: "heading", text: "Nilai bilangan ternormalisasi" },
      {
        kind: "text",
        text: "Eksponen disimpan sebagai eksponen sebenarnya ditambah bias. Bit depan selalu 1, sehingga tidak disimpan (hidden bit). Nilainya:",
      },
      { kind: "formula", text: "(−1)^S × 1.F × 2^(E − bias)" },
      { kind: "heading", text: "Contoh 6,5" },
      { kind: "text", text: "6,5 = 110.1₂ = 1.101₂ × 2², sehingga:" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Tanda: 0.",
          "Eksponen: 2 + 127 = 129 = 1000 0001.",
          "Fraksi: 101 diikuti nol.",
        ],
      },
      { kind: "example", lines: ["0 10000001 10100000000000000000000", "Heksadesimal: 40D00000"] },
      { kind: "heading", text: "Nilai khusus" },
      {
        kind: "list",
        ordered: false,
        items: [
          "Nol: eksponen dan fraksi semua 0.",
          "Denormal (subnormal): eksponen semua 0 dengan fraksi tidak nol, bit tersirat 0. Dipakai untuk nilai yang sangat dekat nol.",
          "Infinity: eksponen semua 1 dengan fraksi 0.",
          "NaN: eksponen semua 1 dengan fraksi tidak nol. Dipakai untuk hasil tak terdefinisi, seperti 0/0.",
        ],
      },
      { kind: "heading", text: "Keterbatasan presisi" },
      {
        kind: "text",
        text: "Banyak pecahan, misalnya 0,1, tidak dapat disimpan secara tepat sehingga terjadi pembulatan.",
      },
    ],
  },
  {
    id: "floating-point-arithmetic",
    title: "Aritmetika Floating-Point",
    short: "Operasi pada bilangan desimal",
    blocks: [
      { kind: "heading", text: "Penjumlahan dan pengurangan" },
      { kind: "text", text: "Dikerjakan dalam lima tahap:" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Cek nol: jika salah satu operan nol, hasilnya adalah operan lainnya.",
          "Samakan eksponen: significand bilangan dengan eksponen lebih kecil digeser ke kanan sebanyak selisih eksponen.",
          "Jumlahkan atau kurangkan significand.",
          "Normalisasi hasil: geser significand hingga bit 1 berada di depan, lalu sesuaikan eksponen.",
          "Bulatkan hasil, lalu periksa overflow (eksponen terlalu besar) atau underflow (eksponen terlalu kecil).",
        ],
      },
      { kind: "heading", text: "Perkalian" },
      { kind: "formula", text: "E = E1 + E2 − bias" },
      {
        kind: "text",
        text: "Significand dikalikan, tanda hasil adalah XOR dari kedua tanda, lalu hasil dinormalisasi dan dibulatkan.",
      },
      { kind: "heading", text: "Pembagian" },
      { kind: "formula", text: "E = E1 − E2 + bias" },
      {
        kind: "text",
        text: "Significand dibagi, lalu hasil dinormalisasi dan dibulatkan.",
      },
      { kind: "heading", text: "Pembulatan dan urutan operasi" },
      {
        kind: "text",
        text: "Hasil floating-point dapat berbeda dari hasil matematis yang eksak karena pembulatan dilakukan pada setiap tahap. Akibatnya, urutan operasi dapat mengubah hasil, dan dua perhitungan yang secara matematis sama bisa menghasilkan nilai yang sedikit berbeda.",
      },
      { kind: "heading", text: "Contoh: 1,5 + 2,25 = 3,75" },
      { kind: "text", text: "1,5 = 1,1₂ × 2⁰ dan 2,25 = 1,001₂ × 2¹." },
      {
        kind: "list",
        ordered: true,
        items: [
          "Cek nol: kedua operan tidak nol.",
          "Samakan eksponen ke 1: significand 1,1₂ digeser satu posisi ke kanan menjadi 0,11₂.",
          "Jumlahkan: 0,11₂ + 1,001₂ = 1,111₂.",
          "Normalisasi: 1,111₂ sudah ternormalisasi, sehingga eksponen tetap 1.",
          "Pembulatan tidak diperlukan karena tidak ada bit yang terbuang.",
        ],
      },
      { kind: "formula", text: "Hasil: 1,111₂ × 2¹ = 11,11₂ = 3,75₁₀" },
    ],
  },
];
