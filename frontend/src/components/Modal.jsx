import React, { useState } from "react";
import { Modal, Label, TextInput, Button } from "flowbite-react";
import icon from "../assets/!.svg";

function ModalPegawai({ mode, pegawai, onSave, onDelete, onClose }) {
  const [namaPegawai, setNamaPegawai] = useState(
    pegawai ? pegawai.namaPegawai : ""
  );
  const [email, setEmail] = useState(pegawai ? pegawai.email : "");
  const [jabatan, setJabatan] = useState(pegawai ? pegawai.jabatan : "");

  const handleSubmit = () => {
    const data = { namaPegawai, email, jabatan };
    onSave(data);
    onClose();
  };

return (
  <Modal show={true} size="md" popup onClose={onClose}>
    <Modal.Header />
    <Modal.Body>
      {mode === "add" || mode === "edit" ? (
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {mode === "add" ? "Tambah" : "Edit"} Pegawai
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="namaPegawai" value="Nama Pegawai" />
            </div>
            <TextInput
              id="namaPegawai"
              value={namaPegawai}
              onChange={(e) => setNamaPegawai(e.target.value)}
              placeholder="Nama Pegawai"
              autoComplete="name"
              required
            />
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@mail.com"
              autoComplete="email"
              required
            />
            <div className="mb-2 block">
              <Label htmlFor="jabatan" value="Jabatan" />
            </div>
            <TextInput
              id="jabatan"
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
              placeholder="Jabatan"
              required
            />
          </div>
          <div className="w-full">
            <Button
              outline
              gradientDuoTone="greenToBlue"
              onClick={handleSubmit}
            >
              {mode === "add" ? "Tambahkan" : "Simpan"}
            </Button>
          </div>
        </div>
      ) : mode === "delete" ? (
        <div className="text-center">
            <img className="mx-auto mb-2" src={icon} alt="!icon" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Apakah anda yakin akan menghapus{" "}
            <span className="font-bold uppercase text-blue-400">
              {namaPegawai ? namaPegawai : "pegawai in  "}?
            </span>
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={onDelete}>
              {"Ya, Saya Yakin"}
            </Button>
            <Button color="gray" onClick={() => onClose()}>
              Tidak, Kembali
            </Button>
          </div>
        </div>
      ) : null}
    </Modal.Body>
  </Modal>
);
}

export default ModalPegawai;
