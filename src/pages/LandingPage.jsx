import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import {
  FaCalendarAlt,
  FaClipboardCheck,
  FaFacebookF,
  FaGraduationCap,
  FaInstagram,
  FaTimes,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import "./LandingPage.css";

import kampus1 from "../assets/images/kampus-1.jpg";
import kampus2 from "../assets/images/kampus-2.jpg";
import jadwalIcon from "../assets/images/jadwal-pendaftaran.jpg";
import programStudiIcon from "../assets/images/ft-ugm.webp";
import pendafataranIcon from "../assets/images/info-pendaftaran.jpg";
import arrowIcon from "../assets/logos/arrow-icon.png";

const informasi = [
  {
    id: "jadwal",
    title: "Jadwal Pendaftaran",
    description:
      "Lihat jadwal lengkap pendaftaran Seleksi Penerimaan Mahasiswa Baru 2026.",
    image: jadwalIcon,
    imageAlt: "Gedung kampus UIN Salatiga",
    icon: <FaCalendarAlt />,
    details: [
      ["Pendaftaran Online", "2-15 September 2026"],
      ["Verifikasi Berkas", "16-18 September 2026"],
      ["Proses Seleksi", "20 September 2026"],
      ["Pengumuman Hasil", "25 September 2026"],
    ],
  },
  {
    id: "program-studi",
    title: "Program Studi",
    description:
      "Temukan program studi yang sesuai dengan minat dan cita-cita kamu.",
    image: programStudiIcon,
    imageAlt: "Lingkungan perkuliahan UGM",
    icon: <FaGraduationCap />,
    details: [
      ["Teknologi", "Sains Data, Teknik Informatika, dan Sistem Informasi"],
      ["Bisnis", "Manajemen dan Akuntansi"],
      ["Pilihan Pendaftar", "Setiap pendaftar dapat memilih dua program studi."],
    ],
  },
  {
    id: "seleksi",
    title: "Informasi Seleksi",
    description:
      "Pelajari tahapan seleksi dan persyaratan penerimaan mahasiswa baru.",
    image: pendafataranIcon,
    imageAlt: "Area pelayanan mahasiswa UGM",
    icon: <FaClipboardCheck />,
    details: [
      ["1. Buat Akun", "Daftarkan email aktif dan nomor WhatsApp."],
      ["2. Lengkapi Biodata", "Isi data pribadi, alamat, pendidikan, dan pilihan program studi."],
      ["3. Unggah Dokumen", "Siapkan pas foto, Kartu Keluarga, serta Ijazah atau SKL."],
      ["4. Pantau Hasil", "Periksa status verifikasi dan pengumuman melalui dashboard."],
    ],
  },
];

function LandingPage() {
  const [selectedInfo, setSelectedInfo] = useState(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setSelectedInfo(null);
    };

    document.body.style.overflow = selectedInfo ? "hidden" : "";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedInfo]);

  return (
    <div className="landing-page">
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <a className="logo" href="#beranda" aria-label="SPMB - kembali ke beranda">
              <img
                src="/apidog-icon.svg"
                alt="Logo Kampus"
                className="kampus-logo"
              />
              <span>SPMB</span>
            </a>
          </div>

          <nav className="nav-menu">
            <a href="#beranda">Beranda</a>
            <a href="#informasi">Berita</a>
            <a href="#kontak">Kontak</a>

            <Link to="/login" className="login-button">
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="hero" id="beranda">
          <div className="hero-container">
            <div className="hero-content">
              <p className="hero-label">SPMB 2026</p>

              <h1>
                SELEKSI PENERIMAAN
                <br />
                MAHASISWA BARU
                <br />
                2026
              </h1>

              <p className="hero-description">
                Wujudkan langkah awal menuju masa depanmu bersama kami.
                Pendaftaran mahasiswa baru tahun akademik 2026 telah dibuka.
              </p>

              <Link to="/register" className="register-button">
                DAFTAR SEKARANG

                <span className="arrow-icon">
                  <span>
                    <img src={arrowIcon} alt="Arrow Icon" />
                  </span>
                </span>
              </Link>
            </div>

            <div className="hero-images">
              <div className="image image-back">
                <img src={kampus1} alt="Gedung Kampus" />
              </div>

              <div className="image image-front">
                <img src={kampus2} alt="Lingkungan Kampus" />
              </div>
            </div>
          </div>
        </section>

        {/* Informasi */}
        <section className="information-section" id="informasi">
          <div className="information-container">
            {informasi.map((item) => (
              <article className="info-card" key={item.id}>
                <button
                  type="button"
                  className="info-card-button"
                  onClick={() => setSelectedInfo(item)}
                  aria-label={`Buka detail ${item.title}`}
                >
                <div className="card-image">
                  <img src={item.image} alt={item.imageAlt} loading="lazy" />
                  <span className="card-icon">{item.icon}</span>
                </div>

                <div className="card-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                  <span className="card-link">
                    Selengkapnya
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* About / Information */}
        <section className="contact-section" id="kontak">
          <div className="contact-container">
            <div className="contact-visual">
              <div className="contact-map">
                <iframe
                  title="Lokasi Kampus"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.178810843071!2d110.37529437483127!3d-7.770855077083978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59b2d4729729%3A0xac4d7b5fcf34f8e4!2sUniversitas%20Gadjah%20Mada!5e0!3m2!1sen!2sid!4v1788421026208!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <div className="contact-info">
              <h2>KONTAK & LOKASI</h2>
              <p className="contact-intro">
                Hubungi kami untuk informasi pendaftaran dan layanan kampus.
              </p>

              <div className="contact-list">
                <div className="contact-item">
                  <span className="contact-item-icon"><FiMapPin /></span>
                  <div>
                    <strong>Alamat</strong>
                    <p>
                      Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281
                    </p>
                  </div>
                </div>

                <div className="contact-item">
                  <span className="contact-item-icon"><FiMail /></span>
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:info@ugm.ac.id">info@ugm.ac.id</a>
                  </div>
                </div>

                <div className="contact-item">
                  <span className="contact-item-icon"><FiPhone /></span>
                  <div>
                    <strong>Telepon / WhatsApp</strong>
                    <a href="tel:+628112869988">08112869988</a>
                  </div>
                </div>
              </div>

              <div className="social-area">
                <div>
                  <strong>Ikuti media sosial kami</strong>
                  <p>Dapatkan kabar dan informasi terbaru.</p>
                </div>

                <div className="social-links">
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                    <FaTwitter />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                    <FaYoutube />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                    <FaFacebookF />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {selectedInfo && (
        <div
          className="info-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedInfo(null);
          }}
        >
          <section className="info-modal" role="dialog" aria-modal="true" aria-labelledby="info-modal-title">
            <button className="info-modal-close" type="button" onClick={() => setSelectedInfo(null)} aria-label="Tutup detail informasi">
              <FaTimes />
            </button>
            <div className="info-modal-heading">
              <span>{selectedInfo.icon}</span>
              <div>
                <small>INFORMASI SPMB 2026</small>
                <h2 id="info-modal-title">{selectedInfo.title}</h2>
              </div>
            </div>
            <p className="info-modal-intro">{selectedInfo.description}</p>
            <div className="info-modal-details">
              {selectedInfo.details.map(([title, detail]) => (
                <div className="info-detail-row" key={title}>
                  <strong>{title}</strong>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
            <Link to="/register" className="info-modal-action" onClick={() => setSelectedInfo(null)}>
              Mulai Pendaftaran <span aria-hidden="true">→</span>
            </Link>
          </section>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 SPMB. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
