import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import connectDB from './connectDB.js'
import chalk from 'chalk'
import Pegawai from './models/pegawaiModel.js'

const app = express()
const PORT = process.env.PORT || 8000

connectDB()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//* Get All Pegawai
app.get('/api/pegawai', async (req, res) => {
  try {
    const data = await Pegawai.find({})

    if (data.length === 0) {
      throw new Error('No data found.')
    }

    res.status(200).json(data)
    console.log(chalk.green("Berhasil Mendapatkan Semua Data Pegawai"))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while fetching data.' })
  }
})

//* Add Pegawai
app.post('/api/pegawai', async (req, res) => {
  try {
    console.log(req.body)

    const newPegawai = new Pegawai({
      namaPegawai: req.body.namaPegawai,
      email: req.body.email,
      jabatan: req.body.jabatan
    })

    await newPegawai.save()

    res.json('Data Submitted')
    console.log('Berhasil Menambahkan Data Pegawai')
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'An error occurred while adding data.' })
  }
})

//? Edit Pegawai
app.put('/api/pegawai/:id', async (req, res) => {
  try {
    const pegawaiId = req.params.id; 
    const updatePegawai = {
      namaPegawai: req.body.namaPegawai,
      email: req.body.email,
      jabatan: req.body.jabatan
    }

    await Pegawai.findByIdAndUpdate(pegawaiId, updatePegawai)
    res.json('Data Updated');
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating pegawai.' })
  }
})

//! Delete Pegawai
app.delete('/api/pegawai/:id', async (req, res) => {
  try {
    const pegawaiId = req.params.id
    await Pegawai.findByIdAndDelete(pegawaiId)
    res.json('Data Deleted')
    console.log(chalk.red('Data Deleted'))
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting pegawai.' })
  }
})


app.get('/health', (req, res) => {
  res.json('H! March')
})

app.get('*', (req, res) => {
  res.status(404)
})

app.listen(PORT, () => {
  console.log(chalk.blue(`Server running on port ${PORT}`))
})
