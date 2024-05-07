import mongoose from 'mongoose'
import chalk from 'chalk'

const connectDB = async () => {
  try {
    mongoose.set(`strictQuery`, false)
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(chalk.bold.green(`MongoDB Connected: ${conn.connection.host}`))
  } catch (error) {
    console.log(chalk.bold.red('Error: ', error))
    process.exit(1)
  }
}

export default connectDB
