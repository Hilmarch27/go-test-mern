import React, { useState, useEffect } from "react";
import { Alert, Button, Table } from "flowbite-react";
import ModalPegawai from "../../components/Modal";

function Pegawai() {
  const baseUrl = "http://localhost:8000/api/pegawai";
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPegawai, setSelectedPegawai] = useState(null);
  const [mode, setMode] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);

  //* Fetching Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
        setData([]);
      }
    };
    fetchData();
  }, [openModal]);

  //* Save Pegawai
  const handleSavePegawai = async (pegawaiData) => {
    try {
      let response;
      if (selectedPegawai) {
        response = await fetch(`${baseUrl}/${selectedPegawai._id}`, {
          //? catch id pegawai
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pegawaiData),
        });
      } else {
        response = await fetch(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pegawaiData),
        });
      }
      if (!response.ok) {
        throw new Error("Failed to save data.");
      }
      const result = await response.json();
      console.log("Result:", result);
      setOpenModal(false);
      setAlertMessage("Data berhasil disimpan");
      setAlertType("success");
      setTimeout(() => {
        setAlertMessage(null);
        setAlertType(null);
      }, 3000);
    } catch (error) {
      console.error("Error:", error.message);
      setAlertMessage("Gagal menyimpan data");
      setAlertType("failure");
    }
  };

  //? Edit Pegawai
  const handleEditPegawai = (pegawai) => {
    setSelectedPegawai(pegawai);
    setMode("edit");
    setOpenModal(true);
  };

  //! Delete Pegawai
  const handleDeletePegawai = (pegawai) => {
    setSelectedPegawai(pegawai);
    setMode("delete");
    setOpenModal(true);
  };

  //! Confirm Delete Pegawai
  const confirmDeletePegawai = async () => {
    try {
      const response = await fetch(`${baseUrl}/${selectedPegawai._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete data.");
      }
      console.log("Data Deleted");
      setOpenModal(false);
      setSelectedPegawai(null);
      setMode(null);
      setAlertMessage("Data berhasil dihapus");
      setAlertType("info");
      setTimeout(() => {
        setAlertMessage(null);
        setAlertType(null);
      }, 3000);
    } catch (error) {
      console.error("Error:", error.message);
      setAlertMessage("Data tidak berhasil dihapus");
      setAlertType("failure");
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            setSelectedPegawai(null); //? if add then selected pegawai equals null
            setMode("add");
            setOpenModal(true);
          }}
          outline
          gradientDuoTone="greenToBlue"
        >
          Tambah Pegawai
        </Button>
        {alertMessage && (
          <Alert
            className="alert fixed right-11 transition-opacity duration-500"
            color={alertType}
            onDismiss={() => setAlertMessage(null)}
          >
            <span className="font-medium">{alertMessage}</span>
          </Alert>
        )}
      </div>
      {/* Render Edit Pegawai Modal */}
      {openModal && (
        <ModalPegawai
          mode={mode}
          pegawai={selectedPegawai}
          onSave={handleSavePegawai}
          onDelete={confirmDeletePegawai}
          onClose={() => setOpenModal(false)}
        />
      )}

      {/* Table Section */}
      <div className="overflow-x-auto border border-iceblue rounded-xl mt-5">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Nama Pegawai</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Jabatan</Table.HeadCell>
            <Table.HeadCell className="text-center">Aksi</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((item, i) => (
              <Table.Row
                key={item._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 whitespace-nowrap font-medium text-gray-900 dark:text-white"
              >
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>{item.namaPegawai}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>{item.jabatan}</Table.Cell>
                <Table.Cell className="flex justify-center gap-2">
                  <Button
                    size="sm"
                    outline
                    gradientDuoTone="cyanToBlue"
                    onClick={() => handleEditPegawai(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    outline
                    gradientDuoTone="redToYellow"
                    onClick={() => handleDeletePegawai(item)}
                  >
                    Hapus
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default Pegawai;
