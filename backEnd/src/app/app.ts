import express from 'express'
import Empresa from '../modelo/empresa'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const empresa = new Empresa()

