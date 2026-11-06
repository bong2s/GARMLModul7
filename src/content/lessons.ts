// Learning content definitions for Modul 8 (Set Instruksi).
//
// Topics, in learning order:
//   1. Karakteristik Instruksi
//   2. Jenis Operand
//   3. Jenis Operasi
//   4. Bahasa Rakitan (Assembly)
//   5. Pengalamatan (Addressing)
//   6. Format Instruksi

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
    id: "instruction-characteristics",
    title: "Karakteristik Instruksi",
    short: "Sifat dasar instruksi mesin",
    blocks: [
      { kind: "heading", text: "Apa itu instruksi mesin" },
      {
        kind: "text",
        text: "Instruksi mesin (machine instruction) adalah perintah yang dapat dijalankan langsung oleh CPU. Setiap instruksi didefinisikan oleh format biner tertentu dan dikerjakan oleh unit kontrol bersama ALU.",
      },
      { kind: "heading", text: "Karakteristik utama" },
      {
        kind: "list",
        ordered: false,
        items: [
          "Operation code (opcode): kode operasi yang menentukan apa yang dikerjakan CPU.",
          "Operand: data atau alamat yang menjadi sasaran operasi.",
          "Mode pengalamatan: cara CPU menafsirkan field operand menjadi alamat data.",
          "Format dan panjang: jumlah bit serta susunan field dalam instruksi.",
        ],
      },
      { kind: "heading", text: "Siklus eksekusi" },
      { kind: "text", text: "Setiap instruksi melewati tahapan berikut:" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Fetch: instruksi diambil dari memori ke register instruksi.",
          "Decode: unit kontrol menerjemahkan opcode dan mode pengalamatan.",
          "Operand fetch: operand diambil dari register atau memori.",
          "Execute: ALU atau unit lain menjalankan operasi.",
          "Write-back: hasil ditulis kembali ke register atau memori.",
        ],
      },
    ],
  },
  {
    id: "operand-types",
    title: "Jenis Operand",
    short: "Data yang diproses instruksi",
    blocks: [
      { kind: "heading", text: "Pengertian operand" },
      {
        kind: "text",
        text: "Operand adalah data yang diproses oleh instruksi. CPU umumnya berinteraksi dengan operand melalui register dan memori. Jenis operand menentukan lebar data dan bentuk nilai yang dapat ditangani.",
      },
      { kind: "heading", text: "Jenis operand umum" },
      {
        kind: "list",
        ordered: false,
        items: [
          "Alamat memori: menunjuk lokasi data di RAM.",
          "Nilai data (immediate): konstanta yang langsung tertulis di dalam instruksi.",
          "Register: operand berada di register CPU.",
          "I/O port: operand berupa port masukan/keluaran untuk perangkat luar.",
        ],
      },
      { kind: "heading", text: "Lebar data" },
      {
        kind: "text",
        text: "Lebar operand mengikuti ukuran register dan bus data arsitektur. Contoh pada CPU modern:",
      },
      {
        kind: "list",
        ordered: false,
        items: [
          "8 bit: 1 byte.",
          "16 bit: 1 word.",
          "32 bit: 1 double word.",
          "64 bit: 1 quad word.",
        ],
      },
    ],
  },
  {
    id: "operation-types",
    title: "Jenis Operasi",
    short: "Kategori instruksi CPU",
    blocks: [
      { kind: "heading", text: "Kelompok operasi" },
      {
        kind: "text",
        text: "Instruction set sebuah CPU dikelompokkan berdasarkan jenis operasi yang dilakukan. Pengelompokan ini membantu menyusun rutin program dan memahami kemampuan prosesor.",
      },
      { kind: "heading", text: "Operasi data transfer" },
      {
        kind: "text",
        text: "Memindahkan data antar register dan memori tanpa mengubah nilainya.",
      },
      { kind: "example", lines: ["MOV  R0, R1     ; salin R1 ke R0", "LOAD R2, [0x1000] ; ambil dari memori", "STORE [0x1004], R2 ; simpan ke memori"] },
      { kind: "heading", text: "Operasi aritmetika dan logika" },
      {
        kind: "list",
        ordered: false,
        items: [
          "Aritmetika: ADD, SUB, MUL, DIV.",
          "Logika: AND, OR, NOT, XOR.",
          "Shift/rotate: SHL, SHR, ROL, ROR.",
        ],
      },
      { kind: "heading", text: "Operasi kontrol aliran" },
      {
        kind: "text",
        text: "Mengubah urutan eksekusi instruksi melalui percabangan dan lompatan.",
      },
      { kind: "example", lines: ["JMP  label     ; lompat tanpa syarat", "BEQ  R0, R1, label ; lompat jika R0 = R1", "CALL func      ; panggil subrutin", "RET            ; kembali dari subrutin"] },
      { kind: "heading", text: "Operasi I/O dan sistem" },
      {
        kind: "list",
        ordered: false,
        items: [
          "I/O: IN, OUT untuk berkomunikasi dengan perangkat luar.",
          "Sistem: SYSCALL, INT untuk masuk ke layanan sistem operasi.",
          "Kontrol CPU: HALT, NOP, EI/DI (enable/disable interrupt).",
        ],
      },
    ],
  },
  {
    id: "assembly-language",
    title: "Bahasa Rakitan (Assembly)",
    short: "Representasi teks instruksi",
    blocks: [
      { kind: "heading", text: "Apa itu bahasa rakit" },
      {
        kind: "text",
        text: "Bahasa rakit (assembly) adalah representasi teks dari instruksi mesin. Setiap baris biasanya mewakili satu instruksi mesin, ditulis dengan mnemonic yang lebih mudah dibaca daripada opcode biner.",
      },
      { kind: "heading", text: "Struktur baris assembly" },
      { kind: "formula", text: "[label:] mnemonic [operand1[, operand2]] [; komentar]" },
      { kind: "example", lines: ["loop:  MOV  R0, #5      ; R0 = 5", "       ADD  R0, R0, #1   ; R0 = R0 + 1", "       CMP  R0, #10      ; bandingkan dengan 10", "       BLT  loop         ; ulangi jika R0 < 10"] },
      { kind: "heading", text: "Mnemonic vs opcode" },
      {
        kind: "text",
        text: "Mnemonic adalah nama singkat operasi (mis. ADD, MOV). Opcode adalah nilai biner yang sesuai. Assembler menerjemahkan mnemonic dan operand menjadi kode mesin.",
      },
      { kind: "example", lines: ["ADD R0, R1, R2  ; sumber assembly", "0xE0810002      ; hasil kode mesin (ARM)"] },
      { kind: "heading", text: "Direktif assembler" },
      {
        kind: "list",
        ordered: false,
        items: [
          "Data directive: mendefinisikan konstanta atau data, mis. DB, DW, DD.",
          "Section: memisahkan kode dan data, mis. .text, .data, .bss.",
          "Symbol/label: nama alamat untuk lompatan dan referensi data.",
        ],
      },
    ],
  },
  {
    id: "addressing",
    title: "Pengalamatan (Addressing)",
    short: "Cara menafsirkan operand",
    blocks: [
      { kind: "heading", text: "Mode pengalamatan" },
      {
        kind: "text",
        text: "Mode pengalamatan (addressing mode) adalah cara CPU menafsirkan field operand menjadi alamat data yang sesungguhnya. Pilihan mode memengaruhi panjang instruksi dan kecepatan eksekusi.",
      },
      { kind: "heading", text: "Mode umum" },
      {
        kind: "list",
        ordered: false,
        items: [
          "Immediate: operand adalah nilai konstanta di dalam instruksi.",
          "Register: operand berada di register yang disebut namanya.",
          "Direct (absolute): field berisi alamat memori lengkap.",
          "Register indirect: register menampung alamat memori.",
          "Displacement (based): alamat = nilai register + offset konstanta.",
          "Indexed: alamat = base register + index register (× skala).",
          "PC-relative: alamat = alamat instruksi sekarang + offset.",
        ],
      },
      { kind: "heading", text: "Contoh tiap mode" },
      { kind: "example", lines: ["MOV R0, #10         ; immediate", "MOV R0, R1          ; register", "MOV R0, [0x1000]    ; direct", "MOV R0, [R1]        ; register indirect", "MOV R0, [R1 + #4]   ; displacement", "MOV R0, [R1 + R2*4] ; indexed", "BEQ  +8             ; PC-relative"] },
      { kind: "heading", text: "Kapan dipakai" },
      {
        kind: "list",
        ordered: false,
        items: [
          "Immediate: konstanta kecil yang sudah diketahui saat kompilasi.",
          "Register dan register indirect: operasi pada data di register dan penelusuran pointer.",
          "Displacement/indexed: akses elemen struktur data dan larik.",
          "PC-relative: kode tidak tergantung lokasi muat (position-independent code).",
        ],
      },
    ],
  },
  {
    id: "instruction-format",
    title: "Format Instruksi",
    short: "Susunan bit instruksi",
    blocks: [
      { kind: "heading", text: "Apa itu format instruksi" },
      {
        kind: "text",
        text: "Format instruksi menentukan bagaimana bit-bit sebuah instruksi dibagi menjadi field, seperti opcode, operand, dan mode pengalamatan. Format yang efisien menghemat ruang memori sekaligus tetap memungkinkan dekode cepat.",
      },
      { kind: "heading", text: "Field umum" },
      {
        kind: "list",
        ordered: false,
        items: [
          "Opcode: kode operasi.",
          "Operand / register field: menentukan register sumber dan tujuan.",
          "Mode field: menentukan mode pengalamatan.",
          "Immediate/displacement: konstanta atau offset.",
        ],
      },
      { kind: "heading", text: "Format dasar" },
      {
        kind: "list",
        ordered: false,
        items: [
          "Format satu operand: opcode + satu operand.",
          "Format dua operand: opcode + dua operand.",
          "Format tiga operand: opcode + tiga register (umum pada RISC).",
          "Format variabel: panjang instruksi berbeda-beda (umum pada CISC).",
        ],
      },
      { kind: "heading", text: "Contoh format 16-bit (3 register)" },
      { kind: "text", text: "Opcode 4 bit, masing-masing register 4 bit, mode 4 bit:" },
      { kind: "example", lines: ["| 15:12 opcode | 11:8 Rd | 7:4 Rs1 | 3:0 Rs2 |", "  ADD  R0,   R1,    R2", "  0010 0000  0001   0010"] },
      { kind: "heading", text: "Pertimbangan desain" },
      {
        kind: "list",
        ordered: false,
        items: [
          "Panjang tetap: dekode cepat dan pipelining sederhana (RISC).",
          "Panjang variabel: hemat ruang untuk instruksi umum (CISC).",
          "Jumlah register: field register yang lebih lebar mendukung lebih banyak register tetapi memperpanjang instruksi.",
        ],
      },
    ],
  },
];
