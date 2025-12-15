// --- DATA DUMMY (Initial Data) ---
const initialBarang = [
    { kode: "BRG-001", nama: "Laptop ASUS", jenis: "Elektronik", satuan: "Unit", stok: 15 },
    { kode: "BRG-002", nama: "Mouse Wireless", jenis: "Aksesoris", satuan: "Pcs", stok: 50 },
    { kode: "BRG-003", nama: "Kertas A4", jenis: "ATK", satuan: "Rim", stok: 100 }
];

// Fungsi Inisialisasi Data ke LocalStorage jika belum ada
function initData() {
    if (!localStorage.getItem('dataBarang')) {
        localStorage.setItem('dataBarang', JSON.stringify(initialBarang));
    }
}

// --- 1. LOGIN SYSTEM ---
function handleLogin() {
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;

    if (user === 'admin' && pass === 'admin') {
        alert("Login Berhasil!");
        window.location.href = "index.html";
    } else {
        alert("Username atau Password Salah! (Gunakan: admin / admin)");
    }
}

// --- 2. DASHBOARD SYSTEM ---
function loadDashboard() {
    initData(); // Pastikan data ada
    let data = JSON.parse(localStorage.getItem('dataBarang')) || [];
    
    // Update angka di kartu dashboard jika elemennya ada
    let countEl = document.getElementById('count-barang');
    if (countEl) {
        countEl.innerText = data.length + " Item";
    }
}

// --- 3. DATA BARANG (READ & DELETE) ---
function loadBarang() {
    initData();
    let data = JSON.parse(localStorage.getItem('dataBarang')) || [];
    let tbody = document.getElementById('table-body');
    
    if (tbody) {
        tbody.innerHTML = ''; // Reset isi tabel
        data.forEach((item, index) => {
            let row = `<tr>
                <td>${index + 1}</td>
                <td>${item.kode}</td>
                <td>${item.nama}</td>
                <td>${item.jenis}</td>
                <td>${item.satuan}</td>
                <td>${item.stok}</td>
                <td>
                    <a class="btn-action btn-delete" onclick="hapusBarang(${index})">Hapus</a>
                </td>
            </tr>`;
            tbody.innerHTML += row;
        });
    }
}

function hapusBarang(index) {
    if(confirm("Yakin ingin menghapus data ini?")) {
        let data = JSON.parse(localStorage.getItem('dataBarang')) || [];
        data.splice(index, 1); // Hapus 1 data pada index tersebut
        localStorage.setItem('dataBarang', JSON.stringify(data));
        loadBarang(); // Refresh tabel
    }
}

// --- 4. TAMBAH BARANG (CREATE) ---
function tambahBarang() {
    let kode = document.getElementById('kode').value;
    let nama = document.getElementById('nama').value;
    let jenis = document.getElementById('jenis').value;
    let satuan = document.getElementById('satuan').value;
    let stok = document.getElementById('stok').value;

    if(nama === "" || stok === "") {
        alert("Nama Barang dan Stok wajib diisi!");
        return;
    }

    let data = JSON.parse(localStorage.getItem('dataBarang')) || [];
    
    data.push({
        kode: kode,
        nama: nama,
        jenis: jenis,
        satuan: satuan,
        stok: stok
    });

    localStorage.setItem('dataBarang', JSON.stringify(data));
    alert("Data Berhasil Disimpan!");
    window.location.href = "data_barang.html";
}