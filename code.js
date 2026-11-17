const SCHOOL_NAME = "Sistem Disiplin Sekolah"; // Tukar kepada nama sekolah jika perlu

function sendEmailOnFormSubmit(e) {
  // Semak jika fungsi dijalankan tanpa data form submission
  if (!e || !e.values) {
    Logger.log("Tiada data form submission dikesan.");
    return;
  }

  // Ambil data ikut urutan kolum dalam Google Sheets
  const timestamp = e.values[0];     // Masa penghantaran
  const namaPelajar = e.values[1];   // Nama pelajar
  const kelas = e.values[2];         // Kelas
  const tarikh = e.values[3];        // Tarikh kejadian
  const emailPenjaga = e.values[4];  // Emel penjaga
  const catatan = e.values[5];       // Catatan masalah

  // Log setiap field untuk tujuan debug
  Logger.log("Timestamp: " + timestamp);
  Logger.log("Nama Pelajar: " + namaPelajar);
  Logger.log("Kelas: " + kelas);
  Logger.log("Tarikh: " + tarikh);
  Logger.log("Email Penjaga: " + emailPenjaga);
  Logger.log("Catatan: " + catatan);

  // Elak script gagal (crash) jika kolum emel penjaga kosong
  if (!emailPenjaga || emailPenjaga.trim() === "") {
    Logger.log(`Tiada emel penjaga direkodkan untuk pelajar: ${namaPelajar}`);
    return;
  }

  // Subjek emel
  const subject = `Notifikasi Disiplin Pelajar: ${namaPelajar}`;

  // Kandungan emel dalam format jadual HTML
  const htmlBody = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #d32f2f;">📢 Notifikasi Disiplin Pelajar</h2>
        <p>Assalamualaikum / Salam Sejahtera,</p>
        <p>Dimaklumkan bahawa terdapat rekod disiplin melibatkan anak/jagaan anda seperti berikut:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr style="background-color: #f5f5f5;">
            <th align="left" style="width: 30%;">Maklumat</th>
            <th align="left">Butiran</th>
          </tr>
          <tr>
            <td><b>Nama Pelajar</b></td>
            <td>${namaPelajar}</td>
          </tr>
          <tr>
            <td><b>Kelas</b></td>
            <td>${kelas}</td>
          </tr>
          <tr>
            <td><b>Tarikh</b></td>
            <td>${tarikh}</td>
          </tr>
          <tr>
            <td><b>Catatan</b></td>
            <td>${catatan}</td>
          </tr>
        </table>

        <br>
        <p>Sekiranya terdapat sebarang pertanyaan, sila hubungi pihak sekolah.</p>
        <p>Terima kasih.<br><b>${SCHOOL_NAME}</b></p>
      </body>
    </html>
  `;

  // Hantar emel kepada penjaga melalui Gmail
  MailApp.sendEmail({
    to: emailPenjaga.trim(),
    subject: subject,
    htmlBody: htmlBody,
    name: SCHOOL_NAME
  });

  Logger.log(`Emel notifikasi berjaya dihantar ke: ${emailPenjaga}`);
}
