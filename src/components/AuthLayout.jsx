import {
  FaGraduationCap,
  FaCheckCircle,
  FaShieldAlt,
  FaClipboardCheck,
} from "react-icons/fa";

import "./AuthLayout.css";

function AuthLayout({
  children,
  title = "SPMB 2026",
  subtitle = "Seleksi Penerimaan Mahasiswa Baru",
}) {
  return (
    <div className="auth-page">

      {/* DEKORASI */}
      <div className="auth-circle circle-one"></div>
      <div className="auth-circle circle-two"></div>

      <div className="auth-container">

        {/* =========================
            BAGIAN KIRI
        ========================= */}

        <section className="auth-information">

          <div className="auth-brand">
            <div className="auth-brand-icon">
              <FaGraduationCap />
            </div>

            <div>
              <h2>{title}</h2>
              <span>{subtitle}</span>
            </div>
          </div>

          <div className="auth-message">

            <span className="auth-small-title">
              PENERIMAAN MAHASISWA BARU
            </span>

            <h1>
              Mulai langkah
              <br />
              menuju masa depanmu.
            </h1>

            <p>
              Daftar dan pantau seluruh proses Seleksi
              Penerimaan Mahasiswa Baru 2026 melalui
              satu sistem yang mudah dan terintegrasi.
            </p>

          </div>

          <div className="auth-benefits">

            <div className="auth-benefit">
              <div className="benefit-icon">
                <FaCheckCircle />
              </div>

              <div>
                <strong>Pendaftaran Mudah</strong>
                <span>
                  Isi biodata dan dokumen secara online.
                </span>
              </div>
            </div>

            <div className="auth-benefit">
              <div className="benefit-icon">
                <FaClipboardCheck />
              </div>

              <div>
                <strong>Pantau Status</strong>
                <span>
                  Lihat perkembangan proses pendaftaran.
                </span>
              </div>
            </div>

            <div className="auth-benefit">
              <div className="benefit-icon">
                <FaShieldAlt />
              </div>

              <div>
                <strong>Data Terlindungi</strong>
                <span>
                  Informasi pendaftar dikelola dengan aman.
                </span>
              </div>
            </div>

          </div>

          <div className="auth-year">
            Tahun Akademik 2026 / 2027
          </div>

        </section>

        {/* =========================
            BAGIAN KANAN
        ========================= */}

        <section className="auth-form-section">
          {children}
        </section>

      </div>

    </div>
  );
}

export default AuthLayout;