// Learning content definitions for Modul 7.
//
// Topics:
//   - ALU
//   - Representasi Integer
//   - Aritmetika Integer
//   - Representasi Floating-Point
//   - Aritmetika Floating-Point

export interface LessonTopic {
  id: string;
  title: string;
  short: string;
  description: string;
}

export const MODULE_TOPICS: LessonTopic[] = [
  {
    id: "alu",
    title: "ALU",
    short: "Arithmetic Logic Unit",
    description:
      "Arithmetic Logic Unit (ALU) adalah komponen prosesor yang melakukan operasi aritmetika dan logika dasar. Pelajari bagaimana ALU memproses penjumlahan, pengurangan, dan operasi logika seperti AND, OR, serta NOT pada level perangkat keras.",
  },
  {
    id: "integer-representation",
    title: "Representasi Integer",
    short: "Bilangan bulat dalam biner",
    description:
      "Pelajari bagaimana bilangan bulat disimpan dalam komputer menggunakan sistem biner, meliputi representasi sign-magnitude, one's complement, dan two's complement yang menjadi standar modern.",
  },
  {
    id: "integer-arithmetic",
    title: "Aritmetika Integer",
    short: "Operasi pada bilangan bulat",
    description:
      "Memahami operasi aritmetika pada bilangan bulat biner: penjumlahan, pengurangan, perkalian, dan pembagian, termasuk penanganan overflow dan carry yang terjadi selama komputasi.",
  },
  {
    id: "floating-point-representation",
    title: "Representasi Floating-Point",
    short: "Standar IEEE 754",
    description:
      "Pelajari bagaimana bilangan desimal disimpan menggunakan standar IEEE 754: format single dan double precision, komponen sign, exponent, dan mantissa, serta rentang nilai yang dapat direpresentasikan.",
  },
  {
    id: "floating-point-arithmetic",
    title: "Aritmetika Floating-Point",
    short: "Operasi pada bilangan desimal",
    description:
      "Memahami operasi aritmetika pada bilangan floating-point, mencakup normalisasi, pembulatan, penanganan kasus khusus seperti infinity dan NaN, serta sumber utama kesalahan numerik dalam komputasi.",
  },
];
