import { useState } from "react";
import {
  FaBullhorn,
  FaClock,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaFileAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useAuth } from "../context/auth.js";
import { readStorage } from "../utils/storage.js";

import "./Pengumuman.css";

function Pengumuman() {
  const [openAnnouncement, setOpenAnnouncement] = useState(null);
  const { user: authenticatedUser } = useAuth();
  const savedBiodata = readStorage(localStorage, "spmb_biodata_draft", {});
  const user = {
    nama: authenticatedUser?.nama || savedBiodata.namaLengkap || "Calon Mahasiswa Baru",
    nomorPendaftaran: authenticatedUser?.nomorPendaftaran || "-",
    programStudi1: authenticatedUser?.programStudi1 || savedBiodata.prodi1 || "Belum dipilih",
    programStudi2: authenticatedUser?.programStudi2 || savedBiodata.prodi2 || "Belum dipilih",
  };

  /*
    Status yang nantinya bisa digunakan:
    "menunggu"
    "lulus"
    "tidak-lulus"
  */
  const statusSeleksi = "menunggu";

  const pengumuman = [
    {
      id: 1,
      tanggal: "02 September 2026",
      judul: "Pendaftaran SPMB 2026 Dibuka",
      isi:
        "Pendaftaran Seleksi Penerimaan Mahasiswa Baru tahun 2026 telah dibuka. Calon mahasiswa diminta segera melengkapi biodata dan dokumen pendaftaran.",
      penting: true,
    },
    {
      id: 2,
      tanggal: "05 September 2026",
      judul: "Batas Pengisian Biodata",
      isi:
        "Pastikan seluruh data pribadi, pendidikan, orang tua, pilihan program studi, dan dokumen telah dilengkapi sebelum batas waktu yang ditentukan.",
      penting: false,
    },
    {
      id: 3,
      tanggal: "10 September 2026",
      judul: "Verifikasi Dokumen Pendaftaran",
      isi:
        "Panitia akan melakukan proses pemeriksaan dan verifikasi dokumen calon mahasiswa.",
      penting: false,
    },
  ];

  const jadwal = [
    {
      tahap: "Pendaftaran",
      tanggal: "02 - 15 September 2026",
      status: "Berlangsung",
    },
    {
      tahap: "Verifikasi Berkas",
      tanggal: "16 - 18 September 2026",
      status: "Belum Dimulai",
    },
    {
      tahap: "Proses Seleksi",
      tanggal: "20 September 2026",
      status: "Belum Dimulai",
    },
    {
      tahap: "Pengumuman Hasil",
      tanggal: "25 September 2026",
      status: "Belum Dimulai",
    },
  ];

  const renderStatusSeleksi = () => {
    if (statusSeleksi === "lulus") {
      return (
        <div className="selection-result result-pass">
          <div className="selection-result-icon">
            <FaCheckCircle />
          </div>

          <div className="selection-result-content">
            <span>HASIL SELEKSI</span>

            <h2>Selamat, Anda Dinyatakan Lulus!</h2>

            <p>
              Selamat kepada {user.nama}. Anda dinyatakan
              lulus Seleksi Penerimaan Mahasiswa Baru 2026.
              Silakan mengikuti informasi daftar ulang yang
              akan diberikan selanjutnya.
            </p>
          </div>
        </div>
      );
    }

    if (statusSeleksi === "tidak-lulus") {
      return (
        <div className="selection-result result-fail">
          <div className="selection-result-icon">
            <FaExclamationCircle />
          </div>

          <div className="selection-result-content">
            <span>HASIL SELEKSI</span>

            <h2>Belum Berhasil pada Seleksi Ini</h2>

            <p>
              Terima kasih telah mengikuti proses Seleksi
              Penerimaan Mahasiswa Baru 2026. Tetap semangat
              dan silakan mengikuti informasi penerimaan
              berikutnya.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="selection-result result-waiting">
        <div className="selection-result-icon">
          <FaClock />
        </div>

        <div className="selection-result-content">
          <span>STATUS SELEKSI</span>

          <h2>Menunggu Hasil Seleksi</h2>

          <p>
            Hasil seleksi belum diumumkan. Pastikan biodata
            dan dokumen pendaftaran sudah lengkap dan terus
            periksa halaman ini untuk mendapatkan informasi
            terbaru.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="announcement-page">
      {/* Header */}
      <div className="announcement-page-header">
        <div>
          <p>SPMB 2026</p>

          <h1>Pengumuman</h1>

          <span>
            Lihat informasi dan perkembangan terbaru proses
            penerimaan mahasiswa baru.
          </span>
        </div>

        <div className="announcement-header-icon">
          <FaBullhorn />
        </div>
      </div>

      {/* Identitas */}
      <div className="applicant-information">
        <div>
          <span>Nama Pendaftar</span>
          <strong>{user.nama}</strong>
        </div>

        <div>
          <span>Nomor Pendaftaran</span>
          <strong>{user.nomorPendaftaran}</strong>
        </div>

        <div>
          <span>Program Studi Pilihan 1</span>
          <strong>{user.programStudi1}</strong>
        </div>

        <div>
          <span>Program Studi Pilihan 2</span>
          <strong>{user.programStudi2}</strong>
        </div>
      </div>

      {/* Status Seleksi */}
      {renderStatusSeleksi()}

      {/* Main Content */}
      <div className="announcement-content-grid">
        {/* Pengumuman */}
        <section className="announcement-box">
          <div className="box-heading">
            <div className="box-heading-icon">
              <FaBullhorn />
            </div>

            <div>
              <h2>Pengumuman Terbaru</h2>
              <p>
                Informasi terbaru mengenai proses SPMB 2026.
              </p>
            </div>
          </div>

          <div className="announcement-items">
            {pengumuman.map((item) => (
              <button
                type="button"
                className={`announcement-news ${
                  item.penting ? "important" : ""
                } ${openAnnouncement === item.id ? "open" : ""}`}
                key={item.id}
                onClick={() => setOpenAnnouncement((current) => current === item.id ? null : item.id)}
                aria-expanded={openAnnouncement === item.id}
              >
                <div className="announcement-news-top">
                  <span className="news-date">
                    <FaCalendarAlt />
                    {item.tanggal}
                  </span>

                  {item.penting && (
                    <span className="important-label">
                      Penting
                    </span>
                  )}
                </div>

                <div className="announcement-title-row">
                  <h3>{item.judul}</h3>
                  <FaChevronDown />
                </div>

                {openAnnouncement === item.id && <p>{item.isi}</p>}
              </button>
            ))}
          </div>
        </section>

        {/* Jadwal */}
        <section className="announcement-box">
          <div className="box-heading">
            <div className="box-heading-icon">
              <FaCalendarAlt />
            </div>

            <div>
              <h2>Jadwal SPMB</h2>
              <p>
                Tahapan penting proses penerimaan mahasiswa.
              </p>
            </div>
          </div>

          <div className="schedule-list">
            {jadwal.map((item) => (
              <div className="schedule-item" key={item.tahap}>
                <div
                  className={`schedule-indicator ${
                    item.status === "Berlangsung"
                      ? "active"
                      : ""
                  }`}
                />

                <div className="schedule-content">
                  <strong>{item.tahap}</strong>

                  <span>{item.tanggal}</span>
                </div>

                <span
                  className={`schedule-status ${
                    item.status === "Berlangsung"
                      ? "active"
                      : ""
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div className="schedule-note">
            <FaFileAlt />

            <p>
              Jadwal dapat berubah sewaktu-waktu. Selalu
              periksa halaman pengumuman untuk mendapatkan
              informasi terbaru.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Pengumuman;
