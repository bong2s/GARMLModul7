// Learning content definitions for Modul 7 (Aritmetika Komputer).
//
// Topics, in learning order:
//   1. ALU
//   2. Representasi Integer
//   3. Aritmetika Integer
//   4. Representasi Floating-Point
//   5. Aritmetika Floating-Point

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
      "ALU (Arithmetic Logic Unit) adalah bagian CPU yang melakukan operasi aritmetika dan logika. ALU mengambil dua operan dari register, sinyal kontrol dari unit kontrol menentukan operasi yang dijalankan, dan hasilnya dikirim kembali ke register. Operasi aritmetika meliputi penjumlahan, pengurangan, perkalian, dan pembagian. Operasi logika meliputi AND, OR, NOT, XOR, serta shift (geser) bit. Setiap operasi juga menghasilkan status flag. Flag Z (Zero) bernilai 1 jika hasil nol. Flag N (Negative) bernilai 1 jika bit paling kiri hasil bernilai 1. Flag C (Carry) bernilai 1 jika ada carry keluar dari bit paling kiri, yang relevan untuk bilangan tak bertanda. Flag V (Overflow) bernilai 1 jika hasil bertanda berada di luar rentang, yang relevan untuk bilangan bertanda; C dan V adalah dua hal yang berbeda. Contoh 4-bit: 0101 (+5) + 0011 (+3) menghasilkan 1000. Tidak ada carry keluar (C = 0), tetapi dua operan positif menghasilkan 1000, yaitu −8 dalam two's complement, sehingga V = 1, N = 1, dan Z = 0. Instruksi berikutnya, seperti instruksi percabangan, membaca flag ini untuk mengambil keputusan.",
  },
  {
    id: "integer-representation",
    title: "Representasi Integer",
    short: "Bilangan bulat dalam biner",
    description:
      "Bilangan bulat tak bertanda (unsigned) ditulis langsung dalam biner, sehingga n bit mewakili nilai 0 sampai 2^n − 1. Untuk bilangan bertanda, bit paling kiri dipakai sebagai tanda. Sign-magnitude menyimpan tanda dan besaran secara terpisah, tetapi memiliki dua representasi nol (+0 dan −0) dan penjumlahan memerlukan logika khusus. Two's complement dibentuk dengan membalik semua bit lalu menambahkan 1. Contoh 8-bit: +5 = 0000 0101, dan −5 = 1111 1011 (0000 0101 dibalik menjadi 1111 1010, lalu ditambah 1). Rentang n-bit two's complement adalah −2^(n−1) sampai 2^(n−1) − 1; untuk 8 bit berarti −128 sampai +127. Two's complement banyak dipakai karena nol hanya memiliki satu representasi dan penjumlahan maupun pengurangan dapat dikerjakan oleh rangkaian penjumlah yang sama. Sign extension menyalin bit tanda ke posisi kiri saat bilangan dipindah ke wadah yang lebih lebar, sehingga nilainya tidak berubah: −5 (8-bit 1111 1011) menjadi 1111 1111 1111 1011 (16-bit).",
  },
  {
    id: "integer-arithmetic",
    title: "Aritmetika Integer",
    short: "Operasi pada bilangan bulat",
    description:
      "Penjumlahan biner dilakukan bit demi bit dari kanan, dengan carry diteruskan ke posisi berikutnya. Pengurangan A − B dikerjakan sebagai A + (two's complement dari B). Carry adalah carry keluar dari bit paling kiri dan relevan untuk bilangan tak bertanda. Signed overflow adalah kondisi berbeda: terjadi ketika dua operan bertanda sama menghasilkan hasil dengan tanda berlawanan, dan terdeteksi bila carry masuk ke bit tanda berbeda dengan carry keluar dari bit tanda. Contoh: 127 + 1 pada 8-bit two's complement menghasilkan 1000 0000 (−128). Carry keluarnya 0, tetapi terjadi signed overflow karena dua operan positif menghasilkan bilangan negatif. Perkalian dilakukan dengan shift-and-add: setiap bit 1 pada pengali menambahkan multiplicand yang sudah digeser sesuai posisi bitnya. Algoritma Booth memeriksa dua bit pengali (Q0 dan Q−1): pola 10 berarti kurangkan multiplicand, pola 01 berarti tambahkan, pola 00 dan 11 tidak melakukan apa-apa, lalu hasil digeser aritmetika ke kanan. Pembagian dilakukan dengan shift dan pengurangan berulang: sisa digeser ke kiri lalu divisor dikurangkan. Jika hasilnya tidak negatif, bit hasil bernilai 1 dan sisa diperbarui; jika negatif, bit hasil bernilai 0 dan sisa dikembalikan.",
  },
  {
    id: "floating-point-representation",
    title: "Representasi Floating-Point",
    short: "Standar IEEE 754",
    description:
      "Bit yang terbatas tidak dapat menyatakan semua bilangan real, terutama bilangan yang sangat besar, sangat kecil, atau pecahan. Floating-point mengatasi hal ini dengan notasi ilmiah biner, yaitu 1.xxx × 2^E. Contohnya 110.1₂ = 1.101₂ × 2². Standar IEEE 754 menyimpan tiga bagian: bit tanda (S), eksponen, dan fraksi. Single precision memakai 32 bit (1 bit tanda, 8 bit eksponen, 23 bit fraksi, bias 127). Double precision memakai 64 bit (1 bit tanda, 11 bit eksponen, 52 bit fraksi, bias 1023). Eksponen disimpan sebagai eksponen sebenarnya + bias. Pada bilangan ternormalisasi, bit depan selalu 1 sehingga tidak disimpan (hidden bit), dan nilainya adalah (−1)^S × 1.F × 2^(E − bias). Contoh 6,5 = 110.1₂ = 1.101₂ × 2²: tanda 0, eksponen 2 + 127 = 129 = 1000 0001, fraksi 101 diikuti nol, sehingga pola 32-bit-nya 0 10000001 10100000000000000000000 (heksadesimal 40D00000). Nilai khusus: nol (eksponen dan fraksi semua 0), denormal atau subnormal (eksponen semua 0 dengan fraksi tidak nol, bit tersirat 0, untuk nilai yang sangat dekat nol), infinity (eksponen semua 1 dengan fraksi 0), dan NaN (eksponen semua 1 dengan fraksi tidak nol, untuk hasil tak terdefinisi seperti 0/0). Keterbatasan presisi berarti banyak pecahan, misalnya 0,1, tidak dapat disimpan secara tepat sehingga terjadi pembulatan.",
  },
  {
    id: "floating-point-arithmetic",
    title: "Aritmetika Floating-Point",
    short: "Operasi pada bilangan desimal",
    description:
      "Penjumlahan dan pengurangan floating-point dilakukan dalam lima tahap. (1) Cek nol: jika salah satu operan nol, hasilnya adalah operan lainnya. (2) Samakan eksponen: significand bilangan dengan eksponen lebih kecil digeser ke kanan sebanyak selisih eksponen. (3) Jumlahkan atau kurangkan significand. (4) Normalisasi hasil: geser significand hingga bit 1 berada di depan dan sesuaikan eksponen. (5) Bulatkan hasil, lalu periksa overflow (eksponen terlalu besar) atau underflow (eksponen terlalu kecil). Perkalian: eksponen dijumlahkan lalu dikurangi satu bias (E = E1 + E2 − bias), significand dikalikan, tanda hasil adalah XOR dari kedua tanda, kemudian hasil dinormalisasi dan dibulatkan. Pembagian: eksponen dikurangkan lalu bias ditambahkan (E = E1 − E2 + bias), significand dibagi, kemudian hasil dinormalisasi dan dibulatkan. Hasil floating-point dapat berbeda dari hasil matematis yang eksak karena pembulatan dilakukan pada setiap tahap. Akibatnya, urutan operasi dapat mengubah hasil, dan dua perhitungan yang secara matematis sama bisa menghasilkan nilai yang sedikit berbeda. Contoh 1,5 + 2,25 = 3,75: 1,5 = 1,1₂ × 2⁰ dan 2,25 = 1,001₂ × 2¹. (1) Cek nol: kedua operan tidak nol. (2) Samakan eksponen ke 1: significand 1,1₂ digeser satu posisi ke kanan menjadi 0,11₂. (3) Jumlahkan: 0,11₂ + 1,001₂ = 1,111₂. (4) Normalisasi: 1,111₂ sudah ternormalisasi, eksponen tetap 1. (5) Pembulatan tidak diperlukan karena tidak ada bit yang terbuang. Hasil: 1,111₂ × 2¹ = 11,11₂ = 3,75₁₀.",
  },
];
