import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.js";
import { readStorage, writeStorage } from "../utils/storage.js";

import {
  FaUser,
  FaMapMarkerAlt,
  FaSchool,
  FaUsers,
  FaUniversity,
  FaFileUpload,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaSave,
} from "react-icons/fa";

import "./PengisianBiodata.css";

function PengisianBiodata() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const emptyFormData = {
    // Data pribadi
    namaLengkap: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    email: "",
    whatsapp: "",

    // Alamat
    alamat: "",
    provinsi: "",
    kota: "",
    kecamatan: "",
    kelurahan: "",
    kodePos: "",

    // Pendidikan
    asalSekolah: "",
    nisn: "",
    jenisSekolah: "",
    jurusanSekolah: "",
    tahunLulus: "",

    // Orang tua
    namaAyah: "",
    pekerjaanAyah: "",
    namaIbu: "",
    pekerjaanIbu: "",
    whatsappOrangTua: "",

    // Program studi
    jalurPendaftaran: "",
    prodi1: "",
    prodi2: "",

    // Persetujuan
    persetujuan: false,
  };

  const [formData, setFormData] = useState(() => {
    const savedData = readStorage(localStorage, "spmb_biodata_draft", {});
    return { ...emptyFormData, ...savedData };
  });

  const [files, setFiles] = useState({
    foto: null,
    kartuKeluarga: null,
    ijazah: null,
    rapor: null,
  });

  const steps = [
    {
      number: 1,
      title: "Data Pribadi",
      icon: <FaUser />,
    },
    {
      number: 2,
      title: "Alamat",
      icon: <FaMapMarkerAlt />,
    },
    {
      number: 3,
      title: "Pendidikan",
      icon: <FaSchool />,
    },
    {
      number: 4,
      title: "Orang Tua",
      icon: <FaUsers />,
    },
    {
      number: 5,
      title: "Pilihan Prodi",
      icon: <FaUniversity />,
    },
    {
      number: 6,
      title: "Berkas",
      icon: <FaFileUpload />,
    },
    {
      number: 7,
      title: "Konfirmasi",
      icon: <FaCheckCircle />,
    },
  ];

  const progress = Math.round((step / steps.length) * 100);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setNotice("");
  };

  const handleFileChange = (event) => {
    const { name, files: selectedFiles } = event.target;
    const file = selectedFiles[0];

    if (!file) return;

    const allowedTypes = name === "foto"
      ? ["image/jpeg", "image/png"]
      : ["image/jpeg", "image/png", "application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      setError(name === "foto" ? "Pas foto harus berformat JPG atau PNG." : "Dokumen harus berformat PDF, JPG, atau PNG.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran setiap berkas maksimal 5 MB.");
      event.target.value = "";
      return;
    }

    setFiles((prev) => ({
      ...prev,
      [name]: file,
    }));
    setError("");
  };

  const validateStep = () => {
    if (step === 1) {
      if (
        !formData.namaLengkap ||
        !formData.tempatLahir ||
        !formData.tanggalLahir ||
        !formData.jenisKelamin ||
        !formData.email ||
        !formData.whatsapp
      ) {
        setError("Silakan lengkapi seluruh data pribadi.");
        return false;
      }
    }

    if (step === 2) {
      if (
        !formData.alamat ||
        !formData.provinsi ||
        !formData.kota ||
        !formData.kecamatan
      ) {
        setError("Silakan lengkapi data alamat.");
        return false;
      }
    }

    if (step === 3) {
      if (
        !formData.asalSekolah ||
        !formData.nisn ||
        !formData.jenisSekolah ||
        !formData.tahunLulus
      ) {
        setError("Silakan lengkapi data pendidikan.");
        return false;
      }
    }

    if (step === 4) {
      if (
        !formData.namaAyah ||
        !formData.namaIbu ||
        !formData.whatsappOrangTua
      ) {
        setError("Silakan lengkapi data orang tua.");
        return false;
      }
    }

    if (step === 5) {
      if (!formData.jalurPendaftaran || !formData.prodi1) {
        setError("Pilih jalur pendaftaran dan program studi.");
        return false;
      }
    }

    if (step === 6) {
      if (!files.foto || !files.kartuKeluarga || !files.ijazah) {
        setError(
          "Pas foto, Kartu Keluarga, dan Ijazah/SKL wajib diunggah."
        );
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    setError("");

    if (step < steps.length) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setError("");

    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSaveTemporary = () => {
    const documents = Object.fromEntries(
      Object.entries(files).map(([key, file]) => [key, file?.name || ""])
    );
    const saved = writeStorage(localStorage, "spmb_biodata_draft", formData)
      && writeStorage(localStorage, "spmb_document_names", documents);

    if (saved) {
      setError("");
      setNotice("Data sementara berhasil disimpan di perangkat ini.");
    } else {
      setNotice("");
      setError("Penyimpanan browser penuh. Hapus data yang tidak diperlukan lalu coba lagi.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.persetujuan) {
      setError(
        "Centang pernyataan bahwa seluruh data yang diisi sudah benar."
      );
      return;
    }

    writeStorage(localStorage, "spmb_biodata_draft", formData);
    localStorage.setItem("spmb_biodata_complete", "true");
    writeStorage(
      localStorage,
      "spmb_document_names",
      Object.fromEntries(Object.entries(files).map(([key, file]) => [key, file?.name || ""]))
    );
    updateUser({
      nama: formData.namaLengkap,
      nomorPendaftaran: `SPMB2026${String(Date.now()).slice(-4)}`,
      programStudi1: formData.prodi1,
      programStudi2: formData.prodi2,
    });
    navigate("/dashboard", { replace: true, state: { message: "Biodata berhasil diselesaikan." } });
  };

  return (
    <div className="biodata-page">

      {/* HEADER */}
      <div className="biodata-header">
        <div>
          <p>SPMB 2026</p>
          <h1>Pengisian Biodata</h1>

          <span>
            Lengkapi seluruh informasi pendaftaran
            dengan data yang benar.
          </span>
        </div>

        <button
          type="button"
          className="save-temporary-button"
          onClick={handleSaveTemporary}
        >
          <FaSave />
          Simpan Sementara
        </button>
      </div>

      {/* PROGRESS */}
      <div className="biodata-progress-card">
        <div className="progress-information">
          <span>
            Langkah {step} dari {steps.length}
          </span>

          <strong>{progress}%</strong>
        </div>

        <div className="biodata-progress-line">
          <div
            className="biodata-progress-value"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* STEPS */}
      <div className="biodata-step-navigation">
        {steps.map((item) => (
          <div
            key={item.number}
            className={`biodata-step-item ${
              step === item.number ? "active" : ""
            } ${
              step > item.number ? "completed" : ""
            }`}
          >
            <div className="step-circle">
              {step > item.number ? (
                <FaCheckCircle />
              ) : (
                item.icon
              )}
            </div>

            <span>{item.title}</span>
          </div>
        ))}
      </div>

      <form
        className="biodata-form-card"
        onSubmit={handleSubmit}
      >
        {/* =====================
            STEP 1
        ====================== */}

        {step === 1 && (
          <section className="form-section">
            <div className="form-section-header">
              <FaUser />

              <div>
                <h2>Data Pribadi</h2>
                <p>
                  Masukkan data pribadi calon mahasiswa.
                </p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group full">
                <label>
                  Nama Lengkap
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="namaLengkap"
                  value={formData.namaLengkap}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div className="form-group">
                <label>
                  Tempat Lahir
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="tempatLahir"
                  value={formData.tempatLahir}
                  onChange={handleChange}
                  placeholder="Contoh: Jakarta"
                />
              </div>

              <div className="form-group">
                <label>
                  Tanggal Lahir
                  <span>*</span>
                </label>

                <input
                  type="date"
                  name="tanggalLahir"
                  value={formData.tanggalLahir}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>
                  Jenis Kelamin
                  <span>*</span>
                </label>

                <select
                  name="jenisKelamin"
                  value={formData.jenisKelamin}
                  onChange={handleChange}
                >
                  <option value="">
                    Pilih jenis kelamin
                  </option>

                  <option value="Laki-laki">
                    Laki-laki
                  </option>

                  <option value="Perempuan">
                    Perempuan
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  Nomor WhatsApp
                  <span>*</span>
                </label>

                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div className="form-group full">
                <label>
                  Email
                  <span>*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                />
              </div>
            </div>
          </section>
        )}

        {/* =====================
            STEP 2
        ====================== */}

        {step === 2 && (
          <section className="form-section">
            <div className="form-section-header">
              <FaMapMarkerAlt />

              <div>
                <h2>Alamat</h2>

                <p>
                  Masukkan alamat tempat tinggal saat ini.
                </p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group full">
                <label>
                  Alamat Lengkap
                  <span>*</span>
                </label>

                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  placeholder="Nama jalan, RT/RW, nomor rumah..."
                />
              </div>

              <div className="form-group">
                <label>
                  Provinsi
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="provinsi"
                  value={formData.provinsi}
                  onChange={handleChange}
                  placeholder="Provinsi"
                />
              </div>

              <div className="form-group">
                <label>
                  Kabupaten / Kota
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="kota"
                  value={formData.kota}
                  onChange={handleChange}
                  placeholder="Kabupaten / Kota"
                />
              </div>

              <div className="form-group">
                <label>
                  Kecamatan
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="kecamatan"
                  value={formData.kecamatan}
                  onChange={handleChange}
                  placeholder="Kecamatan"
                />
              </div>

              <div className="form-group">
                <label>Kelurahan / Desa</label>

                <input
                  type="text"
                  name="kelurahan"
                  value={formData.kelurahan}
                  onChange={handleChange}
                  placeholder="Kelurahan / Desa"
                />
              </div>

              <div className="form-group">
                <label>Kode Pos</label>

                <input
                  type="text"
                  name="kodePos"
                  value={formData.kodePos}
                  onChange={handleChange}
                  placeholder="Kode pos"
                />
              </div>
            </div>
          </section>
        )}

        {/* =====================
            STEP 3
        ====================== */}

        {step === 3 && (
          <section className="form-section">
            <div className="form-section-header">
              <FaSchool />

              <div>
                <h2>Data Pendidikan</h2>

                <p>
                  Masukkan informasi pendidikan terakhir.
                </p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group full">
                <label>
                  Nama Sekolah
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="asalSekolah"
                  value={formData.asalSekolah}
                  onChange={handleChange}
                  placeholder="Nama sekolah asal"
                />
              </div>

              <div className="form-group">
                <label>
                  NISN
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="nisn"
                  value={formData.nisn}
                  onChange={handleChange}
                  placeholder="Nomor NISN"
                />
              </div>

              <div className="form-group">
                <label>
                  Jenis Sekolah
                  <span>*</span>
                </label>

                <select
                  name="jenisSekolah"
                  value={formData.jenisSekolah}
                  onChange={handleChange}
                >
                  <option value="">
                    Pilih sekolah
                  </option>

                  <option value="SMA">SMA</option>
                  <option value="SMK">SMK</option>
                  <option value="MA">MA</option>
                  <option value="Lainnya">
                    Lainnya
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>Jurusan</label>

                <input
                  type="text"
                  name="jurusanSekolah"
                  value={formData.jurusanSekolah}
                  onChange={handleChange}
                  placeholder="Contoh: IPA / TKJ"
                />
              </div>

              <div className="form-group">
                <label>
                  Tahun Lulus
                  <span>*</span>
                </label>

                <input
                  type="number"
                  name="tahunLulus"
                  value={formData.tahunLulus}
                  onChange={handleChange}
                  placeholder="2026"
                />
              </div>
            </div>
          </section>
        )}

        {/* =====================
            STEP 4
        ====================== */}

        {step === 4 && (
          <section className="form-section">
            <div className="form-section-header">
              <FaUsers />

              <div>
                <h2>Data Orang Tua</h2>

                <p>
                  Masukkan informasi orang tua atau wali.
                </p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>
                  Nama Ayah
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="namaAyah"
                  value={formData.namaAyah}
                  onChange={handleChange}
                  placeholder="Nama ayah"
                />
              </div>

              <div className="form-group">
                <label>Pekerjaan Ayah</label>

                <input
                  type="text"
                  name="pekerjaanAyah"
                  value={formData.pekerjaanAyah}
                  onChange={handleChange}
                  placeholder="Pekerjaan ayah"
                />
              </div>

              <div className="form-group">
                <label>
                  Nama Ibu
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="namaIbu"
                  value={formData.namaIbu}
                  onChange={handleChange}
                  placeholder="Nama ibu"
                />
              </div>

              <div className="form-group">
                <label>Pekerjaan Ibu</label>

                <input
                  type="text"
                  name="pekerjaanIbu"
                  value={formData.pekerjaanIbu}
                  onChange={handleChange}
                  placeholder="Pekerjaan ibu"
                />
              </div>

              <div className="form-group full">
                <label>
                  Nomor WhatsApp Orang Tua
                  <span>*</span>
                </label>

                <input
                  type="tel"
                  name="whatsappOrangTua"
                  value={formData.whatsappOrangTua}
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                />
              </div>
            </div>
          </section>
        )}

        {/* =====================
            STEP 5
        ====================== */}

        {step === 5 && (
          <section className="form-section">
            <div className="form-section-header">
              <FaUniversity />

              <div>
                <h2>Pilihan Program Studi</h2>

                <p>
                  Tentukan jalur dan program studi pilihan.
                </p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group full">
                <label>
                  Jalur Pendaftaran
                  <span>*</span>
                </label>

                <select
                  name="jalurPendaftaran"
                  value={formData.jalurPendaftaran}
                  onChange={handleChange}
                >
                  <option value="">
                    Pilih jalur pendaftaran
                  </option>

                  <option value="Reguler">
                    Reguler
                  </option>

                  <option value="Prestasi">
                    Prestasi
                  </option>

                  <option value="Beasiswa">
                    Beasiswa
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  Pilihan Program Studi 1
                  <span>*</span>
                </label>

                <select
                  name="prodi1"
                  value={formData.prodi1}
                  onChange={handleChange}
                >
                  <option value="">
                    Pilih program studi
                  </option>

                  <option value="Sains Data">Sains Data</option>
                  <option value="Teknik Informatika">Teknik Informatika</option>
                  <option value="Sistem Informasi">Sistem Informasi</option>
                  <option value="Manajemen">Manajemen</option>
                  <option value="Akuntansi">Akuntansi</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  Pilihan Program Studi 2
                </label>

                <select
                  name="prodi2"
                  value={formData.prodi2}
                  onChange={handleChange}
                >
                  <option value="">
                    Pilihan kedua
                  </option>
                  <option value="Sains Data">Sains Data</option>
                  <option value="Teknik Informatika">Teknik Informatika</option>
                  <option value="Sistem Informasi">Sistem Informasi</option>
                  <option value="Manajemen">Manajemen</option>
                  <option value="Akuntansi">Akuntansi</option>
                </select>
              </div>
            </div>
          </section>
        )}

        {/* =====================
            STEP 6
        ====================== */}

        {step === 6 && (
          <section className="form-section">
            <div className="form-section-header">
              <FaFileUpload />

              <div>
                <h2>Upload Berkas</h2>

                <p>
                  Upload dokumen yang dibutuhkan
                  untuk proses pendaftaran.
                </p>
              </div>
            </div>

            <div className="upload-grid">
              <UploadBox
                title="Pas Foto"
                description="JPG / PNG"
                name="foto"
                file={files.foto}
                onChange={handleFileChange}
              />

              <UploadBox
                title="Kartu Keluarga"
                description="PDF / JPG / PNG"
                name="kartuKeluarga"
                file={files.kartuKeluarga}
                onChange={handleFileChange}
              />

              <UploadBox
                title="Ijazah / SKL"
                description="PDF / JPG / PNG"
                name="ijazah"
                file={files.ijazah}
                onChange={handleFileChange}
              />

              <UploadBox
                title="Rapor"
                description="Opsional"
                name="rapor"
                file={files.rapor}
                onChange={handleFileChange}
              />
            </div>
          </section>
        )}

        {/* =====================
            STEP 7
        ====================== */}

        {step === 7 && (
          <section className="form-section">
            <div className="form-section-header">
              <FaCheckCircle />

              <div>
                <h2>Konfirmasi Data</h2>

                <p>
                  Periksa kembali seluruh informasi
                  sebelum melakukan finalisasi.
                </p>
              </div>
            </div>

            <div className="confirmation-card">
              <h3>Ringkasan Pendaftaran</h3>

              <div className="confirmation-grid">
                <div>
                  <span>Nama Lengkap</span>
                  <strong>
                    {formData.namaLengkap || "-"}
                  </strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>
                    {formData.email || "-"}
                  </strong>
                </div>

                <div>
                  <span>Asal Sekolah</span>
                  <strong>
                    {formData.asalSekolah || "-"}
                  </strong>
                </div>

                <div>
                  <span>Program Studi</span>
                  <strong>
                    {formData.prodi1 || "-"}
                  </strong>
                </div>

                <div>
                  <span>Jalur</span>
                  <strong>
                    {formData.jalurPendaftaran ||
                      "-"}
                  </strong>
                </div>

                <div>
                  <span>Berkas</span>
                  <strong>
                    {files.foto &&
                    files.kartuKeluarga &&
                    files.ijazah
                      ? "Lengkap"
                      : "Belum Lengkap"}
                  </strong>
                </div>
              </div>
            </div>

            <label className="agreement-box">
              <input
                type="checkbox"
                name="persetujuan"
                checked={formData.persetujuan}
                onChange={handleChange}
              />

              <span>
                Saya menyatakan bahwa seluruh data
                yang saya masukkan adalah benar dan
                dapat dipertanggungjawabkan.
              </span>
            </label>
          </section>
        )}

        {/* ERROR */}

        {error && (
          <div className="biodata-error" role="status" aria-live="polite">
            {error}
          </div>
        )}

        {notice && (
          <div className="biodata-notice" role="status" aria-live="polite">
            {notice}
          </div>
        )}

        {/* NAVIGATION */}

        <div className="form-navigation">
          <button
            type="button"
            className="previous-button"
            onClick={handlePrevious}
            disabled={step === 1}
          >
            <FaChevronLeft />
            Sebelumnya
          </button>

          {step < steps.length ? (
            <button
              type="button"
              className="next-button"
              onClick={handleNext}
            >
              Selanjutnya
              <FaChevronRight />
            </button>
          ) : (
            <button
              type="submit"
              className="finish-button"
            >
              <FaCheckCircle />
              Finalisasi Data
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function UploadBox({
  title,
  description,
  name,
  file,
  onChange,
}) {
  return (
    <label className="upload-box">
      <FaFileUpload />

      <strong>{title}</strong>

      <span>{description}</span>

      <input
        type="file"
        name={name}
        onChange={onChange}
        accept=".jpg,.jpeg,.png,.pdf"
        aria-label={`Pilih ${title}`}
      />

      <div className="upload-button">
        {file ? "Ganti File" : "Pilih File"}
      </div>

      {file && (
        <p className="selected-file">
          {file.name}
        </p>
      )}
    </label>
  );
}

export default PengisianBiodata;
