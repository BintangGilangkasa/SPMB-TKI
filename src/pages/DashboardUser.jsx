import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth.js";
import { readStorage } from "../utils/storage.js";

import {
  FaUser,
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaBullhorn,
  FaArrowRight,
} from "react-icons/fa";

import "./DashboardUser.css";

function DashboardUser() {
  const location = useLocation();
  const { user } = useAuth();
  const biodataComplete = localStorage.getItem("spmb_biodata_complete") === "true";
  const savedDocuments = readStorage(localStorage, "spmb_document_names", {});
  const documentsComplete = Boolean(
    savedDocuments.foto && savedDocuments.kartuKeluarga && savedDocuments.ijazah
  );
  const progress = biodataComplete ? 100 : documentsComplete ? 60 : 20;

  return (
    <div className="dashboard-user">

      {location.state?.message && (
        <div className="dashboard-notice" role="status">
          <FaCheckCircle /> {location.state.message}
        </div>
      )}

      {/* Welcome */}
      <section className="dashboard-welcome">

        <div>
          <p className="welcome-small">
            Selamat datang,
          </p>

          <h1>
            {user?.nama || "Calon Mahasiswa Baru"}
          </h1>

          <p className="welcome-description">
            Lengkapi seluruh tahapan pendaftaran
            untuk mengikuti Seleksi Penerimaan
            Mahasiswa Baru 2026.
          </p>
        </div>

        <div className="registration-number">
          <span>Nomor Pendaftaran</span>

          <strong>
            {user?.nomorPendaftaran || "-"}
          </strong>
        </div>

      </section>


      {/* STATUS */}
      <section className="status-grid">

        <div className="status-card">

          <div className="status-icon blue">
            <FaUser />
          </div>

          <div>
            <span>Biodata</span>

            <h3>{biodataComplete ? "Lengkap" : "Belum Lengkap"}</h3>

            <p>
              {biodataComplete ? "Data pribadi telah disimpan." : "Lengkapi data pribadi kamu."}
            </p>
          </div>

        </div>


        <div className="status-card">

          <div className="status-icon orange">
            <FaFileAlt />
          </div>

          <div>
            <span>Dokumen</span>

            <h3>{documentsComplete ? "Lengkap" : "Belum Lengkap"}</h3>

            <p>
              {documentsComplete ? "Dokumen wajib telah dipilih." : "Dokumen belum diunggah."}
            </p>
          </div>

        </div>


        <div className="status-card">

          <div className="status-icon green">
            <FaClock />
          </div>

          <div>
            <span>Status Seleksi</span>

            <h3>Menunggu</h3>

            <p>
              Belum memasuki tahap seleksi.
            </p>
          </div>

        </div>

      </section>


      {/* CONTENT GRID */}
      <section className="dashboard-bottom-grid">

        {/* PROGRESS */}
        <div className="dashboard-box">

          <div className="box-title">
            <div>
              <h2>Progress Pendaftaran</h2>
              <p>
                Selesaikan seluruh tahapan berikut.
              </p>
            </div>
          </div>


          <div className="registration-progress">

            <div className="progress-line">
              <div
                className="progress-value"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="progress-percentage">
              <span>Progress</span>
              <strong>{progress}%</strong>
            </div>

          </div>


          <div className="registration-steps">

            <div className="step completed">

              <FaCheckCircle />

              <div>
                <strong>Akun berhasil dibuat</strong>
                <span>Selesai</span>
              </div>

            </div>


            <div className={`step ${biodataComplete ? "completed" : ""}`}>

              {biodataComplete ? <FaCheckCircle /> : <FaClock />}

              <div>
                <strong>Lengkapi Biodata</strong>
                <span>{biodataComplete ? "Selesai" : "Belum selesai"}</span>
              </div>

            </div>


            <div className={`step ${documentsComplete ? "completed" : ""}`}>

              {documentsComplete ? <FaCheckCircle /> : <FaClock />}

              <div>
                <strong>Upload Dokumen</strong>
                <span>{documentsComplete ? "Selesai" : "Belum selesai"}</span>
              </div>

            </div>


            <div className="step">

              <FaClock />

              <div>
                <strong>Verifikasi Data</strong>
                <span>Menunggu</span>
              </div>

            </div>


            <div className="step">

              <FaClock />

              <div>
                <strong>Hasil Seleksi</strong>
                <span>Menunggu</span>
              </div>

            </div>

          </div>


          <Link
            to="/dashboard/pengisian-biodata"
            className="complete-data-button"
          >
            {biodataComplete ? "Lihat Biodata" : "Lengkapi Biodata"}
            <FaArrowRight />
          </Link>

        </div>


        {/* ANNOUNCEMENT */}
        <div className="dashboard-box">

          <div className="announcement-header">

            <div>
              <h2>Pengumuman</h2>
              <p>Informasi terbaru SPMB.</p>
            </div>

            <FaBullhorn />
          </div>


          <div className="announcement-list">

            <Link
              to="/dashboard/pengumuman"
              className="announcement-item"
              aria-label="Baca pengumuman Pendaftaran SPMB 2026 Dibuka"
            >

              <span className="announcement-date">
                02 September 2026
              </span>

              <h3>
                Pendaftaran SPMB 2026 Dibuka
              </h3>

              <p>
                Pendaftaran calon mahasiswa baru
                telah dibuka. Silakan lengkapi
                data pendaftaran.
              </p>

            </Link>


            <Link
              to="/dashboard/pengumuman"
              className="announcement-item"
              aria-label="Baca pengumuman Persiapkan Dokumen Pendaftaran"
            >

              <span className="announcement-date">
                01 September 2026
              </span>

              <h3>
                Persiapkan Dokumen Pendaftaran
              </h3>

              <p>
                Pastikan seluruh dokumen yang
                diperlukan sudah dipersiapkan.
              </p>

            </Link>

          </div>


          <Link to="/dashboard/pengumuman" className="announcement-link">
          Lihat semua pengumuman <FaArrowRight />
          </Link>

        </div>

      </section>

    </div>
  );
}

export default DashboardUser;
