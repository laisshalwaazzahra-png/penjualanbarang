/**
 * Nama File: script.js
 * Tema: Toko Elektronik (Validasi, Search, Format Rupiah, Struk)
 * Version: 2.0 - Enhanced UI/UX
**/

// --- 1. DATA BARANG ELEKTRONIK (20 ITEM) ---
var daftarBarang = [
    { kode: "E01", nama: "Laptop Asus ROG Strix", kategori: "Laptop", harga: 18500000, stok: 3 },
    { kode: "E02", nama: "MacBook Air M2", kategori: "Laptop", harga: 16999000, stok: 5 },
    { kode: "E03", nama: "Acer Nitro V15", kategori: "Laptop", harga: 10500000, stok: 4 },
    { kode: "E04", nama: "iPhone 15 128GB", kategori: "Smartphone", harga: 15499000, stok: 6 },
    { kode: "E05", nama: "Samsung Galaxy S24", kategori: "Smartphone", harga: 13999000, stok: 4 },
    { kode: "E06", nama: "Xiaomi Redmi Note 13", kategori: "Smartphone", harga: 2599000, stok: 15 },
    { kode: "E07", nama: "Mouse Logitech G502", kategori: "Aksesoris", harga: 650000, stok: 10 },
    { kode: "E08", nama: "Keyboard Keychron K2", kategori: "Aksesoris", harga: 1200000, stok: 8 },
    { kode: "E09", nama: "Headset Razer BlackShark", kategori: "Aksesoris", harga: 850000, stok: 5 },
    { kode: "E10", nama: "Monitor LG 24 Inch IPS", kategori: "Monitor", harga: 1650000, stok: 7 },
    { kode: "E11", nama: "Monitor Samsung Odyssey", kategori: "Monitor", harga: 3500000, stok: 3 },
    { kode: "E12", nama: "Printer Epson L3210", kategori: "Printer", harga: 2300000, stok: 4 },
    { kode: "E13", nama: "SSD Samsung Evo 1TB", kategori: "Komponen", harga: 1450000, stok: 12 },
    { kode: "E14", nama: "RAM Corsair 16GB RGB", kategori: "Komponen", harga: 950000, stok: 10 },
    { kode: "E15", nama: "VGA RTX 4060 Ti", kategori: "Komponen", harga: 6500000, stok: 2 },
    { kode: "E16", nama: "Power Bank Anker 10k", kategori: "Aksesoris", harga: 350000, stok: 20 },
    { kode: "E17", nama: "Kabel HDMI 2.0 Sony", kategori: "Aksesoris", harga: 120000, stok: 25 },
    { kode: "E18", nama: "Webcam Logitech C920", kategori: "Aksesoris", harga: 1100000, stok: 5 },
    { kode: "E19", nama: "Speaker JBL Flip 6", kategori: "Audio", harga: 1800000, stok: 6 },
    { kode: "E20", nama: "Smartwatch Apple Watch", kategori: "Wearable", harga: 4999000, stok: 3 }
];

// --- 2. FORMAT RUPIAH ---
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR', 
        minimumFractionDigits: 0 
    }).format(number);
}

// --- 3. LOGIKA LOGIN ---
const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        
        // Loading animation
        const btn = e.target.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
        btn.disabled = true;
        
        setTimeout(() => {
            if (user === "admin" && pass === "123") {
                btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Berhasil!';
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-success');
                
                setTimeout(() => {
                    window.location.href = "beranda.html";
                }, 500);
            } else {
                btn.innerHTML = originalText;
                btn.disabled = false;
                alert("❌ Login Gagal! Username atau password salah.");
            }
        }, 800);
    });

    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordField = document.getElementById('password');
            const icon = this.querySelector('i');
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            } else {
                passwordField.type = 'password';
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            }
        });
    }
}

// --- 4. RENDER TABEL & SEARCH ---
function renderStokBarang() {
    const tabelStok = document.getElementById('tabel-stok-barang');
    const searchKeyword = document.getElementById('searchInput') ? document.getElementById('searchInput').value.toLowerCase() : "";
    
    if (!tabelStok) return;

    tabelStok.innerHTML = "";
    
    // Filter barang berdasarkan pencarian
    const filteredBarang = daftarBarang.filter(item => 
        item.nama.toLowerCase().includes(searchKeyword) || 
        item.kategori.toLowerCase().includes(searchKeyword)
    );

    if(filteredBarang.length === 0) {
        tabelStok.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-muted p-4">
                    <i class="bi bi-search" style="font-size: 2rem;"></i>
                    <p class="mb-0 mt-2">Barang tidak ditemukan</p>
                </td>
            </tr>`;
        return;
    }

    filteredBarang.forEach(item => {
        let baris = document.createElement('tr');
        
        // Status badge dengan warna dinamis
        let statusBadge, btnDisabled;
        if (item.stok > 10) {
            statusBadge = `<span class="badge bg-success">${item.stok}</span>`;
            btnDisabled = "";
        } else if (item.stok > 0) {
            statusBadge = `<span class="badge bg-warning text-dark">${item.stok}</span>`;
            btnDisabled = "";
        } else {
            statusBadge = `<span class="badge bg-danger">Habis</span>`;
            btnDisabled = "disabled";
        }

        baris.innerHTML = `
            <td class="ps-3">
                <div class="fw-semibold small">${item.nama}</div>
                <small class="text-muted">${item.kategori}</small>
            </td>
            <td class="text-primary fw-semibold small">${formatRupiah(item.harga)}</td>
            <td class="text-center">${statusBadge}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-primary rounded-circle" onclick="pilihBarang('${item.nama}', '${item.kategori}', ${item.harga})" ${btnDisabled} title="Pilih barang ini">
                    <i class="bi bi-plus-lg"></i>
                </button>
            </td>
        `;
        
        // Hover effect
        baris.style.cursor = btnDisabled ? 'not-allowed' : 'pointer';
        if (!btnDisabled) {
            baris.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f8f9fa';
            });
            baris.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
        }
        
        tabelStok.appendChild(baris);
    });

    // Update counter
    const totalProducts = document.getElementById('totalProducts');
    if (totalProducts) {
        totalProducts.textContent = `${filteredBarang.length} Produk`;
    }
}

// --- 5. PILIH BARANG ---
function pilihBarang(nama, kategori, harga) {
    document.getElementById('deskripsi').value = nama;
    document.getElementById('kategori').value = kategori;
    document.getElementById('hargaSatuan').value = harga;
    document.getElementById('jumlah').value = 1;
    hitungTotal();
    
    // Highlight selected item
    const deskripsiInput = document.getElementById('deskripsi');
    deskripsiInput.classList.add('border-success');
    setTimeout(() => {
        deskripsiInput.classList.remove('border-success');
    }, 1000);
    
    // Scroll to form on mobile
    if (window.innerWidth < 992) {
        document.getElementById('formTransaksi').scrollIntoView({ behavior: 'smooth' });
    }
}

// --- 6. HITUNG TOTAL BAYAR ---
function hitungTotal() {
    const harga = parseInt(document.getElementById('hargaSatuan').value) || 0;
    const qty = parseInt(document.getElementById('jumlah').value) || 0;
    const total = harga * qty;
    
    // Tampilkan ke label dengan animasi
    const labelTotal = document.getElementById('labelTotal');
    labelTotal.style.transform = 'scale(1.1)';
    labelTotal.innerText = formatRupiah(total);
    
    setTimeout(() => {
        labelTotal.style.transform = 'scale(1)';
    }, 200);
}

// --- 7. RESET FORM ---
function resetForm() {
    document.getElementById('labelTotal').innerText = "Rp 0";
    document.getElementById('deskripsi').value = "";
    document.getElementById('kategori').value = "";
    document.getElementById('hargaSatuan').value = "";
}

// --- 8. PROSES TRANSAKSI & STRUK ---
function prosesTransaksi() {
    const nama = document.getElementById('nama').value.trim();
    const barang = document.getElementById('deskripsi').value;
    const kategori = document.getElementById('kategori').value;
    const jumlah = parseInt(document.getElementById('jumlah').value);
    const tanggal = document.getElementById('tanggal').value;
    const harga = parseInt(document.getElementById('hargaSatuan').value) || 0;
    const totalBayar = harga * jumlah;

    // VALIDASI
    if (!nama || !barang || !jumlah || !tanggal) {
        showNotification("Harap lengkapi semua data transaksi!", "warning");
        return;
    }
    if (jumlah < 1) {
        showNotification("Jumlah minimal 1!", "warning");
        return;
    }

    // CEK STOK
    const itemData = daftarBarang.find(b => b.nama === barang);
    if (itemData) {
        if (itemData.stok < jumlah) {
            showNotification(`Stok tidak cukup! (Tersedia: ${itemData.stok})`, "danger");
            return;
        }
        itemData.stok -= jumlah;
    }

    // MASUKKAN KE RIWAYAT
    const tabelBody = document.getElementById('tabelBody');
    if (tabelBody.innerText.includes("Belum ada")) tabelBody.innerHTML = "";

    const baris = tabelBody.insertRow(0);
    baris.innerHTML = `
        <td class="ps-3 fw-bold">${nama}</td>
        <td>
            <div class="fw-semibold">${barang}</div>
            <small class="text-muted">${kategori}</small>
        </td>
        <td class="text-center">
            <span class="badge bg-primary">${jumlah}</span>
        </td>
        <td class="fw-bold text-success">${formatRupiah(totalBayar)}</td>
        <td class="small">${formatTanggal(tanggal)}</td>
    `;
    
    // Animasi row baru
    baris.style.animation = 'fadeIn 0.5s ease-out';

    // ISI DATA MODAL STRUK
    document.getElementById('strukTanggal').innerText = formatTanggal(tanggal);
    document.getElementById('strukNama').innerText = nama;
    document.getElementById('strukBarang').innerText = barang;
    document.getElementById('strukDetail').innerText = `${jumlah} x ${formatRupiah(harga)}`;
    document.getElementById('strukTotal').innerText = formatRupiah(totalBayar);

    // TAMPILKAN MODAL
    const modalStruk = new bootstrap.Modal(document.getElementById('modalStruk'));
    modalStruk.show();

    // RESET & REFRESH
    renderStokBarang();
    document.getElementById('formTransaksi').reset();
    resetForm();
    document.getElementById('tanggal').valueAsDate = new Date();
    
    showNotification("Transaksi berhasil diproses!", "success");
}

// --- 9. NOTIFIKASI ---
function showNotification(message, type = "info") {
    // Simple alert with icon
    const icons = {
        success: "✅",
        warning: "⚠️",
        danger: "❌",
        info: "ℹ️"
    };
    alert(`${icons[type]} ${message}`);
}

// --- 10. FORMAT TANGGAL ---
function formatTanggal(tglStr) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(tglStr).toLocaleDateString('id-ID', options);
}

// --- 11. INITIALIZATION ---
window.onload = function() {
    renderStokBarang();
    
    const tgl = document.getElementById('tanggal');
    if(tgl) {
        tgl.valueAsDate = new Date();
        tgl.max = new Date().toISOString().split('T')[0]; // Max date is today
    }
    
    // Smooth transitions
    document.querySelectorAll('.card').forEach(card => {
        card.style.transition = 'transform 0.3s ease';
    });
};