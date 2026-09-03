import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.js";

import ProfileCropModal from "../utils/ProfileCropModal";

import {
  FaHome,
  FaUserEdit,
  FaBullhorn,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

import "./DashboardLayout.css";

function DashboardLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // =========================================
  // STATE FOTO PROFILE
  // =========================================

  // Gambar asli yang akan masuk ke halaman crop
  const [imageToCrop, setImageToCrop] = useState(null);

  // File hasil crop
  // Nanti digunakan untuk dikirim ke backend
  // Preview foto hasil crop
  const [profilePreview, setProfilePreview] = useState(
    () => localStorage.getItem("spmb_profile_photo") || null
  );

  // =========================================
  // Memilih foto profil baru
  // =========================================

  const handleSelectProfile = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Format yang diperbolehkan
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Foto profil harus berformat JPG, PNG, atau WEBP."
      );

      event.target.value = "";
      return;
    }

    // Maksimal 5 MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Ukuran foto profil maksimal 5 MB.");

      event.target.value = "";
      return;
    }

    // Membaca gambar agar bisa dikirim ke Crop Modal
    const reader = new FileReader();

    reader.onload = () => {
      setImageToCrop(reader.result);
    };

    reader.readAsDataURL(file);

    // Agar gambar yang sama bisa dipilih kembali
    event.target.value = "";
  };

  // =========================================
  // SIMPAN HASIL CROP
  // =========================================

  const handleCropSave = (croppedBlob) => {
    // Buat file baru dari hasil crop
    const croppedFile = new File(
      [croppedBlob],
      `profile-${Date.now()}.jpg`,
      {
        type: "image/jpeg",
      }
    );

    // Buat URL sementara untuk preview
    const previewUrl =
      URL.createObjectURL(croppedFile);

    // Tampilkan hasil crop di avatar
    setProfilePreview(previewUrl);

    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        localStorage.setItem("spmb_profile_photo", reader.result);
        setProfilePreview(reader.result);
      } catch {
        alert("Foto tidak dapat disimpan karena penyimpanan browser penuh.");
        setProfilePreview(null);
      }
      URL.revokeObjectURL(previewUrl);
    };
    reader.readAsDataURL(croppedFile);

    // Tutup modal crop
    setImageToCrop(null);

  };

  // =========================================
  // BERSIHKAN OBJECT URL
  // =========================================

  useEffect(() => {
    return () => {
      if (profilePreview) {
        URL.revokeObjectURL(profilePreview);
      }
    };
  }, [profilePreview]);

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* =====================================
          DASHBOARD
      ====================================== */}

      <div className="dashboard-wrapper">

        {/* =====================================
            SIDEBAR
        ====================================== */}

        <aside className="dashboard-sidebar">

          {/* LOGO */}
          <div className="sidebar-logo">
            <img
              src="/apidog-icon.svg"
              alt="Logo Kampus"
              className="sidebar-logo-image"
            />

            <div className="sidebar-logo-text">
              <h2>SPMB</h2>
              <span>2026</span>
            </div>
          </div>


          {/* MENU */}
          <nav className="sidebar-menu">

            {/* DASHBOARD */}
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <FaHome />

              <span>
                Dashboard
              </span>
            </NavLink>


            {/* BIODATA */}
            <NavLink
              to="/dashboard/pengisian-biodata"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <FaUserEdit />

              <span>
                Biodata
              </span>
            </NavLink>


            {/* PENGUMUMAN */}
            <NavLink
              to="/dashboard/pengumuman"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <FaBullhorn />

              <span>
                Pengumuman
              </span>
            </NavLink>

          </nav>


          {/* LOGOUT */}
          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            <FaSignOutAlt />

            <span>
              Logout
            </span>
          </button>

        </aside>


        {/* =====================================
            CONTENT
        ====================================== */}

        <div className="dashboard-main">

          {/* =====================================
              TOPBAR
          ====================================== */}

          <header className="dashboard-topbar">

            {/* TITLE */}
            <div>
              <p className="topbar-title">
                Seleksi Penerimaan Mahasiswa Baru
              </p>
            </div>


            {/* =====================================
                USER PROFILE
            ====================================== */}

            <div className="topbar-user">
              <div className="topbar-user-text">
                <strong>{user?.nama || user?.email || "Pendaftar"}</strong>
                <span>Calon mahasiswa</span>
              </div>

              {/* =================================
                  PROFILE PHOTO
              ================================== */}

              <label
                className="profile-upload"
                title="Ganti foto profil"
              >

                {/* Kalau sudah upload foto */}
                {profilePreview ? (
                  <img
                    src={profilePreview}
                    alt="Foto Profil"
                    className="profile-image"
                  />
                ) : (
                  // Kalau belum upload foto
                  <FaUserCircle
                    className="topbar-user-icon"
                  />
                )}


                {/* INPUT FILE */}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleSelectProfile}
                />


                {/* ICON EDIT */}
                <span className="profile-edit-icon">
                  +
                </span>

              </label>

            </div>

          </header>


          {/* =====================================
              HALAMAN
          ====================================== */}

          <main className="dashboard-content">

            <Outlet />

          </main>

        </div>

      </div>


      {/* =========================================
          MODAL CROP FOTO PROFILE
      ========================================== */}

      {imageToCrop && (
        <ProfileCropModal
          image={imageToCrop}
          onClose={() =>
            setImageToCrop(null)
          }
          onSave={handleCropSave}
        />
      )}

    </>
  );
}

export default DashboardLayout;
