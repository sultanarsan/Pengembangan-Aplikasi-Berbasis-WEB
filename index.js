const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// 👉 melayani file HTML
app.use(express.static(path.join(__dirname, "public")));

let dataMahasiswa = [
  { id: 1, nama: "Arsan" },
  { id: 2, nama: "Abdul" }
];

let idCounter = 3;

// GET semua data
app.get("/mahasiswa", (req, res) => {
  res.json(dataMahasiswa);
});

// TAMBAH
app.post("/mahasiswa", (req, res) => {
  const mahasiswaBaru = {
    id: idCounter++,
    nama: req.body.nama
  };

  dataMahasiswa.push(mahasiswaBaru);
  res.json(mahasiswaBaru);
});

// EDIT (pakai ID)
app.put("/mahasiswa/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const mahasiswa = dataMahasiswa.find(m => m.id === id);

  if (!mahasiswa) {
    return res.status(404).json({ message: "Data tidak ditemukan" });
  }

  mahasiswa.nama = req.body.nama;
  res.json(mahasiswa);
});

// HAPUS (pakai ID)
app.delete("/mahasiswa/:id", (req, res) => {
  dataMahasiswa = dataMahasiswa.filter(
    m => m.id !== parseInt(req.params.id)
  );

  res.json({ message: "Data berhasil dihapus" });
});

// QUERY PARAM
app.get("/tentang", (req, res) => {
  res.json({
    nama: req.query.nama,
    kelas: req.query.kelas
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
