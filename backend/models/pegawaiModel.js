import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PegawaiSchema = new Schema(
  {
    namaPegawai: {
      required: true,
      type: String
    },
    email: {
      required: true,
      type: String
    },
    jabatan: {
      required: true,
      type: String
    }
  },
  { timestamps: true }
)

const Pegawai = mongoose.model('Pegawai', PegawaiSchema)

export default Pegawai
